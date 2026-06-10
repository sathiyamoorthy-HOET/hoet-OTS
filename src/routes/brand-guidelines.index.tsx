import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/brand-guidelines/")({
  head: () => ({ meta: [{ title: "Brand Guidelines — HOET" }] }),
  component: Page,
});

const BRANDS = [
  { to: "/brand-guidelines/be10x", name: "Be10X", tagline: "AI won't replace you, but a person using AI will.", type: "Ads", status: "Active" },
  { to: "/brand-guidelines/ai-tv", name: "AI-TV App", tagline: "Stay Ahead of AI. In Minutes, Not Hours.", type: "Ads", status: "Coming soon" },
  { to: "/brand-guidelines/ai-tv-course", name: "AI-TV App — Course Videos", tagline: "Stay Ahead of AI. In Minutes, Not Hours.", type: "Course Videos", status: "Active" },
  { to: "/brand-guidelines/organic-video", name: "Organic Video", tagline: "Long-form & shorts brand direction.", type: "Organic", status: "Coming soon" },
  { to: "/brand-guidelines/profit-union", name: "Profit Union", tagline: "Funnel brand guideline.", type: "Ads", status: "Coming soon" },
];

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand"
        title="Brand & Style Guidelines"
        intro="Each House of EdTech brand and funnel maintains its own visual identity — colours, fonts, logo usage, motion templates and on-screen rules. The universal video rules live in the Editing section; this section covers per-brand identity."
      />
      <p className="mb-6 text-sm text-muted-foreground">
        Reference for the <Link to="/training/$day/$session" params={{ day: "day-2", session: "brand-guidelines" }} className="underline text-foreground">Day 2 · Brand guidelines</Link> training session.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {BRANDS.map((b) => (
          <Link key={b.to} to={b.to} className="group rounded-lg border border-white/10 bg-card p-5 hover:border-white/30">
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-lg font-semibold">{b.name}</div>
              <span className="font-label shrink-0">{b.status}</span>
            </div>
            <div className="mt-1"><span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{b.type}</span></div>
            <p className="mt-2 text-sm text-muted-foreground italic">"{b.tagline}"</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
