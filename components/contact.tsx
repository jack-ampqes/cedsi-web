"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Mail, Phone, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactFormData } from "@/lib/contact"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  )
}

async function getResponseError(response: Response) {
  const fallback = "We could not send your message. Please try again."

  try {
    const body: unknown = await response.json()
    if (
      body &&
      typeof body === "object" &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      return body.error
    }
  } catch {
    // Use the safe fallback when the response is not JSON.
  }

  return fallback
}

export function Contact() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await getResponseError(response))
      }

      reset()
      toast.success("Message sent", {
        description: "Thanks for contacting CEDSI. We’ll be in touch soon.",
      })
    } catch (error) {
      toast.error("Message not sent", {
        description:
          error instanceof Error
            ? error.message
            : "Please call or email us directly and try again later.",
      })
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-linear-to-b from-secondary/20 to-background" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 block text-sm font-semibold tracking-wider text-primary uppercase">
            We&apos;d Love to Hear From You
          </span>
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold">C&amp;E Design&reg;</h3>
            <address className="text-muted-foreground not-italic">
              Controls &amp; Electrical Design Services, Inc.
              <br />
              132 Westchester Drive, Suite A
              <br />
              Madison, Alabama 35758
            </address>

            <div className="space-y-4 border-t border-border pt-4">
              <div>
                <p className="mb-1 text-sm font-semibold text-foreground">
                  Mailing Address
                </p>
                <address className="text-muted-foreground not-italic">
                  P.O. Box 615
                  <br />
                  Madison, AL 35758
                  <br />
                  United States of America
                </address>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Contact</p>
                <a
                  href="tel:+12564619993"
                  className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  256-461-9993
                </a>
                <a
                  href="mailto:sales@cedsi.com"
                  className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  sales@cedsi.com
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Careers</p>
                <a
                  href="mailto:resumes@cedsi.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  resumes@cedsi.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative rounded-none border border-border bg-card p-6 md:p-8"
              aria-label="Contact CEDSI"
            >
              <div className="absolute left-[-9999px] top-auto size-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  <FieldError id="name-error" message={errors.name?.message} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="subject"
                    maxLength={160}
                    required
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    {...register("subject")}
                  />
                  <FieldError id="subject-error" message={errors.subject?.message} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    maxLength={5000}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                  <FieldError id="message-error" message={errors.message?.message} />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-6 w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
