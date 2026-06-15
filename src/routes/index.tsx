import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Building2, Users, Boxes, Clapperboard, Scissors, Linkedin, Youtube, ExternalLink, Check } from "lucide-react";
import { brandLogo, COMPANY } from "@/lib/training-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HOET — House of EdTech · Video Production & Editing Guideline" },
      { name: "description", content: "House of EdTech's company profile and entry point for the Video Production & Editing Guideline." },
    ],
  }),
  component: HomePage,
});

const PIPELINE = [
  { to: "/training/day-2/deliverable-framework", label: "Deliverable Framework", note: "Pipeline · formats · export specs" },
  { to: "/editing-guidelines", label: "Editing Guidelines", note: "Universal rules · do's & don'ts" },
  { to: "/brand-guidelines", label: "Brand Guidelines", note: "Be10x · AI-TV · Profit Uni" },
  { to: "/editing-guidelines", label: "Quality & Consistency", note: "From a 3-second hook to a 12-minute course, every video carries the brand and meets the same standard of quality, clarity and consistency." },
];

const FOUNDERS_IMG = "https://be10x.com/wp-content/uploads/2023/11/Group-200-1.png";

const BRANDS = [
  ["Be10X", "be10x.com", "AI tools workshop"],
  ["AI TV App", "aitv.pro", "AI learning in short, vertical episodes"],
  ["Office Master", "officemaster.in", "Excel using AI"],
  ["AI for Techies", "aifortechies.in", "Python using AI"],
  ["Profit Uni", "profituni.in", "Stock market trading"],
  ["SpringPad", "springpad.in", "Stock market using AI"],
  ["Dr. Finance", "drfinance.in", "Personal finance & mutual funds"],
  ["Divinelane", "divinelane.co", "Gemstones & consultation"],
];

const TEAMS = [
  { name: "Video Editing", items: ["Rough & fine cut", "Motion graphics & colour grade", "Audio mixing", "Captions & subtitles", "AI video if needed"] },
];

function HomePage() {
  const [zoom, setZoom] = useState(false);
  return (
    <div>
      <PageHeader
        eyebrow="House of EdTech · v1.0"
        title="Video Editor Onboarding & Training"
        intro="Video is the primary medium through which every House of EdTech brand teaches, markets, and builds trust with working professionals. This site is the internal Standard Operating Procedure for how our editors cut, finish, and deliver every video to House of EdTech standards."
      />

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Building2 className="h-5 w-5 text-muted-foreground" /> About House of EdTech</h2>
        <p className="mt-2 max-w-4xl text-muted-foreground leading-relaxed">
          House of EdTech is India's fastest-growing multi-brand education company. We build and operate brands that educate working professionals in the skills that matter most — from artificial intelligence and stock-market trading to personal finance and sports analytics. Each brand is purpose-built for a specific domain, with its own expert trainers, dedicated curriculum, and learning community.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["₹400 Cr+", "ARR"],
            ["3 Million+", "Paid Learners"],
            ["8", "Brands"],
            ["1200+", "Team Members"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-lg border border-white/10 bg-card p-4">
              <div className="text-xl font-semibold">{n}</div>
              <div className="font-label mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Users className="h-5 w-5 text-muted-foreground" /> Our Founders</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground leading-relaxed">
          Co-founded by <strong className="text-foreground">Aditya Goenka</strong> and <strong className="text-foreground">Aditya Kachave</strong> — two operators making practical, career-changing skills accessible to working professionals across India.
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch">
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="block h-full w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-card"
            aria-label="Enlarge founders photo"
          >
            <img src={FOUNDERS_IMG} alt="House of EdTech founders Aditya Goenka and Aditya Kachave" className="block h-full w-full object-cover transition hover:scale-[1.02]" loading="lazy" />
          </button>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMPANY.founderBios.map((f) => (
              <div key={f.name} className="flex flex-col rounded-lg border border-white/10 bg-card p-5">
                <div className="text-lg font-medium">{f.name}</div>
                <p className="mt-1 text-sm italic text-muted-foreground">"{f.tagline}"</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.bio}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {f.linkedin && (
                    <a href={f.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-white/35 hover:text-sky-300">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                  )}
                  {f.youtube && (
                    <a href={f.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-white/35 hover:text-red-400">
                      <Youtube className="h-3.5 w-3.5" /> YouTube
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Boxes className="h-5 w-5 text-muted-foreground" /> Our Brands</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Eight purpose-built brands, each owning a single domain with its own trainers, curriculum and learner community.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map(([name, domain, tagline]) => (
            <a
              key={name}
              href={`https://${domain}`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-white/10 bg-card p-4 transition hover:border-white/30 hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2">
                <img src={brandLogo(domain)} alt={`${name} logo`} loading="lazy" className={`h-12 w-12 shrink-0 rounded-md object-contain p-1.5 ${name === "Divinelane" ? "bg-neutral-900" : "bg-white"}`} />
                <div className="font-medium">{name}</div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="font-label mt-1">{domain}</div>
              <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Clapperboard className="h-5 w-5 text-muted-foreground" /> Editing Standards</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Everything an editor needs to take a video from raw cut to a clean, on-brand final delivery.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {PIPELINE.map((p, i) => (
            <Link
              key={p.to}
              to={p.to}
              className="group flex items-center justify-between rounded-lg border border-white/10 bg-card p-4 hover:border-white/30"
            >
              <div>
                <div className="font-label">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-medium">{p.label}</div>
                <div className="text-sm text-muted-foreground">{p.note}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Scissors className="h-5 w-5 text-muted-foreground" /> The Editing Team</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          What the Video Editing team owns across every deliverable.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEAMS.map((t) => (
            <div key={t.name} className="rounded-lg border border-white/10 bg-card p-4">
              <div className="font-medium">{t.name}</div>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {t.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="House of EdTech founders"
        >
          <img src={FOUNDERS_IMG} alt="House of EdTech founders Aditya Goenka and Aditya Kachave" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </div>
  );
}
