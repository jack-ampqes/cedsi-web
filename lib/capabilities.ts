import type { LucideIcon } from "lucide-react"
import {
  Zap,
  Gauge,
  Shield,
  Cable,
  Cpu,
  Monitor,
  Network,
  Cog,
  Wrench,
  ClipboardCheck,
  FileText,
  Layers,
  BookOpen,
  Truck,
  Search,
  RefreshCw,
} from "lucide-react"

export type CapabilityHighlight = {
  icon: LucideIcon
  title: string
  description: string
}

export type CapabilityData = {
  slug: string
  title: string
  subtitle: string
  overview: string
  highlights: CapabilityHighlight[]
  vendors?: { src: string; alt: string }[]
  metaTitle: string
  metaDescription: string
}

export const capabilities = {
  "electrical-engineering": {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    subtitle: "Power distribution, load studies, and system protection for industrial facilities",
    overview:
      "CEDSI delivers engineered electrical solutions for demanding industrial environments. From initial load analysis through arc-flash studies and protective device coordination, our team designs power systems that meet code requirements, operational needs, and long-term maintainability.",
    highlights: [
      {
        icon: Zap,
        title: "Power Distribution Design",
        description:
          "Single-line diagrams, panel schedules, and distribution layouts for industrial and process facilities.",
      },
      {
        icon: Gauge,
        title: "Load Studies & Analysis",
        description:
          "Demand calculations, motor starting analysis, and capacity planning to support expansion and upgrades.",
      },
      {
        icon: Shield,
        title: "Arc Flash & Coordination",
        description:
          "Short-circuit studies, protective device coordination, and arc-flash hazard analysis using ETAP.",
      },
      {
        icon: Cable,
        title: "Grounding & Bonding",
        description:
          "Equipment grounding, bonding systems, and lightning protection designed to NEC and facility standards.",
      },
    ],
    vendors: [
      { src: "/etap-logo.svg", alt: "ETAP" },
      { src: "/Siemens-logo.svg", alt: "Siemens" },
      { src: "/Allen-Bradley_logo.svg", alt: "Allen-Bradley" },
    ],
    metaTitle: "Electrical Engineering | CEDSI",
    metaDescription:
      "Industrial power distribution design, load studies, arc-flash analysis, and protective device coordination from CEDSI.",
  },
  "controls-automation": {
    slug: "controls-automation",
    title: "Controls & Automation",
    subtitle: "PLC programming, HMI/SCADA, and integrated industrial automation",
    overview:
      "Our controls engineers design and implement automation systems that improve process reliability, visibility, and throughput. We work across major PLC platforms and integrate HMIs, SCADA, and networking to deliver cohesive control solutions.",
    highlights: [
      {
        icon: Cpu,
        title: "PLC Programming",
        description:
          "Application development for Allen-Bradley, Siemens, and other major platforms with structured, maintainable code.",
      },
      {
        icon: Monitor,
        title: "HMI & SCADA",
        description:
          "Operator interfaces, alarm management, trending, and supervisory control for plant-wide visibility.",
      },
      {
        icon: Cog,
        title: "Motion & Drives",
        description:
          "Servo systems, VFD integration, and coordinated motion control for material handling and process equipment.",
      },
      {
        icon: Network,
        title: "Industrial Networking",
        description:
          "Ethernet/IP, Profinet, and device-level networking with secure, documented topology design.",
      },
    ],
    vendors: [
      { src: "/Allen-Bradley_logo.svg", alt: "Allen-Bradley" },
      { src: "/Siemens-logo.svg", alt: "Siemens" },
      { src: "/Fanuc_logo.svg", alt: "Fanuc" },
    ],
    metaTitle: "Controls & Automation | CEDSI",
    metaDescription:
      "PLC programming, HMI/SCADA development, motion control, and industrial networking from CEDSI controls engineers.",
  },
  "panel-shop": {
    slug: "panel-shop",
    title: "Panel Shop & Fabrication",
    subtitle: "UL 508A panel build, wiring, and factory acceptance testing",
    overview:
      "Our in-house panel shop fabricates custom control panels to engineered specifications. Every build follows documented wiring practices, quality checkpoints, and factory testing protocols so panels arrive ready for field installation.",
    highlights: [
      {
        icon: Wrench,
        title: "Custom Panel Build",
        description:
          "Layout, component mounting, and wiring per approved drawings with attention to accessibility and serviceability.",
      },
      {
        icon: Shield,
        title: "UL 508A Support",
        description:
          "Design and fabrication aligned with UL 508A requirements for industrial control panels.",
      },
      {
        icon: ClipboardCheck,
        title: "Quality Verification",
        description:
          "In-process inspections, point-to-point checks, and documentation to verify build integrity.",
      },
      {
        icon: Gauge,
        title: "Factory Acceptance Testing",
        description:
          "Functional testing, I/O verification, and FAT documentation before panels ship to site.",
      },
    ],
    vendors: [
      { src: "/Allen-Bradley_logo.svg", alt: "Allen-Bradley" },
      { src: "/Siemens-logo.svg", alt: "Siemens" },
    ],
    metaTitle: "Panel Shop & Fabrication | CEDSI",
    metaDescription:
      "UL 508A control panel fabrication, quality verification, and factory acceptance testing from CEDSI's panel shop.",
  },
  "design-documentation": {
    slug: "design-documentation",
    title: "Design & Documentation",
    subtitle: "Schematics, BOMs, as-builts, and complete project drawing packages",
    overview:
      "Clear, complete documentation is the foundation of every successful project. CEDSI produces drawing packages that support fabrication, installation, commissioning, and long-term maintenance, keeping projects on schedule and operators informed.",
    highlights: [
      {
        icon: FileText,
        title: "Schematics & Wiring Diagrams",
        description:
          "Detailed electrical schematics, panel layouts, and interconnection drawings for controls and power systems.",
      },
      {
        icon: Layers,
        title: "Bill of Materials",
        description:
          "Accurate BOMs with manufacturer part numbers, quantities, and procurement-ready specifications.",
      },
      {
        icon: BookOpen,
        title: "As-Built Documentation",
        description:
          "Red-lined and updated drawings reflecting field changes for accurate records and future modifications.",
      },
      {
        icon: ClipboardCheck,
        title: "Project Packages",
        description:
          "Organized deliverable sets for contractors, owners, and maintenance teams including O&M references.",
      },
    ],
    metaTitle: "Design & Documentation | CEDSI",
    metaDescription:
      "Electrical schematics, BOMs, as-built drawings, and complete project documentation packages from CEDSI.",
  },
  "field-services": {
    slug: "field-services",
    title: "Field Services & Commissioning",
    subtitle: "Startup, troubleshooting, retrofits, and on-site engineering support",
    overview:
      "CEDSI engineers bring designs to life in the field. From initial startup and commissioning through troubleshooting and retrofits, our field team works alongside your operations staff to achieve safe, reliable system performance.",
    highlights: [
      {
        icon: Truck,
        title: "Startup & Commissioning",
        description:
          "System energization, I/O checkout, loop tuning, and turnover documentation for new and upgraded systems.",
      },
      {
        icon: Search,
        title: "Troubleshooting & Diagnostics",
        description:
          "Root-cause analysis for control, power, and instrumentation issues to minimize downtime.",
      },
      {
        icon: RefreshCw,
        title: "Retrofits & Upgrades",
        description:
          "Legacy system modernization, panel replacements, and phased upgrades with minimal production impact.",
      },
      {
        icon: Wrench,
        title: "On-Site Support",
        description:
          "Engineering assistance during outages, expansions, and critical maintenance windows.",
      },
    ],
    metaTitle: "Field Services & Commissioning | CEDSI",
    metaDescription:
      "Industrial startup, commissioning, troubleshooting, retrofits, and on-site engineering support from CEDSI.",
  },
} as const satisfies Record<string, CapabilityData>

export type CapabilitySlug = keyof typeof capabilities

export const capabilityNavItems = [
  {
    href: "/capabilities/electrical-engineering",
    label: "Electrical Engineering",
    description: "Power, load studies, arc flash",
  },
  {
    href: "/capabilities/controls-automation",
    label: "Controls & Automation",
    description: "PLC, HMI, SCADA",
  },
  {
    href: "/capabilities/panel-shop",
    label: "Panel Shop & Fabrication",
    description: "UL 508A build & testing",
  },
  {
    href: "/capabilities/design-documentation",
    label: "Design & Documentation",
    description: "Schematics, as-builts, O&M",
  },
  {
    href: "/capabilities/field-services",
    label: "Field Services & Commissioning",
    description: "Startup, retrofits, support",
  },
] as const
