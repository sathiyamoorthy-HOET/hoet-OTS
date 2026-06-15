import { createFileRoute } from "@tanstack/react-router";
import { EditingHero, SECTION_BODIES, SECTION_META } from "@/components/editing-content";

export const Route = createFileRoute("/editing-guidelines/")({
  head: () => ({ meta: [{ title: "Editing Guidelines — HOET" }] }),
  component: Page,
});

function Page() {
  const meta = SECTION_META["rules-of-thumb"];
  const Icon = meta?.icon;
  return (
    <div>
      <EditingHero />

      <section>
        <h2 className="flex items-center gap-2.5 text-xl font-semibold">
          {Icon && <Icon className={`h-5 w-5 shrink-0 ${meta.color}`} />}
          Rules of Thumb
        </h2>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
          {SECTION_BODIES["rules-of-thumb"]}
        </div>
      </section>
    </div>
  );
}
