import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact"

const RESEND_API_URL = "https://api.resend.com/emails"

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

// Best effort throttle. State is per server instance, so it slows casual abuse
// rather than guaranteeing a global limit across serverless invocations.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")

  if (forwardedFor) {
    return forwardedFor.split(",")[0]!.trim()
  }

  return request.headers.get("x-real-ip") ?? "unknown"
}

function isRateLimited(key: string) {
  const now = Date.now()

  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(bucketKey)
    }
  }

  const bucket = rateLimitBuckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return false
  }

  bucket.count += 1

  return bucket.count > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        },
      }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    )
  }

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    )
  }

  const { name, email, subject, message, website } = result.data

  // Honeypot submissions receive a neutral response without contacting Resend.
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "sales@cedsi.com"

  if (!apiKey || !fromEmail) {
    console.error("Contact delivery is not configured.")
    return NextResponse.json(
      { error: "Contact delivery is temporarily unavailable." },
      { status: 503 }
    )
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Website inquiry: ${subject}`,
        text: [
          "New CEDSI website inquiry",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      // Resend explains rejections (unverified sender domain, bad key) in the
      // body, so log it or the failure is impossible to diagnose from logs.
      const detail = await response.text().catch(() => "")

      console.error("Contact delivery failed.", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
        detail: detail.slice(0, 500),
      })
      return NextResponse.json(
        { error: "We could not send your message. Please try again." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(
      "Contact delivery failed.",
      error instanceof Error ? error.message : "Unknown error"
    )
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 502 }
    )
  }
}
