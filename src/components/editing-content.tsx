import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Star, Heart, Bell, Settings, Eye,
  ListChecks, FileText, Archive, Ban, MonitorPlay, Smartphone, Camera, Captions,
  Type, Award, MousePointerClick, IndianRupee, Image as ImageIcon, Shapes, Gauge,
  Shuffle, AudioLines, ClipboardCheck, CheckSquare, Sparkles, RotateCcw, ThumbsDown, VideoOff, type LucideIcon,
} from "lucide-react";
import playlistThumb from "@/assets/editing-guidelines-thumb.png";
import { LiteVideo } from "@/components/TrainingDay";

const SF_PRO = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif";

export const SECTION_META: Record<string, { icon: LucideIcon; color: string }> = {
  "rules-of-thumb": { icon: ListChecks, color: "text-sky-400" },
  "file-naming": { icon: FileText, color: "text-amber-400" },
  "project-backup": { icon: Archive, color: "text-orange-400" },
  "dos": { icon: CheckSquare, color: "text-emerald-400" },
  "non-neg": { icon: Ban, color: "text-rose-400" },
  "organic-safe-zone": { icon: MonitorPlay, color: "text-green-400" },
  "safe-zone": { icon: Smartphone, color: "text-cyan-400" },
  "framing": { icon: Camera, color: "text-violet-400" },
  "caption-rules": { icon: Captions, color: "text-blue-400" },
  "caption-placement": { icon: Captions, color: "text-indigo-400" },
  "supers-placement": { icon: Type, color: "text-fuchsia-400" },
  "symbols": { icon: IndianRupee, color: "text-emerald-400" },
  "logo": { icon: Award, color: "text-yellow-400" },
  "cta": { icon: MousePointerClick, color: "text-pink-400" },
  "visuals": { icon: ImageIcon, color: "text-teal-400" },
  "ai-usage": { icon: Sparkles, color: "text-sky-300" },
  "icons": { icon: Shapes, color: "text-purple-400" },
  "pacing": { icon: Gauge, color: "text-lime-400" },
  "transitions": { icon: Shuffle, color: "text-cyan-400" },
  "audio-mixing": { icon: AudioLines, color: "text-amber-400" },
  "rejection-gallery": { icon: ThumbsDown, color: "text-rose-400" },
  "pre-export-qa": { icon: CheckSquare, color: "text-emerald-400" },
  "accountability": { icon: ClipboardCheck, color: "text-rose-300" },
};

// Order drives the sidebar, the overview grid, and the Rules-of-Thumb order.
export const SECTIONS: [string, string][] = [
  ["rules-of-thumb", "Rules of Thumb"],
  ["file-naming", "File Naming"],
  ["project-backup", "Project Backup"],
  ["dos", "Do's & Don'ts"],
  ["non-neg", "Non-Negotiables"],
  ["organic-safe-zone", "Organic Safe Zone"],
  ["safe-zone", "Ads Safe Zone"],
  ["framing", "Framing"],
  ["caption-rules", "Caption Rules"],
  ["caption-placement", "Caption Placement"],
  ["supers-placement", "Supers Placement"],
  ["symbols", "Symbols & Units"],
  ["logo", "Logo & Watermark"],
  ["cta", "CTA & Endscreen"],
  ["visuals", "Visuals & B-Roll"],
  ["ai-usage", "AI Usage Policy"],
  ["icons", "Icons"],
  ["pacing", "Pacing & Engagement"],
  ["transitions", "Transitions"],
  ["audio-mixing", "Audio Mixing"],
  ["rejection-gallery", "Rejection Gallery"],
  ["pre-export-qa", "Pre-Export QA Checklist"],
  ["accountability", "Accountability"],
];

// Full heading for each section page (some differ from the short sidebar label).
export const SECTION_TITLES: Record<string, string> = {
  "rules-of-thumb": "Rules of Thumb",
  "file-naming": "File Naming Convention",
  "project-backup": "Project Backup & Handoff",
  "dos": "Do's & Don'ts",
  "non-neg": "Non-Negotiables",
  "organic-safe-zone": "Organic Safe Zone — 16 × 9 (1920 × 1080)",
  "safe-zone": "Ads Safe Zone — 9 × 16 (1080 × 1920)",
  "framing": "Talking-Head Framing",
  "caption-rules": "Caption Rules",
  "caption-placement": "Caption Placement",
  "supers-placement": "Supers Placement",
  "symbols": "Symbols & Units",
  "logo": "Logo & Watermark",
  "cta": "CTA & Endscreen",
  "visuals": "Visuals & B-Roll",
  "ai-usage": "AI Usage Policy",
  "icons": "Icons",
  "pacing": "Pacing & Engagement",
  "transitions": "Transitions",
  "audio-mixing": "Audio Mixing Guidelines",
  "rejection-gallery": "Rejection Gallery — Common Mistakes",
  "pre-export-qa": "Pre-Export QA Checklist",
  "accountability": "Editor Accountability & Review",
};

function SLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link to="/editing-guidelines/$slug" params={{ slug }} className="underline text-foreground">
      {children}
    </Link>
  );
}

export function EditingHero() {
  return (
    <div className="mb-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center">
      <div>
        <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="inline-block h-3 w-1 rounded-full bg-gradient-to-b from-sky-400 to-emerald-400" />
          Universal Video Rules · v1.0
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Editing Guidelines</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          The on-screen text rules, symbol conventions, and non-negotiables every House of EdTech video edit follows — regardless of brand, format, or platform.
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          Reference for the <Link to="/training/$day/$session" params={{ day: "day-2", session: "editing-sop-ads-organic-course" }} className="underline text-foreground">Day 2 · Editing SOP</Link> training session.
        </p>
      </div>
      <a
        href="https://www.youtube.com/playlist?list=PLORAS1W4pivTPg_PuFl1abg_Cpo_0Ifok"
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden rounded-lg border border-white/10 bg-card hover:border-white/30"
      >
        <div className="relative bg-black" style={{ aspectRatio: "16 / 9" }}>
          <img src={playlistThumb} alt="Editing Guideline playlist thumbnail" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/30 transition group-hover:bg-black/75">
              <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px] fill-white"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </div>
          <span className="absolute right-2 top-2 rounded bg-black/75 px-2 py-1 text-[11px] font-medium text-white">Playlist</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <div className="font-medium leading-tight">Editing Guideline</div>
            <div className="text-xs text-muted-foreground">YouTube playlist · watch the full series</div>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground transition group-hover:text-foreground">Open ↗</span>
        </div>
      </a>
    </div>
  );
}

type QaItem = { text: string; image?: string };
const QA_GROUPS: { group: string; links: [string, string][]; items: QaItem[] }[] = [
  {
    group: "Safe zone & framing",
    links: [["Ads Safe Zone", "safe-zone"], ["Organic", "organic-safe-zone"], ["Framing", "framing"]],
    items: [
      { text: "All text, logos and faces sit inside the safe zone for the format's ratio." },
      { text: "Subject framed head-high, with the eyes on the upper-third line.", image: "/framing-eye-line.svg" },
    ],
  },
  {
    group: "Captions & supers",
    links: [["Caption Rules", "caption-rules"], ["Placement", "caption-placement"], ["Supers", "supers-placement"]],
    items: [
      { text: "Captions are single-line, around 16 characters, and synced to the voice-over." },
      { text: "Names, word-pairs and measured values kept whole — never split across captions." },
      { text: "Supers placed top or bottom with no overlap; only key keywords bold in a contrasting colour." },
    ],
  },
  {
    group: "Symbols & units",
    links: [["Symbols & Units", "symbols"]],
    items: [{ text: "₹ used for rupees, and every number kept together with its unit (₹999, 25 fps)." }],
  },
  {
    group: "Visuals & icons",
    links: [["Visuals & B-Roll", "visuals"], ["Icons", "icons"]],
    items: [
      { text: "Real dashboards and reports sit in the forefront in a contrasting colour — no filler clips." },
      { text: "One consistent icon style across the whole video." },
    ],
  },
  {
    group: "Pacing & transitions",
    links: [["Pacing", "pacing"], ["Transitions", "transitions"]],
    items: [
      { text: "Clean, intentional cuts with deliberate pacing — nothing sloppy, mistimed or abrupt." },
      { text: "Transitions are motivated, not decorative." },
    ],
  },
  {
    group: "Audio",
    links: [["Audio Mixing", "audio-mixing"]],
    items: [
      { text: "Voice-over clear and leading; peak -5 to -2 dB, loudness -14 LUFS." },
      { text: "Master never clips at 0 dB, with short fades at the start and end." },
    ],
  },
  {
    group: "Brand & accuracy",
    links: [["Logo", "logo"], ["CTA", "cta"], ["Accountability", "accountability"]],
    items: [
      { text: "On-brand and on-spec — ratio, typography and colour all correct." },
      { text: "Logo revealed only at the brand mention and the CTA; the mandatory 5-second outro CTA is present." },
      { text: "Spelling checked across the video and subtitles; prices match the current landing page." },
    ],
  },
  {
    group: "Delivery",
    links: [["File Naming", "file-naming"], ["Project Backup", "project-backup"]],
    items: [
      { text: "File named per the convention (ads)." },
      { text: "Complete project backup with all project files handed over for non-ad deliverables." },
    ],
  },
];

function ImageZoom({ src, label }: { src: string; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-white/35 hover:text-sky-300"
      >
        <Eye className="h-4 w-4 text-sky-300" /> {label}
      </button>
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6" role="dialog" aria-modal="true" aria-label={label}>
          <img src={src} alt={label} className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
}

function PreExportQA() {
  const [zoom, setZoom] = useState<string | null>(null);
  return (
    <>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {QA_GROUPS.map((g) => (
          <div key={g.group} className="rounded-lg border border-white/10 bg-card p-4">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-label text-foreground">{g.group}</span>
              {g.links.map(([label, slug]) => (
                <Link key={slug} to="/editing-guidelines/$slug" params={{ slug }} className="text-[11px] font-medium text-sky-300 underline underline-offset-2 hover:text-sky-200">{label} →</Link>
              ))}
            </div>
            <ul className="mt-2.5 space-y-2">
              {g.items.map((item) => (
                <li key={item.text} className="flex items-start gap-2.5">
                  <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{item.text}</span>
                  {item.image && (
                    <button type="button" onClick={() => setZoom(item.image!)} aria-label="View reference image" title="View reference image" className="ml-0.5 mt-0.5 shrink-0 rounded p-0.5 text-sky-300 transition hover:bg-white/10 hover:text-sky-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {zoom && (
        <div onClick={() => setZoom(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6" role="dialog" aria-modal="true" aria-label="Framing reference image">
          <img src={zoom} alt="Talking-head framing reference — eyes on the upper-third line" className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
}

const AI_DO = [
  "Prioritise real footage and assets; use AI-generated visuals only when no real asset exists and it directly supports the script.",
  "Every AI element must be relevant to what is being said or shown — never decorative AI filler.",
  "Regenerate any avatar, image or clip that looks off, uncanny or incomplete before it reaches the cut.",
  "Match AI visuals to the brand — colour grade, palette, typography and one consistent icon / visual style.",
  "Use only licensed / approved AI voices; the voice-over must stay clear and natural.",
  "Proofread AI output for wrong facts, prices, names and logos — accuracy is on the editor.",
  "Save the prompt, source and licence for every AI-generated asset in the project's licenses folder.",
];
const AI_AVOID = [
  "Don't lean on AI-generated B-roll or stock / foreign faces in place of real, relevant footage.",
  "Don't ship uncanny, half-baked or unrelatable AI avatars or animations.",
  "Don't let AI visuals drift off-brand — mismatched grade, palette or mixed icon styles.",
  "Don't use unlicensed AI voices or clone a real person's voice without approval.",
  "Don't trust AI numbers, claims or spellings without checking against the source and landing page.",
  "Don't use AI output you can't licence or prove the rights to.",
];
const AI_REGEN: [string, string][] = [
  ["Avatar look", "If the generated avatar looks off, uncanny or low-quality, check it and regenerate it."],
  ["Lip-sync & timing", "If the voice and the avatar's mouth or movements are out of sync, regenerate it."],
  ["Actions & expressions", "If the actions, gestures or expressions look wrong or unrelatable to the moment, regenerate it."],
  ["Word pronunciation", "If any word is mispronounced, regenerate it (or fix the script / voice) until every word is correct."],
];

type AntiItem = { title: string; desc: string; fix?: string; clip?: boolean };
const ANTI_PATTERNS: { group: string; slug?: string; items: AntiItem[] }[] = [
  {
    group: "Safe zone & framing",
    slug: "safe-zone",
    items: [
      { title: "Text under the bottom UI", desc: "Captions, supers or the logo sit below the safe zone and get cut off by the platform's bottom bar.", fix: "Keep every element inside the safe zone for the ratio." },
      { title: "Low or mis-framed head", desc: "The head sits low in the frame, or there's a large gap of headroom — eyes off the upper-third line.", fix: "Frame head-high with the eyes on the upper-third line." },
    ],
  },
  {
    group: "Captions",
    slug: "caption-rules",
    items: [
      { title: "Two-line caption", desc: "A caption wraps onto two lines instead of staying short and glanceable.", fix: "One line, around 16 characters." },
      { title: "Captions out of sync", desc: "On-screen text lags or leads the voice-over instead of changing with the words spoken.", fix: "Sync every caption to the VO.", clip: true },
      { title: "Split name or unit", desc: "“Aditya / Kachave” or “999 / rupees” broken across two slides.", fix: "Keep names, word-pairs and measured values whole." },
    ],
  },
  {
    group: "Supers",
    slug: "supers-placement",
    items: [
      { title: "Super overlapping the caption", desc: "A super and the caption sit on top of each other.", fix: "Super top or bottom; never overlap the caption." },
      { title: "Whole sentence bolded", desc: "The entire super is bold instead of just the key words.", fix: "Bold only the keywords in a contrasting colour." },
    ],
  },
  {
    group: "Symbols & units",
    slug: "symbols",
    items: [
      { title: "Wrong rupee format", desc: "“999 rupees”, “Rs. 999” or “999/-” instead of the symbol.", fix: "Use ₹999 — symbol before the number, no space." },
      { title: "Unitless number", desc: "A measurement shown with no unit.", fix: "Pair every number with its unit (25 fps, 3 hrs)." },
    ],
  },
  {
    group: "Visuals & B-roll",
    slug: "visuals",
    items: [
      { title: "Filler B-roll / stock faces", desc: "Random clips or foreign faces with no link to what's being said.", fix: "Use real, relevant dashboards, reports and footage." },
      { title: "Key visual buried", desc: "The dashboard or report is hidden in the background.", fix: "Bring it to the forefront in a contrasting colour." },
    ],
  },
  {
    group: "Icons",
    slug: "icons",
    items: [
      { title: "Mixed icon styles", desc: "Outline and filled — or different icon families — in the same video.", fix: "One consistent style throughout." },
      { title: "Banned icon styles", desc: "Lineal-colour, hand-drawn or flat icons.", fix: "Use Black outline, Black filled or Gradient from Flaticon." },
    ],
  },
  {
    group: "Transitions",
    slug: "transitions",
    items: [
      { title: "Gimmicky transitions", desc: "A clean cut ruined by a glitch, wipe or 3D spin.", fix: "Clean cut on the beat; motivated transitions only.", clip: true },
      { title: "Transition soup", desc: "A different transition on every cut.", fix: "Pick a small, consistent set per video." },
    ],
  },
  {
    group: "Audio",
    slug: "audio-mixing",
    items: [
      { title: "Music overpowering the VO", desc: "Music or SFX buries the voice-over instead of ducking under it.", fix: "Duck music 6–12 dB under the VO.", clip: true },
      { title: "Clipping master", desc: "The master peaks at 0 dB and distorts.", fix: "Peak -5 to -2 dB, loudness -14 LUFS." },
    ],
  },
  {
    group: "AI & animations",
    slug: "ai-usage",
    items: [
      { title: "Uncanny avatar / broken lip-sync", desc: "An AI avatar that looks off or whose mouth is out of sync with the audio.", fix: "Regenerate until the look and sync are right.", clip: true },
      { title: "Garbled AI text", desc: "AI-generated on-screen text is misspelled or gibberish.", fix: "Replace with real, proofread text." },
      { title: "Half-baked animation", desc: "An incomplete, awkwardly timed or unrelatable animation left in the cut.", fix: "If it doesn't earn its place, cut it." },
    ],
  },
];

function RejectionGallery() {
  return (
    <>
      <p>The most common reasons a cut gets sent back. Use this as a “what not to do” reference — if your edit matches any of these, fix it before review. Items marked with a video slot will get a real before/after example added.</p>
      <div className="mt-4 space-y-7">
        {ANTI_PATTERNS.map((g) => (
          <div key={g.group}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-foreground">{g.group}</h3>
              {g.slug && <SLink slug={g.slug}>See section →</SLink>}
            </div>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              {g.items.map((it) => (
                <div key={it.title} className="overflow-hidden rounded-lg border border-rose-400/25 bg-rose-400/5">
                  {it.clip && (
                    <div className="flex flex-col items-center justify-center gap-1.5 border-b border-white/10 bg-black/40 text-center" style={{ aspectRatio: "16 / 9" }}>
                      <VideoOff className="h-7 w-7 text-muted-foreground" />
                      <span className="font-label">Example video · to be added</span>
                      <span className="px-3 text-[11px] text-muted-foreground">“{it.title}”</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2.5 p-4">
                    <ThumbsDown className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <div>
                      <div className="font-medium text-foreground">{it.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                      {it.fix && <p className="mt-1.5 text-sm text-emerald-300">Fix — {it.fix}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Inner content for each section page, keyed by slug. */
export const SECTION_BODIES: Record<string, React.ReactNode> = {
  "rules-of-thumb": (
    <>
      <p>A fast self-check across the whole guideline — run through these before sending any cut for review. There's one line per section, in the same order as the sidebar; each links to the section with the full detail.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">File naming</strong> — name the output file per the convention (<SLink slug="file-naming">File Naming</SLink>).</li>
        <li><strong className="text-foreground">Project backup</strong> — for every non-ad deliverable, hand over the complete project backup with all project files (<SLink slug="project-backup">Project Backup</SLink>).</li>
        <li><strong className="text-foreground">Do's &amp; Don'ts</strong> — follow the universal do's and don'ts (<SLink slug="dos">Do's &amp; Don'ts</SLink>).</li>
        <li><strong className="text-foreground">Non-negotiables</strong> — front angle first then cross angles; finished animations; every visual relevant (<SLink slug="non-neg">Non-Negotiables</SLink>).</li>
        <li><strong className="text-foreground">Organic safe zone</strong> — keep key elements inside the 16 × 9 title-safe block, clear of YouTube UI (<SLink slug="organic-safe-zone">Organic Safe Zone</SLink>).</li>
        <li><strong className="text-foreground">Ads safe zone</strong> — keep all text, logos and faces inside the 9 × 16 safe zone (<SLink slug="safe-zone">Ads Safe Zone</SLink>).</li>
        <li><strong className="text-foreground">Framing</strong> — head high, eyes on the upper-third line (<SLink slug="framing">Framing</SLink>).</li>
        <li><strong className="text-foreground">Caption rules</strong> — single line, ~16 characters, synced to the VO; never split names, word-pairs or measured values (<SLink slug="caption-rules">Caption Rules</SLink>).</li>
        <li><strong className="text-foreground">Caption placement</strong> — one line, low in the safe zone; just above the seam on split screens (<SLink slug="caption-placement">Caption Placement</SLink>).</li>
        <li><strong className="text-foreground">Supers placement</strong> — top or bottom, never overlapping captions; bold only the key keywords in a contrasting colour (<SLink slug="supers-placement">Supers Placement</SLink>).</li>
        <li><strong className="text-foreground">Symbols &amp; units</strong> — use ₹ and keep every number with its unit (<SLink slug="symbols">Symbols &amp; Units</SLink>).</li>
        <li><strong className="text-foreground">Logo &amp; watermark</strong> — supplied asset only; reveal at the brand mention and the CTA; constant size and opacity (<SLink slug="logo">Logo &amp; Watermark</SLink>).</li>
        <li><strong className="text-foreground">CTA &amp; endscreen</strong> — mandatory 5-second outro CTA on the approved template (<SLink slug="cta">CTA &amp; Endscreen</SLink>).</li>
        <li><strong className="text-foreground">Visuals</strong> — real dashboards and reports in the forefront and in a contrasting colour; no random filler clips (<SLink slug="visuals">Visuals &amp; B-Roll</SLink>).</li>
        <li><strong className="text-foreground">AI usage</strong> — real wins; review and regenerate any off AI video or avatar; licence every asset (<SLink slug="ai-usage">AI Usage Policy</SLink>).</li>
        <li><strong className="text-foreground">Icons</strong> — one consistent style (outline, filled or gradient); avoid lineal-colour, hand-drawn or flat; source from Flaticon (<SLink slug="icons">Icons</SLink>).</li>
        <li><strong className="text-foreground">Pacing &amp; engagement</strong> — remove filler and dead air; a visible change every few seconds, no scenes that drag (<SLink slug="pacing">Pacing &amp; Engagement</SLink>).</li>
        <li><strong className="text-foreground">Transitions</strong> — clean cuts on the beat, a small consistent set; no glitch, wipe or 3D (<SLink slug="transitions">Transitions</SLink>).</li>
        <li><strong className="text-foreground">Audio</strong> — voice-over leads, music and SFX duck under it; peak -5 to -2 dB, -14 LUFS, never clipping (<SLink slug="audio-mixing">Audio Mixing</SLink>).</li>
        <li><strong className="text-foreground">Rejection gallery</strong> — check your cut against the common rejection reasons (<SLink slug="rejection-gallery">Rejection Gallery</SLink>).</li>
        <li><strong className="text-foreground">Pre-export QA</strong> — run the full Pre-Export QA Checklist before exporting (<SLink slug="pre-export-qa">Pre-Export QA Checklist</SLink>).</li>
        <li><strong className="text-foreground">Accountability</strong> — the first cut should be publish-ready; proofread spelling and check prices match the landing page (<SLink slug="accountability">Accountability</SLink>).</li>
      </ul>
    </>
  ),

  "file-naming": (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start">
      <div>
        <p>This naming convention is for <strong className="text-foreground">ads only</strong>. Every exported ad file follows this pattern so each asset stays traceable from brief to delivery:</p>
        <pre className="mt-3 overflow-x-auto rounded-md border border-white/15 bg-white/5 p-3 text-sm">Product_Copywriter_AssetType+Number_Ratio_POC_Creator</pre>
        <p className="mt-3 text-sm">Example: <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-foreground">AI_AK_VS101_9016_KV_SM</code></p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="border-b border-white/15">{["Field", "Example", "Meaning"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["Product", "AI", "The product or brand."],
                ["Copywriter", "AK", "Copywriter's initials (e.g. AK = Aditya Kachave)."],
                ["Asset Type + Number", "VS101", "Asset type code + sequence number (e.g. VS = Video Script)."],
                ["Ratio", "9016", "Aspect ratio — 9016 = 9×16, 0101 = 1×1, 1609 = 16×9."],
                ["POC", "KV", "Point of contact's initials (e.g. KV = Kushagra Varma)."],
                ["Creator", "SM", "The creator / editor's initials (e.g. SM = Sathiya Moorthy)."],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{r[0]}</td>
                  <td className="px-3 py-2 font-mono whitespace-nowrap">{r[1]}</td>
                  <td className="px-3 py-2">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic">Separate every field with an underscore (_) and keep the order exactly as shown.</p>
      </div>
      <figure className="overflow-hidden rounded-lg border border-white/10 bg-black lg:sticky lg:top-8">
        <video src="/file-naming-convention.mp4" poster="/file-naming-poster.jpg" controls playsInline preload="metadata" className="block w-full" style={{ aspectRatio: "16 / 9" }} />
        <figcaption className="px-3 py-2 text-xs text-muted-foreground">Watch: how each field of the file name is built — Product · Copywriter · Asset · Ratio · POC · Creator.</figcaption>
      </figure>
    </div>
  ),

  "project-backup": (
    <>
      <p>For <strong className="text-foreground">every deliverable except ads</strong> — organic videos, organic shorts and course videos — the editor must hand over the <strong className="text-foreground">complete project backup, including all project files</strong> (project/source files, linked assets, graphics and audio), packaged and named <strong className="text-foreground">as per the SOP</strong>.</p>
      <p className="mt-2 text-sm">This keeps every non-ad project re-openable and re-editable by the team later. Ads follow the file-naming and delivery convention above and do not require the full project backup.</p>
    </>
  ),

  "dos": (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead><tr className="border-b border-white/15"><th className="px-3 py-2 text-left font-medium text-emerald-300">✓ Do's</th><th className="px-3 py-2 text-left font-medium text-rose-300">✕ Don'ts</th></tr></thead>
        <tbody>
          {[
            ["Keep all text, logos and faces inside the safe zone for the video's ratio.", "Don't place captions, text or logos below the bottom UI keep-clear band."],
            ["Frame the subject with the head high and the eyes on the upper-third line.", "Don't centre the head low or leave a large gap of headroom above it."],
            ["Keep captions to a single line, around 16 characters, synced to the voice-over.", "Don't wrap a caption onto two lines or let it drift out of sync."],
            ["Keep names, word-pairs and measured values whole on one caption.", "Don't split names, break word-pairs like machine learning, or separate a number from its unit."],
            ["Reveal list points one at a time, in sync with the voice-over.", "Don't show the whole list on screen before it is spoken."],
            ["Place captions low in the safe zone, centred horizontally.", "Don't let a caption sit over the bottom UI or fall below the safe zone."],
            ["On a split screen, place the caption just above the centre split line.", "Don't rest the caption directly on the split line."],
            ["Maintain proper caption spacing so every glyph stays clean.", "Don't let letters collide, overlap, or fall apart."],
            ["Use the ₹ symbol and keep every number with its unit — ₹999, 25 fps.", "Don't spell out rupees, write Rs. or 999/-, or leave a measurement unitless."],
            ["Place supers at the top or bottom of the safe zone, up to two lines.", "Don't let supers and captions overlap."],
            ["Cut clean on the beat and keep a small, consistent transition set.", "Don't use glitch, wipe, 3D spins, or a different transition every cut."],
            ["Mix with the voice-over leading — duck music and SFX under it, peak -5 to -2 dB.", "Don't let SFX overpower the VO or let the master clip at 0 dB."],
            ["Prioritise real footage; reveal the logo only at the brand mention and the CTA.", "Don't lean on AI-generated B-roll or keep the logo on screen throughout."],
            ["Use one consistent icon style across the whole video (outline, filled or gradient).", "Don't mix icon styles, or use lineal-colour, hand-drawn or flat icons."],
            ["Use clean, high-contrast layouts with clear typographic hierarchy.", "Don't overcrowd the frame — give content room to breathe."],
          ].map((r, i) => (
            <tr key={i} className="border-b border-white/10">
              <td className="px-3 py-2">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),

  "non-neg": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">1 · Camera angles</h3>
          <ul className="mt-1.5 list-disc pl-5 space-y-1">
            <li>Open the ad on the <strong className="text-foreground">front camera angle</strong>.</li>
            <li>Bring in <strong className="text-foreground">cross angles in between</strong>.</li>
            <li>Keep a <strong className="text-foreground">clean mix of both</strong> throughout.</li>
            <li>This creates rhythm, holds attention, and stops the edit feeling flat or one-note.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">2 · Animations</h3>
          <ul className="mt-1.5 list-disc pl-5 space-y-1">
            <li>Every animation must feel <strong className="text-foreground">finished and intentional</strong>.</li>
            <li>Cut anything that looks <strong className="text-foreground">incomplete, awkwardly timed, or half-baked</strong>.</li>
            <li>Cut anything even slightly <strong className="text-foreground">unrelatable</strong> to the moment on screen.</li>
            <li>If an animation doesn't earn its place, cut it.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">3 · Visual relevance</h3>
          <ul className="mt-1.5 list-disc pl-5 space-y-1">
            <li>Every visual — <strong className="text-foreground">B-roll, motion graphics, text overlays, supers</strong> — must relate to what's being said or shown in that moment.</li>
            <li><strong className="text-foreground">No filler shots</strong> and no decorative visuals that don't support the message.</li>
            <li>If a visual doesn't reinforce the script, it doesn't belong.</li>
          </ul>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black lg:sticky lg:top-8" style={{ aspectRatio: "16 / 9" }}>
        <LiteVideo embedSrc="https://www.youtube.com/embed/KBR_nWRTMBI?list=PLORAS1W4pivTPg_PuFl1abg_Cpo_0Ifok&index=3" title="Editing Guidelines walkthrough" />
      </div>
    </div>
  ),

  "organic-safe-zone": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-3">
        <p>Long-form organic videos for YouTube are built on a 16 × 9 master at 1920 × 1080. YouTube overlays its own UI on top of the frame, so keep every critical element inside a central title-safe block.</p>
        <h3 className="text-base font-semibold text-foreground pt-1">Basic Safe Zone Rules</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Keep titles, lower-thirds, logos and key text inside a title-safe block — roughly a <strong className="text-foreground">5% margin</strong> on every edge (about 90 px sides, 50 px top and bottom).</li>
          <li><strong className="text-foreground">Bottom strip</strong> — the player progress bar and controls cover the bottom of the frame. Keep captions and lower-thirds clear of the bottom ~10% (about 100 px).</li>
          <li><strong className="text-foreground">End screens</strong> — in the last ~20 seconds YouTube overlays subscribe and video cards, mostly bottom and right. Keep that closing section clear of important visuals.</li>
          <li><strong className="text-foreground">Corners</strong> — leave the bottom-right clear for the timestamp, and the top-right clear for the info / cards icon.</li>
          <li>Burned-in captions sit lower-centre, above the player bar — don't clash with YouTube's own CC area.</li>
        </ul>
        <p className="italic text-xs">YouTube's UI changes over time — treat these as a safe baseline and re-check against a live placement before shipping.</p>
      </div>
      <div className="flex justify-center lg:sticky lg:top-8"><OrganicSafeZoneDiagram /></div>
    </div>
  ),

  "safe-zone": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-3">
        <p>Every short-form ad is built on a 9 × 16 master. The safe zone is the area of the frame that stays clear of platform UI — all critical elements (headlines, supers, captions, logo, CTA, faces) must sit inside it.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="border-b border-white/15">{["Edge", "Keep Clear", "What sits there"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["Top", "60 px", "Edge margin only — no header space needed"],
                ["Bottom", "450 px", "Profile, caption, audio tag, and navigation bar"],
                ["Right", "135 px", "Action buttons — like, comment, share, save"],
                ["Left", "60 px", "Edge breathing room"],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground">{r[0]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[1]}</td>
                  <td className="px-3 py-2">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Safe zone: a central block of <strong>885 × 1410 px</strong> — x 60 to 945, y 60 to 1470. Every headline, super, the logo, and the CTA must sit inside this block.</p>
        <h3 className="text-base font-semibold text-foreground pt-3">Safe Zone Rules</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Build every ad to these margins so one master is safe on every platform without reframing text.</li>
          <li>Logo — place it inside the top of the safe zone, in a corner captions and supers never reach.</li>
          <li>Captions & supers — keep them inside the safe zone. Never let text fall below the bottom boundary.</li>
          <li>CTA — keep the end-card CTA fully inside the safe zone, clear of both the bottom UI and the right-side action buttons.</li>
          <li>Faces — keep the on-screen presenter framed within the safe zone; the right-side action-button strip must never crop the face.</li>
          <li>Derived ratios — when reframing to 1 × 1 and 16 × 9 from the 9 × 16 master, re-check that every element still falls inside that ratio's safe area.</li>
        </ul>
        <p className="italic text-xs">App interfaces change over time. These margins are a safe baseline — re-check against a live placement before shipping.</p>
        <h3 className="text-base font-semibold text-foreground pt-3">Split-Screen Layout</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>When an ad uses a split screen, split the 9 × 16 frame horizontally at the exact centre — two stacked panels of <strong className="text-foreground">1080 × 960</strong> (split on the centre line, y = 960, so both panels are equal).</li>
          <li>Keep each panel's key content — faces, text — inside the safe zone.</li>
          <li>The bottom panel still respects the bottom UI keep-clear zone; don't place critical content low in it.</li>
          <li>Don't split off-centre or use uneven panels.</li>
          <li>Place the caption a little above the centre split line so it sits over the seam — see <SLink slug="caption-placement">Caption Placement</SLink>.</li>
        </ul>
      </div>
      <div className="flex justify-center lg:sticky lg:top-8"><SafeZoneDiagram /></div>
    </div>
  ),

  "framing": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-3">
        <p>Frame the subject so the head sits high in the frame with the eyes resting on the upper-third line.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Close-up shot</strong> — head and shoulders fill the frame, eyes on the upper-third line, only a small gap of headroom above the head.</li>
          <li><strong>Wide shot</strong> — the subject is smaller with room around them, but the head still sits in the upper part of the frame and the eyes stay near the upper-third line.</li>
          <li>Keep the face inside the safe zone in both shots, well clear of the right-side action buttons.</li>
          <li>Don't centre the head low in the frame or leave a large empty gap of headroom above it.</li>
        </ul>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:sticky lg:top-8">
        <FramingDiagram variant="close" />
        <FramingDiagram variant="wide" />
      </div>
    </div>
  ),

  "caption-rules": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Length</strong> — keep every caption short and glanceable. Keep on-screen lines around 16 characters per line wherever possible.</li>
          <li><strong className="text-foreground">Spacing</strong> — maintain proper text spacing; never let glyphs collide or fall apart.</li>
          <li><strong className="text-foreground">Sync with the voice-over</strong> — every caption must appear and change exactly with the words being spoken.</li>
          <li><strong className="text-foreground">One point at a time</strong> — when the VO lists points, reveal them one by one. Never show the whole list before it is spoken.</li>
          <li><strong className="text-foreground">Never split word combinations</strong> — keep pairs like "machine learning" or "career growth" whole.</li>
          <li><strong className="text-foreground">Never split names</strong> — a person's name, brand name, or product name always stays whole on one caption.</li>
          <li><strong className="text-foreground">Never break measured entities</strong> — a number and its unit stay together: "1 AM", "₹999", "10X", "3 hours", "25 fps".</li>
        </ul>
        <p>The 16-character limit keeps captions glanceable. The no-split rules above always take priority — if keeping a name, word-pair, or measured value whole would push a caption slightly past 16 characters, keep it whole.</p>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black lg:sticky lg:top-8" style={{ aspectRatio: "16 / 9" }}>
        <LiteVideo embedSrc="https://www.youtube.com/embed/0BdK2SjNUqQ?list=PLORAS1W4pivTPg_PuFl1abg_Cpo_0Ifok&index=2&start=1" title="Caption rules walkthrough" />
      </div>
    </div>
  ),

  "caption-placement": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <ul className="list-disc pl-5 space-y-1">
        <li>A caption is a single line — never wrap a caption onto two lines.</li>
        <li>Place it low in the safe zone, centred horizontally, resting above the bottom UI keep-clear zone.</li>
        <li><strong className="text-foreground">On a split screen</strong> — place the caption a little above the centre split line so it sits over the seam, not resting directly on the line.</li>
        <li>Captions are synced to the voice-over.</li>
      </ul>
      <div className="grid gap-4 sm:grid-cols-2 lg:sticky lg:top-8">
        <PlacementDiagram variant="caption" />
        <SplitCaptionDiagram />
      </div>
    </div>
  ),

  "supers-placement": (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <ul className="list-disc pl-5 space-y-1">
        <li>A super sits in one of two positions — top or bottom of the safe zone.</li>
        <li>A super runs up to 2 lines.</li>
        <li>When a super needs more room, it may sit in the centre at 3 to 4 lines.</li>
        <li>Supers and captions must never overlap.</li>
        <li>Add a headline wherever it helps orient the viewer.</li>
        <li>Emphasise only the important keywords — set them bold and in a contrasting colour (e.g. Salary Hike, 17 LPA, Prompt Engineer). Never bold a full sentence; put the rest in subtitles.</li>
        <li>Use ALL CAPS only for 1–3 words (a CTA or key emphasis), with +2–4% letter-spacing — never for full lines. Keep on-screen type consistent; clarity over decoration.</li>
      </ul>
      <div className="flex justify-center"><PlacementDiagram variant="super" /></div>
    </div>
  ),

  "symbols": (
    <>
      <ul className="list-disc pl-5 space-y-1">
        <li>Always use the ₹ symbol for rupees — write ₹999, never "999 rupees", "Rs. 999", or "999/-". The symbol sits directly before the number with no space.</li>
        <li>Always pair a number with its correct unit and keep the two together — %, fps, hrs, min, sec, GB, and so on. Never leave a measurement unitless.</li>
        <li>This applies to captions and supers alike.</li>
      </ul>
      <h3 className="text-base font-semibold text-foreground pt-2">Visual Examples</h3>
      <div className="grid gap-4 sm:grid-cols-2 mt-2">
        <SymbolFrame ok label="₹999" sub="Symbol + number together" />
        <SymbolFrame label="999 rupees" sub="Never spell out — use ₹" />
        <SymbolFrame ok label="25 fps" sub="Number + unit together" />
        <SymbolFrame label="25" sub="Missing unit" />
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b border-white/15"><th className="px-3 py-2 text-left font-medium text-emerald-300">✓ Correct</th><th className="px-3 py-2 text-left font-medium text-rose-300">✕ Incorrect</th></tr></thead>
          <tbody>
            {[
              ["[Slide 1] The shift starts at 1 AM.", "[Slide 1] The shift starts at 1 [Slide 2] AM."],
              ["[Slide 1] Aditya Kachave", "[Slide 1] Aditya [Slide 2] Kachave"],
              ["[Slide 1] Save ₹999 today", "[Slide 1] Save 999 [Slide 2] rupees"],
              ["List points revealed one per slide, in sync with the voice-over.", "The whole list shown on one slide before it is spoken."],
            ].map((r, i) => (
              <tr key={i} className="border-b border-white/10">
                <td className="px-3 py-2">{r[0]}</td>
                <td className="px-3 py-2">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ),

  "logo": (
    <>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use the supplied logo / watermark asset only — never redraw, restretch, recolour, or rebuild it.</li>
        <li>Use the provided logo watermark — place it in a corner of the safe zone, clear of captions, supers and the subject's face.</li>
        <li>Keep size and opacity constant for the full duration of the ad — don't fade it in and out.</li>
      </ul>
      <p>Each brand supplies its own logo and watermark in its <Link to="/brand-guidelines" className="underline text-foreground">Brand &amp; Style Guideline</Link>.</p>
    </>
  ),

  "cta": (
    <>
      <p>Every ad closes with the mandatory <strong className="text-foreground">5-second outro CTA</strong> — the endscreen. It is the last thing the viewer sees, so it must be on-brand and consistent across every ad.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use the approved endscreen template for the brand — don't rebuild or restyle it.</li>
        <li>One clear call to action, stated verbally and shown on screen.</li>
        <li>Keep the CTA and logo fully inside the safe zone, clear of the bottom UI band and the right-side action buttons.</li>
        <li>Hold the endscreen for the full 5 seconds at the end of the ad.</li>
      </ul>
    </>
  ),

  "visuals": (
    <>
      <p>Every visual must reinforce the script and keep the viewer hooked. Use real, relevant material — never filler.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Use real assets</strong> — show actual dashboards, reports, presentations and Excel sheets as named in the script, not animated images or illustrations standing in for them.</li>
        <li><strong className="text-foreground">Keep key visuals in the forefront</strong> — dashboards and reports sit full and legible in the foreground, never buried in the background.</li>
        <li><strong className="text-foreground">No filler</strong> — don't use random clips or stock / foreign faces in the background or B-roll. Drop in the relevant sheet, dashboard or report at the exact moment it's mentioned.</li>
        <li><strong className="text-foreground">Make key elements stand out</strong> — report and dashboard visuals, prices and numbers must sit in a contrasting colour and never blend into the background, or they lose their hook.</li>
        <li><strong className="text-foreground">Add relevant images and clips</strong> wherever they reinforce the script.</li>
      </ul>
    </>
  ),

  "ai-usage": (
    <>
      <p>AI is a tool to speed up and strengthen the edit — never a shortcut that lowers the bar. It applies across every brand and format: real, relevant and on-brand always wins, and the editor stays accountable for everything AI produces.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-4">
          <div className="font-label text-emerald-300">✓ DO</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">{AI_DO.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-4">
          <div className="font-label text-rose-300">✕ AVOID</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">{AI_AVOID.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-sky-400/30 bg-sky-400/5 p-4">
        <div className="font-label flex items-center gap-1.5 text-sky-300"><RotateCcw className="h-3.5 w-3.5" /> Review &amp; regenerate every AI video</div>
        <p className="mt-2">After generating any AI video, <strong className="text-foreground">review it in full before it goes in the cut</strong> — never trust the first render. The actions, sync and word pronunciation must all be correct; if anything is off, <strong className="text-foreground">regenerate it</strong>.</p>
        <ul className="mt-2.5 space-y-1.5">
          {AI_REGEN.map(([title, desc]) => (
            <li key={title} className="flex items-start gap-2.5">
              <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <span><strong className="text-foreground">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-sm">Only keep an AI video once the <strong className="text-foreground">avatar look, sync, actions and pronunciation are all correct</strong> — otherwise generate it again.</p>
      </div>
    </>
  ),

  "icons": (
    <>
      <p>Icons help label points, mark steps, and reinforce a concept at a glance — but only when they're used consistently. Use them wherever they add clarity, never as decoration.</p>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start">
        <div>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Use proper icons wherever needed</strong> — to tag points, steps, features, or ideas the script calls out.</li>
            <li><strong className="text-foreground">One style across the whole video</strong> — pick a single icon style and stick to it. Never mix styles (e.g. outline with filled, or different icon families) in the same video.</li>
            <li><strong className="text-foreground">Follow the brand-suggested styles</strong> — Black outline, Black filled, or Gradient. Choose one per video and keep it consistent.</li>
            <li><strong className="text-foreground">Avoid</strong> Lineal colour, Hand drawn, and Flat icon styles.</li>
            <li><strong className="text-foreground">Source from one library</strong> — pull icons from Flaticon (the approved library) so weight and proportions stay consistent.</li>
          </ul>
          <div className="mt-4"><ImageZoom src="/icon-styles.svg" label="View icon-style reference" /></div>
          <div className="mt-5"><IconStyleDiagram /></div>
        </div>
        <figure className="overflow-hidden rounded-lg border border-white/10 bg-black lg:sticky lg:top-8">
          <video src="/icons-guide.mp4" poster="/icons-poster.jpg" controls playsInline preload="metadata" className="block w-full" style={{ aspectRatio: "16 / 9" }} />
          <figcaption className="px-3 py-2 text-xs text-muted-foreground">Watch: icon style do's &amp; don'ts — one consistent style, Black outline / filled / gradient, sourced from Flaticon.</figcaption>
        </figure>
      </div>
    </>
  ),

  "pacing": (
    <ul className="list-disc pl-5 space-y-1">
      <li>Remove filler words ("um", "ah"), long pauses, and dead air — while preserving natural delivery.</li>
      <li>Keep the edit moving with a visible change every few seconds; no scenes that drag, no abrupt jumps.</li>
    </ul>
  ),

  "transitions": (
    <>
      <p>Transitions exist to build curiosity and carry momentum between beats — never to decorate. Every transition must be motivated by the cut: a change of scene, a shift in energy, or a reveal. If a cut works clean, leave it clean.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-4">
          <div className="font-label text-emerald-300">✓ USE</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Light leaks</strong> — for warm, organic scene changes and time jumps.</li>
            <li><strong className="text-foreground">Camera shake</strong> — to add impact on a hook, punchline, or hard beat.</li>
            <li><strong className="text-foreground">Subtle motion-based transitions</strong> — whip pans, push-ins, zoom blurs that follow the on-screen movement.</li>
            <li><strong className="text-foreground">Clean cuts on the beat</strong> — the default; cut on the music or the breath, not at random.</li>
            <li><strong className="text-foreground">Match cuts</strong> — carry shape, motion, or position across the cut for a seamless flow.</li>
            <li><strong className="text-foreground">Quick cross-dissolves</strong> — only for soft time passage or B-roll montages, kept short.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-4">
          <div className="font-label text-rose-300">✕ AVOID</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Glitch effects</strong> — cheap, dated, and distracting from the message.</li>
            <li><strong className="text-foreground">Wipe transitions</strong> — slides, bars, and shapes that scream "template".</li>
            <li><strong className="text-foreground">Harsh colour transitions</strong> — flashes or hue shifts that break the grade.</li>
            <li><strong className="text-foreground">Spin, cube, and 3D page turns</strong> — gimmicky and off-brand.</li>
            <li><strong className="text-foreground">Long, slow dissolves</strong> — they kill pace in short-form.</li>
            <li><strong className="text-foreground">A different transition every cut</strong> — inconsistency reads as amateur.</li>
          </ul>
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground pt-3">Transition Rules of Thumb</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Motivated, not decorative</strong> — a transition must earn its place. When in doubt, use a clean cut.</li>
        <li><strong className="text-foreground">Keep them fast</strong> — in short-form, transitions run roughly 6–24 frames; anything slower drags the pace.</li>
        <li><strong className="text-foreground">Stay consistent</strong> — pick a small, repeatable set per video so the edit feels intentional, not random.</li>
        <li><strong className="text-foreground">Pair with sound, sparingly</strong> — transition SFX can sell a cut but must never overpower or overlap the voice-over (see <SLink slug="audio-mixing">Audio Mixing</SLink>).</li>
        <li><strong className="text-foreground">Cut on motion or the beat</strong> — hide the cut inside movement or land it on the music for a smoother flow.</li>
        <li><strong className="text-foreground">Never let a transition cover content</strong> — it should bridge beats, not hide a missing shot or a weak edit.</li>
      </ul>
    </>
  ),

  "audio-mixing": (
    <>
      <p>Audio carries the message as much as the visuals. Mix every video so the voice-over leads and everything else supports it — clean, balanced, and on-spec for delivery.</p>
      <div className="grid gap-6 lg:grid-cols-[1fr_240px] lg:items-start">
        <div>
          <h3 className="text-base font-semibold text-foreground pt-3">Levels & Loudness</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Voice-over is the priority — it sits on top of the mix and stays clearly intelligible at all times.</li>
            <li>Final audio peak between <strong className="text-foreground">-5 dB and -2 dB</strong>, loudness target <strong className="text-foreground">-14 LUFS</strong>.<a href="https://www.youtube.com/watch?v=kzYiB1Kd3wg&t=69s" target="_blank" rel="noreferrer" className="ml-1 align-super text-[10px] underline text-muted-foreground hover:text-foreground" title="Reference: understanding LUFS">[ref]</a></li>
            <li>Never let the master clip at 0 dB — always leave headroom.</li>
            <li>Keep VO volume consistent across every cut — no jumps between shots or scenes.</li>
          </ul>
          <h3 className="text-base font-semibold text-foreground pt-3">Layer Balance & Ducking</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Music ducks under the VO — drop it roughly <strong className="text-foreground">6–12 dB</strong> beneath the voice whenever someone is speaking.</li>
            <li>SFX and transition sounds must never overpower or overlap the voice-over or dialogue.</li>
            <li>Bring music back up only in gaps where no one is speaking — the intro, beat moments, and the outro / CTA.</li>
          </ul>
          <h3 className="text-base font-semibold text-foreground pt-3">Music & SFX</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use <strong className="text-foreground">Envato music as the primary source</strong>; Storyblocks and other approved libraries as backups.</li>
            <li>Match music energy to the section — punchy on the hook, calmer under teaching, lifting into the CTA.</li>
            <li>Transition SFX support the edit, they don't decorate it — keep them sparse and intentional.</li>
          </ul>
          <h3 className="text-base font-semibold text-foreground pt-3">Licensing</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use premium-licensed music and SFX only — never copyrighted, ripped, or trending social-media audio.</li>
            <li>Licensing isn't just music — any third-party asset (footage, images, icons, fonts) must be licensed and provable.</li>
            <li>Save a license / receipt for every asset used in the project's licenses folder.</li>
          </ul>
          <h3 className="text-base font-semibold text-foreground pt-3">Cleanup & Delivery</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Remove background noise, hum, clicks, and long stretches of dead air.</li>
            <li>Add short fades at the start and end — never hard-cut audio in or out.</li>
            <li>Do a final pass on both headphones and speakers to confirm the VO is clear and nothing peaks past the delivery range.</li>
          </ul>
        </div>
        <div className="flex justify-center lg:sticky lg:top-8"><AudioMeterDiagram /></div>
      </div>
    </>
  ),

  "rejection-gallery": <RejectionGallery />,

  "pre-export-qa": (
    <>
      <p>The final gate before you export and submit. The first cut sent for review should already be good enough to publish — run every video against this checklist, alongside the brand's <Link to="/brand-guidelines" className="underline text-foreground">Brand &amp; Style Guideline</Link>. If an item doesn't pass, it isn't ready to export.</p>
      <PreExportQA />
    </>
  ),

  "accountability": (
    <>
      <p>Editing quality is judged at review. The Editor owns the cut end to end — delivering a complete, correct, review-ready video, not a rough draft for QC to clean up.</p>
      <p className="mt-2">The first cut sent for review should already be good enough to publish. Before submitting, self-check every video against this guideline and the <SLink slug="pre-export-qa">Pre-Export QA Checklist</SLink>, and stay free of careless mistakes a proper self-check would catch.</p>
    </>
  ),
};

/* ---------------- Diagrams ---------------- */

function SplitCaptionDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 180 320" className="w-full max-w-[220px] rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="180" height="320" fill="#0b0b14" />
        <rect x="0" y="0" width="180" height="160" fill="#1e293b" opacity="0.45" />
        <circle cx="90" cy="66" r="24" fill="#475569" opacity="0.6" />
        <rect x="0" y="160" width="180" height="160" fill="#312e44" opacity="0.45" />
        <circle cx="90" cy="232" r="24" fill="#475569" opacity="0.6" />
        <line x1="0" y1="160" x2="180" y2="160" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 2" />
        <rect x="30" y="144" width="120" height="16" rx="3" fill="#0b0b14" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="90" y="155" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="600" fontFamily={SF_PRO}>10X your skills</text>
        <text x="6" y="12" fill="#94a3b8" fontSize="6">Top panel · 1080 × 960</text>
        <text x="6" y="314" fill="#94a3b8" fontSize="6">Bottom panel · 1080 × 960</text>
        <text x="174" y="158" textAnchor="end" fill="#67e8f9" fontSize="6">split line · y = 960</text>
        <text x="90" y="174" textAnchor="middle" fill="#a78bfa" fontSize="6">CAPTION touching the split line</text>
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">Split-screen caption — just above the centre split line</figcaption>
    </figure>
  );
}

function PlacementDiagram({ variant }: { variant: "caption" | "super" }) {
  const isCap = variant === "caption";
  return (
    <figure>
      <svg viewBox="0 0 180 320" className="w-full max-w-[220px] rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="180" height="320" fill="#0b0b14" />
        <rect x="0" y="245" width="180" height="75" fill="#3b3b55" opacity="0.5" />
        <rect x="158" y="0" width="22" height="245" fill="#3b3b55" opacity="0.5" />
        <rect x="10" y="10" width="148" height="235" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="84" cy="110" r="26" fill="#475569" opacity="0.55" />
        <rect x="56" y="135" width="56" height="110" fill="#475569" opacity="0.55" />
        <text x="148" y="26" textAnchor="end" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily={SF_PRO}>10X</text>
        {isCap ? (
          <>
            <rect x="30" y="222" width="108" height="16" rx="3" fill="#0b0b14" stroke="#a78bfa" strokeWidth="1" />
            <text x="84" y="233" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="600" fontFamily={SF_PRO}>10X your skills</text>
            <text x="84" y="20" textAnchor="middle" fill="#a78bfa" fontSize="6">CAPTION · 1 line · low</text>
          </>
        ) : (
          <>
            <rect x="22" y="44" width="124" height="34" rx="3" fill="#0b0b14" stroke="#f59e0b" strokeWidth="1" />
            <text x="84" y="58" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily={SF_PRO}>AI won&apos;t replace</text>
            <text x="84" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily={SF_PRO}>you. People will.</text>
            <rect x="22" y="180" width="124" height="34" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
            <text x="84" y="200" textAnchor="middle" fill="#f59e0b" fontSize="6">OR bottom super</text>
            <text x="84" y="38" textAnchor="middle" fill="#f59e0b" fontSize="6">SUPER · top or bottom · 1–2 lines</text>
          </>
        )}
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">{isCap ? "Caption — single line, low in the safe zone" : "Super — top or bottom of the safe zone"}</figcaption>
    </figure>
  );
}

function SymbolFrame({ ok, label, sub }: { ok?: boolean; label: string; sub: string }) {
  const color = ok ? "#34d399" : "#fb7185";
  return (
    <figure>
      <svg viewBox="0 0 200 140" className="w-full max-w-[260px] rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="200" height="140" fill="#0b0b14" />
        <rect x="6" y="6" width="188" height="128" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="100" y="78" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="800" fontFamily={SF_PRO} letterSpacing="-0.02em">{label}</text>
        <text x="100" y="22" textAnchor="middle" fill={color} fontSize="9" fontWeight="700">{ok ? "✓ CORRECT" : "✕ INCORRECT"}</text>
      </svg>
      <figcaption className="mt-1.5 text-center text-[11px] text-muted-foreground">{sub}</figcaption>
    </figure>
  );
}

function SafeZoneDiagram() {
  return (
    <figure className="w-full max-w-[260px]">
      <svg viewBox="0 0 180 320" className="w-full rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="180" height="320" fill="#0b0b14" />
        <rect x="0" y="245" width="180" height="75" fill="#3b3b55" opacity="0.55" />
        <text x="90" y="288" textAnchor="middle" fill="#cbd5e1" fontSize="7">Bottom UI · 450 px</text>
        <rect x="158" y="0" width="22" height="245" fill="#3b3b55" opacity="0.55" />
        <text x="169" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="6" transform="rotate(90 169 130)">Action UI · 135 px</text>
        <rect x="10" y="10" width="148" height="235" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="84" y="24" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="600">SAFE ZONE</text>
        <text x="84" y="33" textAnchor="middle" fill="#67e8f9" fontSize="6">885 × 1410 px</text>
        <rect x="118" y="18" width="36" height="14" fill="#0b0b14" stroke="#facc15" strokeWidth="0.8" />
        <text x="136" y="28" textAnchor="middle" fill="#facc15" fontSize="6" fontWeight="700" fontFamily={SF_PRO}>10X</text>
        <rect x="30" y="220" width="108" height="14" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="84" y="230" textAnchor="middle" fill="#a78bfa" fontSize="6">CAPTION</text>
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">9 × 16 safe-zone reference (not to exact scale)</figcaption>
    </figure>
  );
}

function AudioMeterDiagram() {
  return (
    <figure className="w-full max-w-[240px]">
      <svg viewBox="0 0 210 320" className="w-full rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="210" height="320" fill="#0b0b14" />
        <rect x="40" y="20" width="40" height="280" rx="4" fill="#11111c" stroke="#3b3b55" strokeWidth="1" />
        <rect x="41" y="21" width="38" height="22" fill="#ef4444" opacity="0.55" />
        <rect x="41" y="43" width="38" height="35" fill="#34d399" opacity="0.65" />
        <rect x="41" y="78" width="38" height="221" fill="#3b82f6" opacity="0.22" />
        <line x1="40" y1="21" x2="80" y2="21" stroke="#f87171" strokeWidth="2" />
        <line x1="36" y1="183" x2="84" y2="183" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 2" />
        {[
          ["0 dB · clip", 21, "#f87171"],
          ["-2 dB", 43, "#a7f3d0"],
          ["-5 dB", 78, "#a7f3d0"],
          ["-10 dB", 137, "#94a3b8"],
          ["-14 LUFS", 183, "#facc15"],
          ["-20 dB", 253, "#94a3b8"],
        ].map(([label, y, color]) => (
          <g key={label as string}>
            <line x1="80" y1={y as number} x2="86" y2={y as number} stroke={color as string} strokeWidth="1" />
            <text x="90" y={(y as number) + 3} fill={color as string} fontSize="8" fontFamily={SF_PRO}>{label as string}</text>
          </g>
        ))}
        <text x="90" y="63" fill="#34d399" fontSize="8" fontWeight="700" fontFamily={SF_PRO}>TARGET</text>
        <text x="90" y="74" fill="#6ee7b7" fontSize="7" fontFamily={SF_PRO}>peak here</text>
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">Peak in the green band (-5 to -2 dB); loudness -14 LUFS; never touch 0 dB.</figcaption>
    </figure>
  );
}

function IconStyleDiagram() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <figure className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-4">
        <div className="font-label text-emerald-300">✓ One consistent style</div>
        <div className="mt-3 flex items-center justify-around text-foreground">
          <Star className="h-6 w-6" />
          <Heart className="h-6 w-6" />
          <Bell className="h-6 w-6" />
          <Settings className="h-6 w-6" />
        </div>
        <figcaption className="mt-3 text-center text-[11px] text-muted-foreground">All outline — same weight &amp; family</figcaption>
      </figure>
      <figure className="rounded-lg border border-rose-400/25 bg-rose-400/5 p-4">
        <div className="font-label text-rose-300">✕ Mixed styles</div>
        <div className="mt-3 flex items-center justify-around text-foreground">
          <Star className="h-6 w-6" fill="currentColor" />
          <Heart className="h-6 w-6" />
          <Bell className="h-6 w-6" fill="currentColor" />
          <Settings className="h-6 w-6" />
        </div>
        <figcaption className="mt-3 text-center text-[11px] text-muted-foreground">Filled and outline mixed — don't do this</figcaption>
      </figure>
    </div>
  );
}

function OrganicSafeZoneDiagram() {
  return (
    <figure className="w-full max-w-[420px]">
      <svg viewBox="0 0 320 180" className="w-full rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="320" height="180" fill="#0b0b14" />
        <rect x="0" y="160" width="320" height="20" fill="#3b3b55" opacity="0.55" />
        <rect x="10" y="167" width="300" height="3" rx="1.5" fill="#64748b" opacity="0.8" />
        <rect x="10" y="167" width="120" height="3" rx="1.5" fill="#ef4444" />
        <text x="160" y="177" textAnchor="middle" fill="#cbd5e1" fontSize="6">Player controls & progress · bottom ~10%</text>
        <rect x="230" y="96" width="80" height="56" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="270" y="92" textAnchor="middle" fill="#f59e0b" fontSize="6">End-screen zone</text>
        <rect x="16" y="12" width="288" height="144" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="160" y="24" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="600">TITLE-SAFE ZONE · ~5% margins</text>
        <circle cx="118" cy="80" r="22" fill="#475569" opacity="0.55" />
        <rect x="94" y="102" width="48" height="42" fill="#475569" opacity="0.55" />
        <rect x="26" y="132" width="124" height="18" rx="2" fill="#0b0b14" stroke="#a78bfa" strokeWidth="0.9" />
        <text x="88" y="143" textAnchor="middle" fill="#a78bfa" fontSize="6">Lower-third / caption</text>
        <circle cx="302" cy="22" r="5" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="302" y="24.5" textAnchor="middle" fill="#94a3b8" fontSize="7" fontStyle="italic">i</text>
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">16 × 9 organic safe-zone reference (not to exact scale)</figcaption>
    </figure>
  );
}

function FramingDiagram({ variant }: { variant: "close" | "wide" }) {
  const isClose = variant === "close";
  return (
    <figure>
      <svg viewBox="0 0 180 320" className="w-full max-w-[220px] rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="180" height="320" fill="#0b0b14" />
        <line x1="60" y1="0" x2="60" y2="320" stroke="#ffffff" strokeOpacity="0.12" />
        <line x1="120" y1="0" x2="120" y2="320" stroke="#ffffff" strokeOpacity="0.12" />
        <line x1="0" y1="107" x2="180" y2="107" stroke="#22d3ee" strokeOpacity="0.55" strokeDasharray="3 2" />
        <line x1="0" y1="213" x2="180" y2="213" stroke="#ffffff" strokeOpacity="0.12" />
        <text x="174" y="104" textAnchor="end" fill="#67e8f9" fontSize="6">eye line</text>
        {isClose ? (
          <>
            <circle cx="90" cy="110" r="40" fill="#e2e8f0" />
            <rect x="40" y="160" width="100" height="160" fill="#475569" />
          </>
        ) : (
          <>
            <circle cx="90" cy="108" r="22" fill="#e2e8f0" />
            <rect x="62" y="135" width="56" height="120" fill="#475569" />
          </>
        )}
        <text x="6" y="14" fill="#a3a3a3" fontSize="7" fontWeight="600">{isClose ? "CLOSE-UP" : "WIDE SHOT"}</text>
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">{isClose ? "Head & shoulders fill the frame · eyes on upper-third line" : "Subject smaller · head still high · eyes near upper-third line"}</figcaption>
    </figure>
  );
}
