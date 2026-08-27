import type { Metadata } from "next"
import { CapabilityPage } from "@/components/capability-page"
import { capabilities } from "@/lib/capabilities"

export const metadata: Metadata = {
  title: capabilities["field-services"].metaTitle,
  description: capabilities["field-services"].metaDescription,
}

export default function FieldServicesPage() {
  return <CapabilityPage slug="field-services" />
}
