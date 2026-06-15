import { ChevronDown } from "lucide-react";

/**
 * Shared two-column section shell: a sticky secondary sidebar (sub-navigation
 * for the current section) alongside the section's content. Used by Training,
 * Editing Guidelines and Brand Guidelines so every section navigates the same way.
 *
 * Desktop (lg+): sticky left secondary sidebar next to the content.
 * Mobile: a collapsed "jump to section" disclosure above the content, so the
 * long sub-nav never pushes the content out of reach.
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
      {/* Mobile: collapsible disclosure (hidden on desktop) */}
      <details className="group mb-6 rounded-lg border border-white/10 bg-card lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
          <span className="font-label text-foreground">{title}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <nav className="max-h-[60vh] space-y-1 overflow-y-auto border-t border-white/10 px-3 py-3 text-sm">
          {nav}
        </nav>
      </details>

      {/* Desktop: sticky secondary sidebar (hidden on mobile) */}
      <aside className="hidden lg:block">
        <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-1">
          <p className="font-label mb-3">{title}</p>
          <nav className="space-y-1 text-sm">{nav}</nav>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
