import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OnThisPage } from "@/components/OnThisPage";

const SF_PRO = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif";

export const Route = createFileRoute("/brand-guidelines/be10x")({
  head: () => ({ meta: [{ title: "Be10X — Brand & Style Guideline" }, { name: "description", content: "Be10X Brand & Style Guideline — logo, safe zone, typography, captions, supers, colour themes." }] }),
  component: Page,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand · Be10X · v1.0"
        title="Be10X — Brand & Style Guideline"
        intro='"AI won&apos;t replace you, but a person using AI will." — Be10X is House of EdTech&apos;s flagship AI education brand. This guideline defines how Be10X looks and sounds on screen so every ad, course video, and short we ship is unmistakably Be10X.'
      />

      <OnThisPage
        nav={[["#about","About"],["#positioning","Positioning"],["#logo","Logo"],["#cta","CTA & Endscreen"],["#type","Typography"],["#captions-link","Captions & Supers"],["#themes","Colour Themes"]]}
        storageKey="be10xToc"
      >
      <Section id="about" title="About This Guideline">
        <p>This is the Brand & Style Guideline for Be10X — House of EdTech's flagship AI education brand. It is a companion to the House of EdTech Video Production & Editing Guideline. That document covers the production process — workflow, on-set standards, editing pipeline, and QC. This document covers the Be10X video layer: the logo, the safe zone, on-screen placement, typography, captions and supers, the colour themes used in editing, and the editing standards every Be10X video is held to.</p>
        <p className="mt-2">Reference channel: <a href="https://www.youtube.com/@be10x/shorts" target="_blank" rel="noreferrer" className="underline text-foreground">Be10X — shorts on YouTube →</a></p>
      </Section>

      <Section id="positioning" title="Brand Positioning">
        <p>Be10X helps working professionals become AI-native — confident, fast, and 10X more effective. The visual language should feel <strong>futuristic, premium, and human</strong>: clean layouts, strong type, and real people, never cheap or robotic.</p>
      </Section>

      <Section id="logo" title="Logo System & Usage">
        <p>Be10X has one logo, supplied in two versions for two background types — dark and light. Always use the supplied asset, and <strong>match the version to the background</strong> so the logo always stays legible.</p>

        <h3 className="text-base font-semibold text-foreground pt-3">Watermark</h3>
        <p>Use the supplied Be10X watermark on every video, placed inside the safe-zone corner, clear of captions, supers and the subject's face.</p>
        <p className="mt-2">
          Logo &amp; watermark assets:{" "}
          <a href="https://drive.google.com/drive/folders/1vNc3r7VPuGEBIQqoHfPEtpJrn67VyAbs" target="_blank" rel="noreferrer" className="underline text-foreground">Logo &amp; Watermark folder →</a>
        </p>
        <p className="mt-2 text-sm">General logo &amp; watermark rules apply to every brand — see <Link to="/editing-guidelines" hash="logo" className="underline text-foreground">Editing Guidelines → Logo &amp; Watermark</Link>.</p>
      </Section>

      <Section id="cta" title="CTA & Endscreen">
        <p>Every Be10X ad closes with the mandatory <strong>5-second outro CTA</strong> — the endscreen — using the approved Be10X endscreen template.</p>
        <p className="mt-2">
          Endscreen templates &amp; assets:{" "}
          <a href="https://drive.google.com/drive/folders/1Q9FjU3KqGi3e0OXz6cs2cVUBpAAvDZ1J" target="_blank" rel="noreferrer" className="underline text-foreground">Be10x Ads Endscreen folder →</a>
        </p>
        <p className="mt-2 text-sm">The CTA &amp; endscreen rules are universal — see <Link to="/editing-guidelines" hash="cta" className="underline text-foreground">Editing Guidelines → CTA &amp; Endscreen</Link>.</p>
      </Section>

      <Section id="type" title="Typography — SF Pro">
        <p>Use SF Pro for all captions and supers in every video edit. The caption preset and supers .mogrt file are provided in the asset folder — import these directly into Premiere Pro or After Effects rather than recreating them. <em>Do not substitute another typeface for on-screen captions or supers.</em></p>
        <h3 className="text-base font-semibold text-foreground pt-2">Type Scale</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="border-b border-white/15">{["Style","Sample","Size"].map(h => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ["H1","The future belongs to AI-native professionals.","72 / 88 px", 26, 700],
                ["H2","10X Your Skills. 10X Your Impact.","48 / 56 px", 22, 700],
                ["H3","Learn AI. Apply AI. Grow 10X.","28 / 32 px", 18, 600],
                ["Body Large","Body copy used in long-form contexts.","18 / 22 px", 15, 400],
                ["Body","Standard body text for general content.","16 / 18 px", 14, 400],
                ["Caption","Caption text used for small information.","14 px", 12, 500],
              ].map((r) => (
                <tr key={r[0] as string} className="border-b border-white/10">
                  <td className="px-3 py-2 font-medium text-foreground align-middle">{r[0]}</td>
                  <td className="px-3 py-2 text-foreground" style={{ fontFamily: SF_PRO, fontSize: r[3] as number, fontWeight: r[4] as number, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{r[1]}</td>
                  <td className="px-3 py-2 whitespace-nowrap align-middle">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="captions-link" title="Captions, Supers & Universal Rules">
        <p>Caption and super placement, caption rules, symbols & units, do&apos;s & don&apos;ts, and non-negotiables are universal to every House of EdTech video and live on a dedicated page. <a href="/editing-guidelines" className="underline text-foreground">Open Editing Guidelines &rarr;</a></p>
      </Section>


      <Section id="themes" title="Colour Themes for Video Editing">
        <p>These colour themes are for video editing only — they are not a brand colour palette. Each Be10X video commits to one theme suited to its context and holds it across the whole edit, never mixing themes within a single video.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { name: "High-Energy", desc: "Black base · one bold accent", swatches: ["#15140A","#F5D81E","#DDB11B","#FFFFFF"] },
            { name: "Premium", desc: "Deep blue base", swatches: ["#0C1E62","#0E4AA6","#F2C20E","#FFFFFF"] },
            { name: "Calm-Authority", desc: "Teal base · warm gold accent", swatches: ["#0A6560","#17938D","#E7A936","#F0ECE4"] },
          ].map((t) => (
            <div key={t.name} className="rounded-lg border border-white/10 bg-card p-4">
              <div className="font-medium text-foreground">{t.name} Theme</div>
              <div className="font-label mt-1">{t.desc}</div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {t.swatches.map((c) => (
                  <div key={c} className="flex flex-col">
                    <div className="h-24 rounded-md border border-white/10" style={{ backgroundColor: c }} />
                    <div className="mt-1.5 text-center font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{c}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs italic">These palettes are derived from approved reference ad styles and are used for video editing only. Pick one palette per video and apply it consistently across the whole edit.</p>
      </Section>

      <div className="mt-12 border-t border-white/10 pt-5 text-center text-sm text-muted-foreground">
        <div className="text-foreground font-semibold">BE10X</div>
        <p className="mt-1 italic">"AI won't replace you, but a person using AI will."</p>
        <p className="mt-1 text-xs">be10x.in · © Be10X. All rights reserved.</p>
      </div>
      </OnThisPage>
    </div>
  );
}


function PlacementDiagram({ variant }: { variant: "caption" | "super" }) {
  const isCap = variant === "caption";
  return (
    <figure>
      <svg viewBox="0 0 180 320" className="w-full max-w-[220px] rounded-md border border-white/15 bg-[#0b0b14]">
        <rect x="0" y="0" width="180" height="320" fill="#0b0b14" />
        {/* Reserved UI strips */}
        <rect x="0" y="245" width="180" height="75" fill="#3b3b55" opacity="0.5" />
        <rect x="158" y="0" width="22" height="245" fill="#3b3b55" opacity="0.5" />
        {/* Safe zone */}
        <rect x="10" y="10" width="148" height="235" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
        {/* Subject silhouette */}
        <circle cx="84" cy="110" r="26" fill="#475569" opacity="0.55" />
        <rect x="56" y="135" width="56" height="110" fill="#475569" opacity="0.55" />
        {/* Logo (top-right) */}
        <text x="148" y="26" textAnchor="end" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily={SF_PRO}>10X</text>
        {isCap ? (
          <>
            {/* Caption — low, centred, 1 line */}
            <rect x="30" y="222" width="108" height="16" rx="3" fill="#0b0b14" stroke="#a78bfa" strokeWidth="1" />
            <text x="84" y="233" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="600" fontFamily={SF_PRO}>10X your skills</text>
            <text x="84" y="20" textAnchor="middle" fill="#a78bfa" fontSize="6">CAPTION · 1 line · low</text>
          </>
        ) : (
          <>
            {/* Super — top position */}
            <rect x="22" y="44" width="124" height="34" rx="3" fill="#0b0b14" stroke="#f59e0b" strokeWidth="1" />
            <text x="84" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily={SF_PRO}>Machine Learning</text>
            {/* OR Super — bottom position */}
            <rect x="22" y="180" width="124" height="34" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
            <text x="84" y="200" textAnchor="middle" fill="#f59e0b" fontSize="6">OR bottom super</text>
            <text x="84" y="38" textAnchor="middle" fill="#f59e0b" fontSize="6">SUPER · top or bottom · 1–2 lines</text>
          </>
        )}
      </svg>
      <figcaption className="mt-2 text-center text-[11px] text-muted-foreground">
        {isCap ? "Caption — single line, low in the safe zone" : "Super — top or bottom of the safe zone"}
      </figcaption>
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
