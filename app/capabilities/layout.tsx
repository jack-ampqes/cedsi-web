export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 min-h-screen outline-none"
    >
      {children}
    </main>
  )
}
