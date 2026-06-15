/**
 * Shared two-column section shell: a sticky secondary sidebar (sub-navigation
 * for the current section) alongside the section's content. Used by Training,
 * Editing Guidelines and Brand Guidelines so every section navigates the same way.
 */
export function SectionLayout({
  title,
  nav,
  children,
}: {
  title: string;
  nav: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="mb-10 lg:mb-0">
        <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-1">
          <p className="font-label mb-3">{title}</p>
          <nav className="space-y-1 text-sm">{nav}</nav>
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
