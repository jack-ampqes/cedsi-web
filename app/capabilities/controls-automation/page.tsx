import type { Metadata } from "next"
import { CapabilityPage } from "@/components/capability-page"
import { capabilities } from "@/lib/capabilities"

export const metadata: Metadata = {
  title: capabilities["controls-automation"].metaTitle,
  description: capabilities["controls-automation"].metaDescription,
}

export default function ControlsAutomationPage() {
  return <CapabilityPage slug="controls-automation" />
}
