import type { Metadata } from "next"
import { CapabilityPage } from "@/components/capability-page"
import { capabilities } from "@/lib/capabilities"

export const metadata: Metadata = {
  title: capabilities["design-documentation"].metaTitle,
  description: capabilities["design-documentation"].metaDescription,
}

export default function DesignDocumentationPage() {
  return <CapabilityPage slug="design-documentation" />
}
