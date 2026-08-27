import type { Metadata } from "next"
import { CapabilityPage } from "@/components/capability-page"
import { capabilities } from "@/lib/capabilities"

export const metadata: Metadata = {
  title: capabilities["electrical-engineering"].metaTitle,
  description: capabilities["electrical-engineering"].metaDescription,
}

export default function ElectricalEngineeringPage() {
  return <CapabilityPage slug="electrical-engineering" />
}
