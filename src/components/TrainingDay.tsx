import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import sampleWorkReportUrl from "@/assets/sample-work-report-ads.csv?url";
import adityaGoenka from "@/assets/aditya-goenka.webp";
import adityaKachave from "@/assets/aditya-kachave.webp";

const FOUNDER_PHOTOS: Record<string, string> = {
  "Aditya Goenka": adityaGoenka,
  "Aditya Kachave": adityaKachave,
};
import {
  TRAINING_DAYS, DELIVERY_REFERENCE, WORK_REPORT, INCENTIVE_FACTORS, COMPANY, ADOBE_APPS, PROVIDED_TOOLS, COMM_TOOLS, CREATIVE_TEAMS, AD_TASK_TYPES, BRAND_TARGETS,
  EDITING_PIPELINE, EXPORT_SPECS, FORMATS, ADS_PHASES, ORG_PHASES, SHORT_PHASES, DAY3_SECTIONS,
  brandLogo, findDay, daySessions, slugify, type Session, type Tool,
} from "@/lib/training-data";

function ToolCard({ t }: { t: Tool }) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/10 bg-card p-4">
      <img src={t.icon} alt={`${t.name} logo`} loading="lazy" className="h-9 w-9 shrink-0 rounded-md bg-white object-contain p-1" />
      <div>
        <div className="font-medium text-foreground">{t.name}</div>
        <p className="mt-0.5 text-sm text-muted-foreground">{t.desc}</p>
      </div>
    </div>
  );
}

function youtubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    let id = u.searchParams.get("v");
    if (!id && u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    if (!id && u.pathname.includes("/embed/")) id = u.pathname.split("/embed/")[1];
    const t = u.searchParams.get("t") || u.searchParams.get("start");
    const start = t ? String(parseInt(t, 10)) : null;
    const params: string[] = [];
    if (list) params.push(`list=${list}`);
    if (start) params.push(`start=${start}`);
    const query = params.length ? `?${params.join("&")}` : "";
    if (id) return `https://www.youtube.com/embed/${id}${query}`;
    if (list) return `https://www.youtube.com/embed/videoseries?list=${list}`;
    return null;
  } catch {
    return `https://www.youtube.com/embed/${url}`;
  }
}

function ytIdFromEmbed(embedSrc: string): string | null {
  const m = embedSrc.match(/\/embed\/([^/?#]+)/);
  if (!m || m[1] === "videoseries") return null;
  return m[1];
}

// Lightweight YouTube facade: shows a clean thumbnail with a properly sized play
// button, then opens a large centered modal player (autoplaying) when clicked.
// Avoids YouTube's oversized in-player title/play overlay on small cards.
export function LiteVideo({ embedSrc, title, vertical }: { embedSrc: string; title: string; vertical?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = ytIdFromEmbed(embedSrc);
  const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  const playSrc = `${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {thumb ? (
        <button type="button" onClick={() => setOpen(true)} aria-label={`Play ${title}`} className="group relative block h-full w-full">
          <img src={thumb} alt={title} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/25">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/65 shadow-md transition group-hover:scale-105 group-hover:bg-red-600">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-white" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
        </button>
      ) : (
        <iframe src={embedSrc} title={title} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
      )}

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={title}>
          <div onClick={(e) => e.stopPropagation()} className={vertical ? "relative h-[88vh] max-w-full" : "relative w-full max-w-5xl"}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close video" className="absolute -top-9 right-0 flex items-center gap-1 text-sm text-white/80 transition hover:text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              Close
            </button>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl" style={{ aspectRatio: vertical ? "9 / 16" : "16 / 9", height: vertical ? "100%" : undefined }}>
              <iframe src={playSrc} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SessionVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-black" style={{ aspectRatio: "16 / 9", maxWidth: "42rem" }}>
      <LiteVideo embedSrc={src} title={title} />
    </div>
  );
}

function DeliveryTable() {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/15">
            {["Content type", "Master / primary", "Additional deliverables"].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DELIVERY_REFERENCE.map((r) => (
            <tr key={r[0]} className="border-b border-white/10">
              <td className="px-3 py-2 whitespace-nowrap font-medium text-foreground">{r[0]}</td>
              <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{r[1]}</td>
              <td className="px-3 py-2 text-muted-foreground">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExportSpecsTable() {
  return (
    <div className="mt-4">
      <h4 className="font-medium text-foreground">Export specs by format</h4>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/15">
              {["Format", "Codec", "Resolution", "FPS", "Bitrate"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {EXPORT_SPECS.map((r) => (
              <tr key={r[0]} className="border-b border-white/10">
                {r.map((c, i) => <td key={i} className={`px-3 py-2 ${i === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WorkReportTable() {
  return (
    <div className="mt-3">
    <a
      href={sampleWorkReportUrl}
      download="Sample Work Report - Ads.csv"
      className="mb-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-foreground hover:border-white/35"
    >
      ↓ Download sample work report (CSV)
    </a>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/15">
            {["Column", "What to record"].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WORK_REPORT.map((r) => (
            <tr key={r[0]} className="border-b border-white/10">
              <td className="px-3 py-2 whitespace-nowrap font-medium text-foreground">{r[0]}</td>
              <td className="px-3 py-2 text-muted-foreground">{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

function IncentiveCards() {
  return (
    <div className="mt-3">
      <p><strong className="text-foreground">Eligibility:</strong> an editor becomes eligible for incentives after 2 months. Once eligible, incentives are earned on top of base pay, based on these factors:</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {INCENTIVE_FACTORS.map(([h, b]) => (
          <div key={h} className="rounded-lg border border-white/10 bg-card p-4">
            <div className="font-medium text-foreground">{h}</div>
            <p className="mt-1 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
      <p className="mt-3"><strong className="text-foreground">In plain terms:</strong> incentives scale with how much the editor delivers, how substantial and clean that work is, and how they show up — behaviour and responsiveness count too. Exact rates are set by the Creative team and reviewed periodically.</p>
    </div>
  );
}

function CompanyOverview() {
  const [zoom, setZoom] = useState<{ src: string; name: string } | null>(null);
  return (
    <div className="mt-3 space-y-5">
      <p>{COMPANY.about}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COMPANY.stats.map(([n, l]) => (
          <div key={l} className="rounded-lg border border-white/10 bg-card p-4">
            <div className="text-xl font-semibold text-foreground">{n}</div>
            <div className="font-label mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium text-foreground">Our Founders</h4>
        <p className="mt-1">{COMPANY.founders}</p>
        <div className="mt-4 space-y-3">
          {COMPANY.founderBios.map((f) => (
            <div key={f.name} className="rounded-lg border border-white/10 bg-card p-4">
              <div className="flex items-start gap-4">
                {FOUNDER_PHOTOS[f.name] && (
                  <button
                    type="button"
                    onClick={() => setZoom({ src: FOUNDER_PHOTOS[f.name], name: f.name })}
                    className="shrink-0 cursor-zoom-in overflow-hidden rounded-lg"
                    aria-label={`Enlarge photo of ${f.name}`}
                  >
                    <img src={FOUNDER_PHOTOS[f.name]} alt={f.name} loading="lazy" className="h-36 w-36 object-cover transition hover:scale-[1.03]" />
                  </button>
                )}
                <div>
                  <div className="font-medium text-foreground">{f.name}</div>
                  <p className="mt-0.5 text-sm italic">"{f.tagline}"</p>
                  <p className="mt-2">{f.bio}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {f.stats.map(([v, l]) => (
                  <div key={l} className="rounded-md border border-white/10 bg-background/40 p-2">
                    <div className="text-sm font-semibold text-foreground">{v}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground">Our Brands</h4>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY.brands.map(([name, domain, tagline]) => {
            const body = (
              <>
                <div className="flex items-center gap-2">
                  {domain && <img src={brandLogo(domain)} alt={`${name} logo`} loading="lazy" className={`h-12 w-12 shrink-0 rounded-md object-contain p-1.5 ${name === "Divinelane" ? "bg-neutral-900" : "bg-white"}`} />}
                  <div className="font-medium text-foreground">{name}</div>
                </div>
                {domain && <div className="font-label mt-1">{domain}</div>}
                <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
              </>
            );
            return domain ? (
              <a key={name} href={`https://${domain}`} target="_blank" rel="noreferrer" className="group rounded-lg border border-white/10 bg-card p-4 hover:border-white/30">{body}</a>
            ) : (
              <div key={name} className="rounded-lg border border-white/10 bg-card p-4">{body}</div>
            );
          })}
        </div>
      </div>

      {zoom && (
        <div
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={zoom.name}
        >
          <img src={zoom.src} alt={zoom.name} className="max-h-[88vh] max-w-[92vw] scale-[1.3] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </div>
  );
}

function SoftwareSetup() {
  return (
    <div className="mt-3 space-y-5">
      <p>The trainer checks the new joinee's system, allots and sets it up, confirms all licenses, and provisions anything missing — then walks through the software we use.</p>

      <div>
        <h4 className="font-medium text-foreground">Adobe Creative Cloud — the collection</h4>
        <p className="mt-1">We edit on the Adobe Creative Cloud collection. The apps you'll use most:</p>
        <ul className="mt-3 space-y-3">
          {ADOBE_APPS.map((t) => <li key={t.name}><ToolCard t={t} /></li>)}
        </ul>
        <p className="mt-3 text-xs italic">Sign in with the company Adobe account — don't install personal or unlicensed copies. Flag any missing app or license to the trainer.</p>
      </div>

      <div>
        <h4 className="font-medium text-foreground">Other tools & subscriptions provided</h4>
        <p className="mt-1">Beyond Adobe, every editor is set up with these accounts:</p>
        <ul className="mt-3 space-y-3">
          {PROVIDED_TOOLS.map((t) => <li key={t.name}><ToolCard t={t} /></li>)}
        </ul>
      </div>
    </div>
  );
}

function WorkflowTools() {
  return (
    <div className="mt-3 space-y-3">
      <p>The trainer sets up these accounts for the new joinee and walks through the daily workflow on each.</p>
      <ul className="space-y-3">
        {COMM_TOOLS.map((t) => {
          const inner = (
            <>
              <img src={t.icon} alt={`${t.name} logo`} loading="lazy" className="h-10 w-10 shrink-0 rounded-md bg-white object-contain p-1.5" />
              <div>
                <div className="text-base font-semibold text-foreground">
                  {t.name}
                  {t.url && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{t.name === "Slack" ? "open app ↗" : "open ↗"}</span>}
                </div>
                <p className="mt-0.5">{t.desc}</p>
              </div>
            </>
          );
          return t.url ? (
            <li key={t.name}>
              <a href={t.url} target={t.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex gap-3 rounded-lg border border-white/10 bg-card p-4 transition hover:border-white/25 hover:bg-card/80">
                {inner}
              </a>
            </li>
          ) : (
            <li key={t.name} className="flex gap-3 rounded-lg border border-white/10 bg-card p-4">
              {inner}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CreativeStructure() {
  return (
    <div className="mt-3 space-y-4">
      <p>Five teams own the video pipeline end-to-end. As an editor you sit in <strong className="text-foreground">Video Editing</strong>, working inside a pod and taking each asset pack through to a finished, on-brand cut.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CREATIVE_TEAMS.map((team) => (
          <div key={team.name} className={`rounded-lg border bg-card p-4 ${team.name === "Video Editing" ? "border-emerald-400/30" : "border-white/10"}`}>
            <div className="font-medium text-foreground">{team.name}{team.name === "Video Editing" && <span className="ml-2 align-middle text-[11px] font-medium text-emerald-300">You</span>}</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {team.items.map((i) => <li key={i}>· {i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandTargets() {
  return (
    <div className="mt-3 space-y-3">
      <p>Who each brand speaks to and how it markets — keep the audience in mind on every cut, since the tone, pace and hook change by brand.</p>
      <ul className="space-y-3">
        {BRAND_TARGETS.map((b) => (
          <li key={b.name} className="rounded-lg border border-white/10 bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {b.domain && <img src={brandLogo(b.domain)} alt={`${b.name} logo`} loading="lazy" className={`h-10 w-10 shrink-0 rounded-md object-contain p-1.5 ${b.name === "Divinelane" ? "bg-neutral-900" : "bg-white"}`} />}
                <div className="text-base font-semibold text-foreground">{b.name}</div>
              </div>
              {b.domain && <a href={`https://${b.domain}`} target="_blank" rel="noreferrer" className="font-label hover:text-foreground">{b.domain}</a>}
            </div>
            <div className="mt-3 space-y-1">
              <p><strong className="text-foreground">Audience —</strong> {b.audience}</p>
              <p><strong className="text-foreground">Marketing —</strong> {b.approach}</p>
              <p><strong className="text-foreground">Target —</strong> {b.target}</p>
              <p><strong className="text-foreground">Editing tone —</strong> {b.tone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkflowPipeline({ steps }: { steps: (string | string[])[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-stretch gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-stretch gap-2">
          <div className="flex flex-col justify-center gap-1.5 rounded-md border border-white/15 bg-background/40 px-3 py-2 text-center text-sm text-foreground">
            {Array.isArray(step) ? (
              step.map((opt, j) => (
                <span key={j} className="flex items-center gap-1.5">
                  {j > 0 && <span className="font-label text-[10px] uppercase text-muted-foreground">or</span>}
                  <span>{opt}</span>
                </span>
              ))
            ) : (
              step
            )}
          </div>
          {i < steps.length - 1 && <span className="self-center text-muted-foreground" aria-hidden>→</span>}
        </div>
      ))}
    </div>
  );
}

function AdTaskTypes() {
  return (
    <ul className="mt-3 space-y-3">
      {AD_TASK_TYPES.map((t) => (
        <li key={t.name} className="rounded-lg border border-white/10 bg-card p-4">
          <div className="font-medium text-foreground">{t.name}</div>
          <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
          {t.workflow && <WorkflowPipeline steps={t.workflow} />}
          {t.videos && (
            <div className="mt-3">
              <p className="font-label text-muted-foreground">Sample videos</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {t.videos.map((v, i) => (
                  <RefVideo key={v.id} id={v.id} vertical title={v.label ?? `Sample ${i + 1}`} />
                ))}
              </div>
            </div>
          )}
          {t.comparisons && (
            <div className="mt-3">
              <p className="font-label text-muted-foreground">Before / after samples</p>
              <div className="mt-2 space-y-4">
                {t.comparisons.map((c) => (
                  <div key={c.label}>
                    <p className="text-sm font-medium text-foreground">{c.label}</p>
                    <div className="mt-1 flex flex-wrap gap-3">
                      <RefVideo id={c.before} vertical title={`${c.label} — Before`} />
                      <RefVideo id={c.after} vertical title={`${c.label} — After`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {t.note && (
            <div className="mt-3 rounded-md border border-amber-400/25 bg-amber-400/5 p-3">
              <p className="font-label text-amber-300">Outro / CTA — update required</p>
              <p className="mt-1 text-sm text-foreground">{t.note}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function PhaseTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/15">
            {["Phase", "Timing", "What goes in it"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-white/10">
              <td className="px-3 py-2 font-medium text-foreground">{r[0]}</td>
              <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{r[1]}</td>
              <td className="px-3 py-2 text-muted-foreground">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RefVideo({ id, vertical, title }: { id: string; vertical?: boolean; title: string }) {
  return (
    <figure className="mt-3">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black" style={{ aspectRatio: vertical ? "9 / 16" : "16 / 9", maxWidth: vertical ? "220px" : "36rem" }}>
        <LiteVideo embedSrc={`https://www.youtube.com/embed/${id}`} title={title} vertical={vertical} />
      </div>
      <figcaption className="mt-1.5 text-[11px] text-muted-foreground">{title}</figcaption>
    </figure>
  );
}

function EditingPipeline() {
  return (
    <ol className="mt-3 grid gap-2 sm:grid-cols-2">
      {EDITING_PIPELINE.map(([t, d], i) => (
        <li key={t} className="rounded-md border border-white/10 bg-card p-3">
          <div className="flex items-baseline gap-2">
            <span className="font-label">{String(i + 1).padStart(2, "0")}</span>
            <div className="text-sm font-medium text-foreground">{t}</div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground leading-snug">{d}</div>
        </li>
      ))}
    </ol>
  );
}

function DeliverableStructure() {
  return (
    <div className="mt-3 space-y-6">
      <div>
        <h4 className="font-medium text-foreground">The four formats</h4>
        <p className="mt-1">Every video produced for House of EdTech falls into one of four formats, each with its own purpose, spec and anatomy.</p>
        <ul className="mt-3 space-y-3">
          {FORMATS.map((f) => (
            <li key={f.name} className="rounded-lg border border-white/10 bg-card p-4">
              <div className="font-medium text-foreground">{f.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.purpose}</p>
              <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <div><span className="font-label">Spec </span>{f.spec}</div>
                <div><span className="font-label">Resolution </span>{f.res}</div>
                <div><span className="font-label">Bitrate </span>{f.br}</div>
              </dl>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-foreground">Ads — anatomy & timing</h4>
        <p className="mt-1 text-xs italic">Timings reference a 40-second ad; scale within the 15–90 sec range. The 5-second outro CTA is mandatory.</p>
        <p className="mt-1 text-sm">Reference channel: <a href="https://www.youtube.com/@be10x/shorts" target="_blank" rel="noreferrer" className="underline text-foreground">Be10X — shorts on YouTube →</a></p>
        <PhaseTable rows={ADS_PHASES} />
        <RefVideo id="rA3aMOED-mQ" vertical title="Ads reference" />
      </div>

      <div>
        <h4 className="font-medium text-foreground">Course videos — structure</h4>
        <p className="mt-1">A course is a series — one intro (30–60 sec), multiple lesson episodes (9×16, 3–12 min, one concept each), and one outro (30–60 sec). Each lesson is a self-contained vertical teaching video: context, core teaching or tool demo, and a short recap.</p>
        <p className="mt-1">Example course videos: <a href="https://drive.google.com/drive/folders/1RDVQfGi46xA1L34cXhk443vYjtBE1sEc" target="_blank" rel="noreferrer" className="underline text-foreground">reference folder →</a></p>
      </div>

      <div>
        <h4 className="font-medium text-foreground">Organic videos — anatomy</h4>
        <p className="mt-1 text-xs italic">Long-form landscape for YouTube, 5–30 min. Timings reference a 10-minute video.</p>
        <p className="mt-1 text-sm">Reference channel: <a href="https://www.youtube.com/@aitv-app" target="_blank" rel="noreferrer" className="underline text-foreground">AI-TV on YouTube →</a></p>
        <PhaseTable rows={ORG_PHASES} />
        <RefVideo id="Z1WIDau4U2U" title="Organic reference" />
      </div>

      <div>
        <h4 className="font-medium text-foreground">Organic shorts — anatomy</h4>
        <p className="mt-1 text-xs italic">Awareness-first for YT Shorts, IG/FB Reels, 15–90 sec. Timings reference a 60-second short.</p>
        <p className="mt-1 text-sm">Reference channel: <a href="https://www.youtube.com/@aitv-app/shorts" target="_blank" rel="noreferrer" className="underline text-foreground">AI-TV — shorts on YouTube →</a></p>
        <PhaseTable rows={SHORT_PHASES} />
        <RefVideo id="whhyAH_ufNU" vertical title="Shorts reference" />
      </div>
    </div>
  );
}

function Day3Section({ section }: { section: string }) {
  const tools = DAY3_SECTIONS[section];
  if (!tools) return null;
  return (
    <div className="mt-3 space-y-5">
      <ul className="space-y-5">
        {tools.map((t) => (
          <li key={t.name} className={`grid gap-4 rounded-lg border border-white/10 bg-card p-4 lg:items-start ${t.video ? "lg:grid-cols-[1fr_280px]" : ""}`}>
            <div>
              <div className="font-medium text-foreground">{t.name}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {t.url && (
                  <a
                    href={`https://${t.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-300 hover:bg-amber-400/20"
                  >
                    {t.url} ↗
                  </a>
                )}
                {t.sop && (
                  <a
                    href={t.sop}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-300 hover:bg-sky-400/20"
                  >
                    SOP ↗
                  </a>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
            {t.video && <RefVideo id={t.video} title={`${t.name} — tutorial`} />}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-4">
        <p className="font-label text-amber-300">Q&amp;A · Trainer-led</p>
        <p className="mt-1 text-foreground">After the walkthroughs, the trainer runs a short Q&amp;A on these tools — clear doubts, share workflow tips, and confirm every editor can use each one confidently.</p>
      </div>
    </div>
  );
}

function ReferenceScripts() {
  return (
    <div className="mt-3">
      <h4 className="font-medium text-foreground">Reference Scripts</h4>
      <p className="mt-1">Sample ad scripts — use these as reference for tone, structure and CTA.</p>

      <div className="mt-4 space-y-4">
        <article className="rounded-lg border border-white/10 bg-card p-5">
          <div className="font-label">Script 1 · Experience isn't enough</div>
          <div className="mt-3 space-y-3">
            <p>Amazon and Google are rejecting 10-year experienced candidates and hiring freshers who know AI tools.</p>
            <p>Because a fresher using AI can build presentations in 60 seconds, automate Excel work in one click, and finish reports that take you hours in just 20 minutes.</p>
            <p>Companies don't care about your experience anymore — they care about how fast you deliver.</p>
            <p>In my 3-hour live workshop I teach you the exact 10 AI tools that these companies are hiring for right now. And you don't need any coding or technical background to get these jobs.</p>
            <p><strong className="text-foreground">CTA —</strong> Click the link below and register now for ₹9 before your experience stops being enough.</p>
          </div>
        </article>

        <article className="rounded-lg border border-white/10 bg-card p-5">
          <div className="font-label">Script 2 · Junior vs experience</div>
          <div className="mt-3 space-y-3">
            <p><strong className="text-foreground">Hook —</strong> "Your junior may have less experience than you, but if they know AI, they can look faster than you."</p>
            <p>This is the uncomfortable part. Experience still matters, but experience plus AI is a different game.</p>
            <p>A junior who knows AI can draft faster, research faster, create options faster, and prepare work in a more structured way. That does not mean they are better than you — it means they are using better tools.</p>
            <p>AI TV helps working professionals catch up with these tools through short, practical videos.</p>
            <p><strong className="text-foreground">CTA —</strong> Download AI TV before your junior becomes the AI person in your team.</p>
          </div>
        </article>
      </div>
    </div>
  );
}

function SessionExtra({ daySlug, session }: { daySlug: string; session: string }) {
  if (daySlug === "day-3" && session === "Hands-on with each tool") return <ReferenceScripts />;
  if (daySlug === "day-3" && DAY3_SECTIONS[session]) return <Day3Section section={session} />;
  if (daySlug === "day-2" && session === "Editing Pipeline") return <EditingPipeline />;
  if (daySlug === "day-2" && session === "Deliverable structure") return <DeliverableStructure />;
  if (daySlug === "day-2" && session === "Ad Task Types") return <AdTaskTypes />;
  if (daySlug === "day-1" && session === "Company & brand overview") return <CompanyOverview />;
  if (daySlug === "day-1" && session === "Audience, marketing & brand targets") return <BrandTargets />;
  if (daySlug === "day-1" && session === "Creative department structure") return <CreativeStructure />;
  if (daySlug === "day-1" && session === "Software requirements & setup") return <SoftwareSetup />;
  if (daySlug === "day-1" && session === "Communication flow") return <WorkflowTools />;
  if (daySlug === "day-2" && session === "Delivery formats") return <><DeliveryTable /><ExportSpecsTable /></>;
  if (daySlug === "day-4" && session === "Work report") return <WorkReportTable />;
  if (daySlug === "day-4" && session === "Incentive structure") return <IncentiveCards />;
  return null;
}

function NotFound({ message }: { message: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{message}</p>
      <Link to="/training" className="mt-3 inline-flex items-center gap-1.5 text-sm underline">Back to Overview</Link>
    </div>
  );
}

function HalfList({ daySlug, title, sessions }: { daySlug: string; title: string; sessions: Session[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-2">
        {sessions.map((s) => (
          <Link key={s.session} to="/training/$day/$session" params={{ day: daySlug, session: slugify(s.session) }} className="group block rounded-lg border border-white/10 bg-card p-4 hover:border-white/30">
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-foreground">{s.session}</div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{s.what}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function DayOverview({ daySlug }: { daySlug: string }) {
  const idx = TRAINING_DAYS.findIndex((d) => d.slug === daySlug);
  const day = TRAINING_DAYS[idx];
  if (!day) return <NotFound message="That day doesn't exist." />;
  const prev = TRAINING_DAYS[idx - 1];
  const next = TRAINING_DAYS[idx + 1];

  return (
    <div>
      <PageHeader eyebrow={`Onboarding & Training · ${day.day}`} title={day.title} intro={day.summary} />
      {day.note && (
        <p className="mb-8 rounded-lg border border-white/10 bg-card p-4 text-sm text-muted-foreground leading-relaxed">{day.note}</p>
      )}
      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <HalfList daySlug={day.slug} title="First Half" sessions={day.first} />
        <HalfList daySlug={day.slug} title="Second Half" sessions={day.second} />
      </div>
      <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
        {prev ? <Link to="/training/$day" params={{ day: prev.slug }} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {prev.day}</Link> : <span />}
        {next ? <Link to="/training/$day" params={{ day: next.slug }} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">{next.day} <ArrowRight className="h-4 w-4" /></Link> : <span />}
      </div>
    </div>
  );
}

export function SessionView({ daySlug, sessionSlug }: { daySlug: string; sessionSlug: string }) {
  const day = findDay(daySlug);
  if (!day) return <NotFound message="That day doesn't exist." />;
  const all = daySessions(day);
  const i = all.findIndex((s) => s.slug === sessionSlug);
  const s = all[i];
  if (!s) return <NotFound message="That session doesn't exist." />;
  const prev = all[i - 1];
  const next = all[i + 1];
  const embed = youtubeEmbed(s.video);

  return (
    <div>
      <Link to="/training/$day" params={{ day: day.slug }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {day.day} · {day.title}
      </Link>

      <PageHeader eyebrow={`${day.day} · ${s.half}`} title={s.session} />

      {s.trainerLed && (
        <p className="-mt-4 mb-6">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">Trainer-led session</span>
        </p>
      )}

      <div className="text-sm text-muted-foreground leading-relaxed">
        <p>{s.what}</p>
        {s.link && (
          <Link to={s.link.to} className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-foreground hover:border-white/35">
            {s.link.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <SessionExtra daySlug={day.slug} session={s.session} />
        {embed && <SessionVideo src={embed} title={s.session} />}
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm">
        {prev
          ? <Link to="/training/$day/$session" params={{ day: day.slug, session: prev.slug }} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {prev.session}</Link>
          : <Link to="/training/$day" params={{ day: day.slug }} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {day.day} overview</Link>}
        {next
          ? <Link to="/training/$day/$session" params={{ day: day.slug, session: next.slug }} className="inline-flex items-center gap-1.5 text-right text-muted-foreground hover:text-foreground">{next.session} <ArrowRight className="h-4 w-4" /></Link>
          : <span />}
      </div>
    </div>
  );
}
