import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EditingHero, SECTIONS, SECTION_META, SECTION_TITLES } from "@/components/editing-content";

export const Route = createFileRoute("/editing-guidelines/")({
  head: () => ({ meta: [{ title: "Editing Guidelines — HOET" }] }),
  component: Page,
});

function Page() {
  return (
    <div>
      <EditingHero />

      <h2 className="text-xl font-semibold">All sections</h2>
      <p className="mt-2 text-sm text-muted-foreground">Open any rule for the full detail — or use the sidebar to jump straight there.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(([slug, label]) => {
          const meta = SECTION_META[slug];
          const Icon = meta?.icon;
          return (
            <Link
              key={slug}
              to="/editing-guidelines/$slug"
              params={{ slug }}
              className="group flex items-start gap-3 rounded-lg border border-white/10 bg-card p-4 transition hover:border-white/30 hover:bg-white/[0.03]"
            >
              {Icon && (
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5">
                  <Icon className={`h-5 w-5 ${meta.color}`} />
                </span>
              )}
              <span className="min-w-0">
                <span className="block font-medium leading-tight">{label}</span>
                <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
