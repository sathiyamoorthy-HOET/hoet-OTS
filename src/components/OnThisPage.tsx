import { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

/**
 * In-page "On this page" sidebar for long brand-guideline pages.
 *
 * Wide screens (xl+): a sticky right-hand section index with a hide / expand
 * toggle (persisted per `storageKey`), sitting beside the page content.
 * Narrower screens: a compact row of section pills above the content, so the
 * index never crowds the already-narrowed column.
 *
 * `nav` is a list of [hash, label] anchors that match the section ids on the page.
 * Render this *inside* the page, below the PageHeader, wrapping the sections.
 */
export function OnThisPage({
  nav,
  storageKey,
  children,
}: {
  nav: [string, string][];
  storageKey: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(localStorage.getItem(storageKey) !== "0");
  }, [storageKey]);
  const toggle = (v: boolean) => {
    setOpen(v);
    localStorage.setItem(storageKey, v ? "1" : "0");
  };

  return (
    <div
      className={
        "xl:grid xl:items-start xl:gap-8 " +
        (open ? "xl:grid-cols-[minmax(0,1fr)_184px]" : "xl:grid-cols-[minmax(0,1fr)_2.75rem]")
      }
    >
      <div className="min-w-0">
        {/* Compact view: horizontal section pills (the sidebar shows on wide screens) */}
        <nav className="mb-8 flex flex-wrap gap-2 text-sm xl:hidden">
          {nav.map(([h, l]) => (
            <a key={h} href={h} className="rounded-full border border-white/15 px-3 py-1 hover:border-white/35">{l}</a>
          ))}
        </nav>
        {children}
      </div>

      {/* Wide screens: sticky "On this page" sidebar with hide / expand */}
      <aside className="hidden xl:block xl:sticky xl:top-8 xl:self-start">
        {open ? (
          <>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-label">On this page</p>
              <button
                onClick={() => toggle(false)}
                aria-label="Hide contents"
                title="Hide contents"
                className="inline-flex items-center justify-center rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-0.5 border-l border-white/10 pl-3 text-sm">
              {nav.map(([h, l]) => (
                <a key={h} href={h} className="block rounded py-1 text-muted-foreground transition-colors hover:text-foreground">{l}</a>
              ))}
            </nav>
          </>
        ) : (
          <button
            onClick={() => toggle(true)}
            aria-label="Show contents"
            title="On this page"
            className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <PanelRightOpen className="h-4 w-4" />
          </button>
        )}
      </aside>
    </div>
  );
}
