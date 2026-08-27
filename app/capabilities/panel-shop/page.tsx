import type { Metadata } from "next"
import { CapabilityPage } from "@/components/capability-page"
import { capabilities } from "@/lib/capabilities"

export const metadata: Metadata = {
  title: capabilities["panel-shop"].metaTitle,
  description: capabilities["panel-shop"].metaDescription,
}

export default function PanelShopPage() {
  return <CapabilityPage slug="panel-shop" />
}
