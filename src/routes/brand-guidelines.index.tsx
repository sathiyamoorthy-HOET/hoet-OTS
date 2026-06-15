import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, CircleCheck, Clock, Megaphone } from "lucide-react";
import { brandLogo } from "@/lib/training-data";
import adityaGoenka from "@/assets/aditya-goenka.webp";
import adityaKachave from "@/assets/aditya-kachave.webp";

export const Route = createFileRoute("/brand-guidelines/")({
  head: () => ({ meta: [{ title: "Brand Guidelines — HOET" }] }),
  component: Page,
});

const BRANDS: { to?: string; youtube?: string; photo?: string; name: string; tagline: string; type: string; status: string; domain?: string }[] = [
  { to: "/brand-guidelines/aditya-goenka", name: "Aditya Goenka", tagline: "Reference channel for tone, pacing & on-screen style.", type: "Organic", status: "Coming soon", photo: adityaGoenka },
  { to: "/brand-guidelines/aditya-kachave", name: "Aditya Kachave", tagline: "Reference channel for tone, pacing & on-screen style.", type: "Organic", status: "Coming soon", photo: adityaKachave },
  { to: "/brand-guidelines/organic-video", name: "AI-TV App", tagline: "Long-form & shorts brand direction.", type: "Organic", status: "Coming soon", domain: "aitv.pro" },
  { to: "/brand-guidelines/ai-tv", name: "AI-TV App", tagline: "Stay Ahead of AI. In Minutes, Not Hours.", type: "Ads", status: "Coming soon", domain: "aitv.pro" },
  { to: "/brand-guidelines/ai-tv-course", name: "AI-TV App — Course Videos", tagline: "Stay Ahead of AI. In Minutes, Not Hours.", type: "", status: "Active", domain: "aitv.pro" },
  { to: "/brand-guidelines/be10x", name: "Be10X", tagline: "AI won't replace you, but a person using AI will.", type: "Ads", status: "Active", domain: "be10x.com" },
  { to: "/brand-guidelines/profit-uni", name: "Profit Uni", tagline: "Funnel brand guideline.", type: "Ads", status: "Coming soon", domain: "profituni.in" },
  { to: "/brand-guidelines/office-master", name: "Office Master", tagline: "Excel using AI.", type: "Ads", status: "Coming soon", domain: "officemaster.in" },
  { to: "/brand-guidelines/ai-for-techies", name: "AI for Techies", tagline: "Python using AI.", type: "Ads", status: "Coming soon", domain: "aifortechies.in" },
  { name: "SpringPad", tagline: "Stock market using AI.", type: "Ads", status: "Coming soon", domain: "springpad.in" },
  { name: "Dr. Finance", tagline: "Personal finance & mutual funds.", type: "Ads", status: "Coming soon", domain: "drfinance.in" },
  { name: "Divinelane", tagline: "Gemstones & consultation.", type: "Ads", status: "Coming soon", domain: "divinelane.co" },
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((b) => {
          const active = b.status === "Active";
          const key = b.to ?? b.youtube ?? b.name;
          const body = (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {b.domain ? (
                    <img src={brandLogo(b.domain)} alt={`${b.name} logo`} loading="lazy" className={`h-9 w-9 shrink-0 rounded-md object-contain p-1 ${b.name === "Divinelane" ? "bg-neutral-900" : "bg-white"}`} />
                  ) : b.photo ? (
                    <img src={b.photo} alt={b.name} loading="lazy" className="h-9 w-9 shrink-0 rounded-md object-cover" />
                  ) : null}
                  <div className="text-lg font-semibold">{b.name}</div>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${active ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-amber-400/30 bg-amber-400/10 text-amber-300"}`}>
                  {active ? <CircleCheck className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  {b.status}
                </span>
              </div>
              {b.type && <div className="mt-2"><span className="inline-flex items-center gap-1 text-xs font-medium text-sky-300"><Megaphone className="h-3.5 w-3.5" /> {b.type}</span></div>}
              <p className="mt-2 text-sm text-muted-foreground italic">"{b.tagline}"</p>
            </>
          );
          if (b.to) {
            return (
              <Link key={key} to={b.to} className="group rounded-lg border border-white/10 bg-card p-5 transition hover:border-white/30 hover:bg-white/[0.03]">
                {body}
                <div className="mt-4 inline-flex items-center gap-1 text-sm">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></div>
              </Link>
            );
          }
          if (b.youtube) {
            return (
              <a key={key} href={b.youtube} target="_blank" rel="noreferrer" className="group rounded-lg border border-white/10 bg-card p-5 transition hover:border-white/30 hover:bg-white/[0.03]">
                {body}
                <div className="mt-4 inline-flex items-center gap-1 text-sm">Open channel <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></div>
              </a>
            );
          }
          return (
            <div key={key} className="rounded-lg border border-white/10 bg-card p-5 opacity-80">
              {body}
              <div className="mt-4 text-sm text-muted-foreground">Guideline in progress</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
