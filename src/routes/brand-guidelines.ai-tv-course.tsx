import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OnThisPage } from "@/components/OnThisPage";
import aitvStar from "@/assets/aitv-star.png";

export const Route = createFileRoute("/brand-guidelines/ai-tv-course")({
  head: () => ({
    meta: [
      { title: "AI-TV App · Course Videos — Brand & Style" },
      { name: "description", content: "Video branding & editing guide for AI-TV App course (informative) videos — foundation, visual identity, SOP, captions, CTA, audio, handoff and QA." },
    ],
  }),
  component: Page,
});

const ASSET_LIBRARY = "https://drive.google.com/drive/folders/1z1cnIJpU-qil2wHRZNqv6OO4ZnTwxBmF";

const LOGO_WATERMARK = "https://drive.google.com/drive/folders/1a070LBMmeJ98yCiVPtq0OqH3R6SuX6-z";

const NON_NEG = [
  "Use the selected typography system consistently (Oswald/Montserrat, Poppins/Lora, or Lora/Poppins).",
  "Use the provided logo and watermark, kept in the locked position for each format.",
  "Respect safe zones — any text/logo outside the safe zone is a hard fail.",
  "Use only brand colours and approved gradients — no random colours.",
  "Captions must be readable — use the provided caption preset (background box / shadow) when needed.",
  "Highlight only the important words as supers, using the highlight rules in this guide.",
  "Follow the course structure: Hook → Context → Body (steps) → Micro-proof → Outro.",
  "No flashy transitions or complex motion graphics; keep it calm.",
  "Music/SFX must be premium-licensed from the company subscription platform.",
  "Deliver using the exact folder + naming system; include licenses.",
];

const PALETTE: [string, string, string, string][] = [
  ["Indigo", "#272659", "Primary", "Anchor text, UI lines, deep backgrounds"],
  ["Off-White", "#FEF8F1", "Primary", "Base background, clean premium look"],
  ["Periwinkle", "#7B88FB", "Accent", "Highlights, CTA buttons, key words"],
  ["Lavender", "#CDB5FB", "Accent", "Soft panels, secondary highlights"],
];

const TYPE_HIERARCHY: { use: string; font: string; size: string; weight: string; lh: string; samples: string[] }[] = [
  { use: "H1 (Title card)", font: "Heading — Oswald / Poppins / Lora", size: "64–72px", weight: "700", lh: "110%", samples: ["Oswald", "Poppins", "Lora"] },
  { use: "H2 (Section)", font: "Heading", size: "48–56px", weight: "700", lh: "115%", samples: ["Oswald", "Poppins", "Lora"] },
  { use: "Body (on-screen)", font: "Sub — Montserrat / Poppins", size: "34–40px", weight: "500–600", lh: "120%", samples: ["Montserrat", "Poppins"] },
  { use: "Caption (default)", font: "Sub", size: "42px (9:16) / 48px (16:9)", weight: "600", lh: "110%", samples: ["Montserrat", "Poppins"] },
  { use: "Code", font: "Source Code Pro", size: "30–34px", weight: "500", lh: "120%", samples: ["Source Code Pro"] },
];

const SAFE_ZONES: [string, string, string, string][] = [
  ["1:1", "50px", "60px", "60px"],
  ["4:5", "60px", "90px", "60px"],
  ["16:9", "90px", "60px", "54px"],
  ["9:16", "10% (108–140px)", "16% (250–300px)", "54px"],
];

const CAPTION_COMBOS: [string, string, string, string][] = [
  ["Default (clean bg)", "Indigo #272659", "None (soft shadow if needed)", "Periwinkle #7B88FB"],
  ["Busy / bright footage", "Off-White #FEF8F1", "Indigo box @ 70–80%", "Periwinkle #7B88FB"],
  ["Light backgrounds", "Indigo #272659", "Off-White box @ 85–92%", "Periwinkle #7B88FB"],
  ["Very dark backgrounds", "Off-White #FEF8F1", "None or Indigo box", "Lavender #CDB5FB"],
];

const FOLDERS = [
  "01_Project_Files (PRPROJ/DRP + XML)",
  "02_Footage (original + proxies)",
  "03_Audio (VO, Music, SFX)",
  "04_GFX (logos, icons, templates, screenshots)",
  "05_Subtitles (SRT/VTT + transcript)",
  "06_Licenses (music/SFX/footage license files)",
  "07_Exports (final MP4 + variants)",
  "08_Thumbnails (final JPG/PNG)",
];

const NAV: [string, string][] = [
  ["#quick-start", "Index"],
  ["#foundation", "Foundation"],
  ["#recall", "Brand Recall"],
  ["#logo", "Logo"],
  ["#theme", "Theme"],
  ["#type", "Typography"],
  ["#star", "Star & Icons"],
  ["#safe", "Layout & Templates"],
  ["#sop", "Structure & Flow"],
  ["#footage", "B-Roll & Screens"],
  ["#captions", "Captions"],
  ["#cta", "CTA & Outro"],
  ["#handoff", "File & Handoff"],
];

// Full index of the guide — every section, with a one-line summary.
const INDEX: [string, string, string][] = [
  ["#foundation", "Brand Foundation", "Purpose, personality and tone of voice."],
  ["#recall", "Brand Recall System", "Repeatable signatures and the 5-second test."],
  ["#logo", "Logo System", "Variants, locked positioning and contrast rules."],
  ["#theme", "Theme", "Palette, dominance ratio and locked gradients."],
  ["#type", "Typography", "Font systems, hierarchy and font discipline."],
  ["#star", "Star Motif & Icons", "Star usage, sizes and icon style."],
  ["#safe", "Layout, Templates & Safe Zones", "Grid, safe zones and template discipline."],
  ["#sop", "Video Structure & Flow", "Locked structure, pacing, transitions, export and templates."],
  ["#footage", "B-Roll, Footage & Screen Recordings", "Highlighting, full-screen B-roll and screen-recording rules."],
  ["#captions", "Captions", "Default style, highlight rules and colour combinations."],
  ["#cta", "CTA & Outro", "The provided outro / CTA clip and the clean-tail rule."],
  ["#handoff", "File & Handoff", "Folder structure and the naming convention."],
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Th({ cols }: { cols: string[] }) {
  return <thead><tr className="border-b border-white/15">{cols.map((c) => <th key={c} className="px-3 py-2 text-left font-medium text-foreground">{c}</th>)}</tr></thead>;
}

/** Before / after reference frame pulled from the course SOP deck (❌ left · ✅ right). */
function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-white/10 bg-card">
      <div className="flex aspect-[5/4] items-center justify-center bg-black/25">
        <img src={src} alt={caption} loading="lazy" className="max-h-full max-w-full object-contain" />
      </div>
      <figcaption className="border-t border-white/10 px-3 py-2.5 text-sm font-medium leading-snug text-foreground">{caption}</figcaption>
    </figure>
  );
}

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand · AI-TV App · Course Videos"
        title="AI-TV App — Course Videos"
        intro="Video Branding & Editing Guide for AI-TV course (informative) videos. Make AI feel understandable and practical for working professionals — premium, calm and confident, with helpful-teacher energy. This guide is specific to course content and does not use the general editing guidelines."
      />

      <OnThisPage nav={NAV} storageKey="aitvToc">
      <Section id="quick-start" title="Index">
        <p>The full AI-TV course video guide at a glance — jump to any section. Every part of this page is the standard operating procedure for course videos.</p>
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {INDEX.map(([h, l, d], i) => (
            <a key={h} href={h} className="group rounded-lg border border-white/10 bg-card p-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.03]">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-foreground group-hover:underline">{l}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{d}</p>
            </a>
          ))}
        </div>

        <h3 className="text-base font-semibold text-foreground pt-2">10 Non-Negotiables</h3>
        <p>Strict rules. If any is missed, QA should reject.</p>
        <ol className="list-decimal pl-5 space-y-1">
          {NON_NEG.map((n) => <li key={n}>{n}</li>)}
        </ol>
        <p className="pt-1">Asset library (logos, fonts, icons, templates): <a href={ASSET_LIBRARY} target="_blank" rel="noreferrer" className="underline text-foreground">Open Asset Library →</a></p>
      </Section>

      <Section id="foundation" title="Brand Foundation">
        <p><strong className="text-foreground">Purpose.</strong> Make AI understandable and practical for working professionals. Turn complex topics into clear steps, fast.</p>
        <p><strong className="text-foreground">Personality.</strong> Premium, calm, confident — never loud, never gimmicky. Helpful-teacher energy: direct, structured, respectful.</p>
        <p><strong className="text-foreground">Tone.</strong> Short sentences. Clear verbs. Step-based explanations. Avoid slang, memes or over-hype in informative content.</p>
      </Section>

      <Section id="recall" title="Brand Recall System">
        <p>In the first 3 seconds, at least <strong className="text-foreground">two brand signals</strong> must be visible/audible. Across a series, keep the same intro rhythm, typography and motif placement — consistency beats novelty.</p>
        <h3 className="text-base font-semibold text-foreground pt-1">The 6 repeatable signatures</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Motif</strong> — the star (subtle, behind text, never on faces).</li>
          <li><strong className="text-foreground">Type</strong> — captions in the Sub font with 1–2 highlighted words (Periwinkle).</li>
          <li><strong className="text-foreground">Palette</strong> — Off-White base + Indigo anchors + limited accents.</li>
          <li><strong className="text-foreground">Logo corner</strong> — locked position with locked padding.</li>
          <li><strong className="text-foreground">Pacing</strong> — clean cuts, minimal transitions, calm zooms only.</li>
          <li><strong className="text-foreground">Sound</strong> — a consistent licensed tech bed + subtle UI click SFX.</li>
        </ul>
        <p className="pt-1"><strong className="text-foreground">The 5-second test.</strong> Mute and watch 5 seconds — you should still feel "this is AI TV". If not, fix colours, typography, logo position, star usage and the CTA system.</p>
      </Section>

      <Section id="logo" title="Logo System">
        <p><strong className="text-foreground">Use the provided logo and watermark only</strong> — assets: <a href={LOGO_WATERMARK} target="_blank" rel="noreferrer" className="underline text-foreground">Logo &amp; Watermark folder →</a>.</p>
        <p>Variants that must exist in the asset folder: Full colour, White, Dark, Icon-only (star). <strong className="text-foreground">No effects</strong> on the logo — no shadows, glows, outlines, recolours or distortion.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Full colour</strong> — light / neutral backgrounds.</li>
          <li><strong className="text-foreground">White</strong> — dark or busy backgrounds.</li>
          <li><strong className="text-foreground">Dark</strong> — very light backgrounds where colour isn't needed.</li>
          <li><strong className="text-foreground">Icon-only (star)</strong> — watermark bug, profile use, or tight spaces only.</li>
        </ul>
        <p><strong className="text-foreground">Locked positioning.</strong> Primary logo in the top corner inside the safe zone; watermark bug bottom-right. Padding 48–72px by format; logo width 120–170px (≈7–10% of frame width). Never place the logo in the bottom corners (UI + captions collide) or inside the CTA zone — the logo stays locked; the CTA adapts.</p>
        <p><strong className="text-foreground">Hard rule.</strong> Never place a colour logo on a similar-colour background. If contrast is weak, switch to the White logo or add a subtle blur plate (8–12% opacity) behind it.</p>
      </Section>

      <Section id="theme" title="Theme">
        <p>The AI-TV course theme is fixed — one palette held across every video, never mixed. Off-White base, Indigo anchors, and Periwinkle/Lavender accents only.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-card p-4">
            <div className="font-medium text-foreground">AI-TV Course Theme</div>
            <div className="font-label mt-1">Off-White base · Indigo anchors · Periwinkle/Lavender accents</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {PALETTE.map((r) => (
                <div key={r[1]} className="flex flex-col">
                  <div className="h-24 rounded-md border border-white/10" style={{ backgroundColor: r[1] }} />
                  <div className="mt-1.5 text-center font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{r[1]}</div>
                  <div className="text-center text-[10px] text-muted-foreground">{r[0]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-card p-4">
            <div className="font-medium text-foreground">Roles &amp; usage</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {PALETTE.map((r) => (
                <li key={r[0]}><span className="font-medium text-foreground">{r[0]}</span> <span className="font-mono text-[11px]">{r[1]}</span> — {r[3]}</li>
              ))}
            </ul>
          </div>
        </div>
        <p><strong className="text-foreground">Dominance ratio.</strong> Off-White 60–75% (base) · Indigo 15–25% (text, bars, anchors) · Periwinkle + Lavender 5–15% (accents only).</p>
        <p><strong className="text-foreground">Not allowed.</strong> Neon greens, bright reds, saturated yellows (unless the topic demands and the brand approves); random blues/purples outside the palette; pure-black backgrounds (prefer Indigo).</p>
        <h3 className="text-base font-semibold text-foreground pt-1">Gradients (locked)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Direction: top-left → bottom-right only, at <strong className="text-foreground">45°</strong>.</li>
          <li>Allowed stops: Off-White → Lavender, Lavender → Periwinkle, Indigo → Periwinkle.</li>
          <li>Never apply gradients to logos, text, or inside caption boxes (keep those solid for readability).</li>
        </ul>
      </Section>

      <Section id="type" title="Typography">
        <p>Choose <strong className="text-foreground">one</strong> system per series — max 2 font families per video (Heading + Sub). Captions always use the Sub font; never use a serif (Lora) for captions. Source Code Pro is allowed as a 3rd font for code screens only.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">System 1 (Bold + Condensed)</strong> — Headings: Oswald · Sub/Body/Captions/UI: Montserrat.</li>
          <li><strong className="text-foreground">System 2 (Modern + Premium)</strong> — Headings/UI/Captions: Poppins · Subheads/Quotes: Lora (never captions).</li>
          <li><strong className="text-foreground">System 3 (Editorial Premium)</strong> — Headings/Chapter titles: Lora · Sub/Body/Captions/UI: Poppins.</li>
        </ul>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <Th cols={["Use", "Font", "Size", "Weight", "Line height", "Example"]} />
            <tbody>
              {TYPE_HIERARCHY.map((r) => (
                <tr key={r.use} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{r.use}</td>
                  <td className="px-3 py-2">{r.font}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.size}</td>
                  <td className="px-3 py-2">{r.weight}</td>
                  <td className="px-3 py-2">{r.lh}</td>
                  <td className="px-3 py-2">
                    <div className="space-y-0.5">
                      {r.samples.map((s) => (
                        <div key={s} className="text-foreground" style={{ fontFamily: `'${s}', sans-serif` }}>{s}</div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p><strong className="text-foreground">ALL CAPS</strong> only for 1–3 words (CTA or emphasis); add +2% to +4% letter-spacing. Keep typography boring and consistent — the viewer should feel clarity, not "design".</p>
        <h3 className="text-base font-semibold text-foreground pt-1">Font discipline</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Brand-approved fonts only.</strong> Use only the fonts in the system above. Random or system fonts are never permitted — every word on screen uses the brand typography.</li>
          <li><strong className="text-foreground">Use a combination of both brand fonts.</strong> Pair the Heading font (titles, supers) with the Sub font (body, captions) — don't set an entire video in a single font.</li>
        </ul>
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <Figure src="/ai-tv-course/fonts-approved.jpg" caption="Brand-approved fonts only — never drop in a random font for a frame." />
          <Figure src="/ai-tv-course/font-combination.jpg" caption="Combine both brand fonts (Heading + Sub) rather than relying on one." />
        </div>
      </Section>

      <Section id="star" title="Star Motif & Icons">
        <p>The signature star motif (gradient, Lavender → Periwinkle). Use the supplied asset — never redraw it.</p>
        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          <figure className="flex flex-col items-center rounded-lg border border-white/10 bg-card p-4">
            <img src={aitvStar} alt="AI-TV star motif" className="h-24 w-24 object-contain" />
            <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">Icon use · 60–90% opacity</figcaption>
          </figure>
          <figure className="flex flex-col items-center rounded-lg border border-white/10 bg-card p-4">
            <img src={aitvStar} alt="AI-TV star motif as background watermark" className="h-24 w-24 object-contain opacity-25" />
            <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">Background watermark · 15–35% opacity</figcaption>
          </figure>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Star sizes</strong> — Small 60–90px (icon cluster), Medium 140–220px (corner accent), Large 420–720px (background watermark).</li>
          <li><strong className="text-foreground">Star rules</strong> — one star per frame (max 2, rare); opacity 15–35% for large background stars, 60–90% for small icon use; always behind text, never over faces; rotation only 0°, 15° or 30°.</li>
          <li><strong className="text-foreground">Icons</strong> — 2D style: rounded ends, consistent stroke, minimal detail. 3D allowed only if one consistent style (same lighting/softness). Don't mix flat 2D and detailed 3D in one frame. Default colour Indigo; highlight with Periwinkle.</li>
        </ul>
      </Section>

      <Section id="safe" title="Layout, Templates & Safe Zones">
        <p>Use a 12-column grid for all formats. Keep faces and key visuals in the centre-safe region. All text, logo and captions must stay inside the safe zones.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <Th cols={["Format", "Top safe", "Bottom safe", "Side safe"]} />
            <tbody>
              {SAFE_ZONES.map((r) => (
                <tr key={r[0]} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground">{r[0]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[1]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[2]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-base font-semibold text-foreground pt-1">Template discipline</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Stay inside the approved templates.</strong> Follow this guide and the brand templates strictly — no custom or arbitrary styling. Colours, panels, lower-thirds and layouts all come from the approved templates.</li>
          <li><strong className="text-foreground">Centre and fit the content.</strong> Keep content centred and properly fitted inside the template — scaled to fill the frame, with no cropping, stretching or misalignment.</li>
        </ul>
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <Figure src="/ai-tv-course/brand-template.jpg" caption="Use the approved brand templates — no custom or arbitrary styling." />
          <Figure src="/ai-tv-course/content-centered.jpg" caption="Keep content centred and fitted in the template — no cropping or misalignment." />
        </div>
      </Section>

      <Section id="sop" title="Video Structure & Flow">
        <p><strong className="text-foreground">Standard structure (locked).</strong> Hook (0–3s short / 0–10s long): outcome + pattern interrupt → Context (1 sentence) → Body (steps, rules or examples, on-screen structure mandatory) → Micro-proof (screenshot/result/before-after) → CTA (1 clear next action + consistent end card).</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Pacing</strong> — a visible change every 2–4 seconds (cut, caption line, b-roll, screen highlight). Use step labels ("Step 1/2/3"). Avoid dead air.</li>
          <li><strong className="text-foreground">Transitions (calm only)</strong> — hard cut, cross-dissolve (6–10 frames), subtle push. No glitch, shake, strobe, heavy motion blur or flashy presets.</li>
          <li><strong className="text-foreground">Export</strong> — 30 fps (60 only if footage is 60), H.264 high profile, 18–30 Mbps at 1080p. Shorts 1080×1920, long-form 1920×1080.</li>
        </ul>
        <h3 className="text-base font-semibold text-foreground pt-1">Templates (pick one per video)</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">A · Talking-head explainer</strong> — hook + 3–5 steps, one graphic at a time, locked CTA + end screen (keep last 5–20s clean for YouTube end screens).</li>
          <li><strong className="text-foreground">B · Screen-record tutorial</strong> — sparing cursor zooms, numbered step pills, a recap frame before the CTA.</li>
          <li><strong className="text-foreground">C · Slides + VO</strong> — one message per slide, star motif as a subtle anchor, cuts on sentence boundaries.</li>
        </ul>
      </Section>

      <Section id="footage" title="B-Roll, Footage & Screen Recordings">
        <p>Footage, screen recordings and B-roll carry most informative videos. Keep them clean, full-frame and locked to the point being made — never decorative.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Highlight what's being talked about.</strong> The moment the voice-over references a button, field, row or result on screen, highlight or zoom to it so the viewer's eye lands on the exact element.</li>
          <li><strong className="text-foreground">Never show the website URL.</strong> Keep the address bar out of screen recordings — crop or cover it so the focus stays on the content, not the URL.</li>
          <li><strong className="text-foreground">No empty edges in screen recordings.</strong> Fill any blank space around a recording with a colour matte from the palette (Indigo / Off-White) so the frame never shows dead gaps.</li>
          <li><strong className="text-foreground">B-roll is always full-screen.</strong> Don't drop B-roll inside templates, frames, boxes or split-screen layouts unless the reference calls for it — footage should fill the frame.</li>
          <li><strong className="text-foreground">No vector / illustration animations.</strong> Animated vector graphics don't fit the premium, real look — use real footage, screens and the brand motion system instead, in B-roll and throughout.</li>
        </ul>
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <Figure src="/ai-tv-course/highlight-1.jpg" caption="Highlight the on-screen content the moment the VO talks about it." />
          <Figure src="/ai-tv-course/highlight-2.jpg" caption="Keep the highlighted element in focus as it's discussed." />
          <Figure src="/ai-tv-course/no-url.jpg" caption="Never show the website URL / address bar in screen recordings." />
          <Figure src="/ai-tv-course/no-empty-edges.jpg" caption="Fill empty edges of a screen recording with a colour matte." />
          <Figure src="/ai-tv-course/broll-fullscreen.jpg" caption="Display B-roll full-screen — not boxed inside a template or split screen." />
          <Figure src="/ai-tv-course/no-vector-anim.jpg" caption="Avoid vector / illustration animations — keep footage real and premium." />
        </div>
      </Section>

      <Section id="captions" title="Captions">
        <p><strong className="text-foreground">Default style (locked).</strong> Sub font 600, bottom safe zone, centred or left-aligned (don't hug edges). Max 2 lines, 28–32 characters per line on mobile, line height 110%, soft shadow if needed.</p>
        <p><strong className="text-foreground">Highlight</strong> only 1–2 words per line — numbers, outcomes, time, money, tool names, key verbs. Never highlight filler words; never use neon highlight colours; no full-screen caption blocks.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <Th cols={["Use case", "Text colour", "Background box", "Highlight"]} />
            <tbody>
              {CAPTION_COMBOS.map((r) => (
                <tr key={r[0]} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{r[0]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[1]}</td>
                  <td className="px-3 py-2">{r[2]}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="cta" title="CTA & Outro">
        <p>Don't design your own CTA — <strong className="text-foreground">use the provided CTA video clip / outro</strong> from the asset library at the end of every video. Keep the last 5–20 seconds clean (no new information) so the outro and any YouTube end-screen elements sit cleanly inside the safe zones.</p>
        <p className="mt-2">Outro &amp; CTA clips: <a href={ASSET_LIBRARY} target="_blank" rel="noreferrer" className="underline text-foreground">Asset Library →</a></p>
      </Section>

      <Section id="handoff" title="File & Handoff">
        <p><strong className="text-foreground">Folder structure (must match exactly):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          {FOLDERS.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <p><strong className="text-foreground">Naming (no spaces):</strong> <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-foreground">AI-TV_[SeriesCode]_[EP##]_[ShortTitle]_v#</code> — e.g. <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-foreground">AI-TV_LF_EP12_AI-Agents_v3.mp4</code>. Use <span className="font-mono">_FINAL</span> and freeze changes for the final.</p>
      </Section>

      <div className="mt-12 rounded-lg border border-white/15 bg-card p-5">
        <p className="font-label">Full reference</p>
        <p className="mt-1 text-sm text-muted-foreground">The complete AI-TV App course video Editing SOP document:</p>
        <a href="https://drive.google.com/drive/folders/1Bq78EhGxn2D2x9ost4KLf5O8rkVjqTGa" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-foreground hover:border-white/40">
          Open AI-TV Course Video Editing SOP →
        </a>
      </div>
      </OnThisPage>
    </div>
  );
}
