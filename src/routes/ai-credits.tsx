import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OnThisPage } from "@/components/OnThisPage";
import {
  Coins, Search, Cpu, Repeat, Wallet, ClipboardCheck, ShieldCheck, Ban, FlaskConical,
} from "lucide-react";

export const Route = createFileRoute("/ai-credits")({
  head: () => ({
    meta: [
      { title: "AI Credits — Editor Guide · HOET" },
      { name: "description", content: "How editors spend AI credits: stock or drive first, the right model, tries per shot, budgets per video type, the daily log, and when to ask for a yes." },
      { property: "og:title", content: "AI Credits — Editor Guide · HOET" },
      { property: "og:description", content: "Generate smart. Stop wasting credits. The editor's rules for AI generation." },
    ],
  }),
  component: Page,
});

function Section({ id, icon: Icon, color, title, children }: { id: string; icon: React.ComponentType<{ className?: string }>; color: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="flex items-center gap-2.5 text-xl font-semibold">
        <Icon className={`h-5 w-5 shrink-0 ${color}`} />
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Table({ head, rows, mono }: { head: string[]; rows: React.ReactNode[][]; mono?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/15">
            {head.map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-white/10 align-top">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={
                    "px-3 py-2 " +
                    (j === 0 ? "font-medium text-foreground " : "") +
                    (j === mono ? "font-mono whitespace-nowrap " : "")
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RULES: [string, string][] = [
  ["Stock or drive first", "Don't generate what a stock site or the assets drive already has."],
  ["Right model", "No people → Kling. People → Seedance. Full menu below."],
  ["Limited tries", "3 tries per shot on cheap models, 2 on expensive. More = ask."],
  ["Name + log", "Your name on every generation. Fill the tracker daily."],
  ["Ask first", "1080p, Veo / Sora, or over budget → get a yes before generating."],
];

const STOCK_VS_AI: string[][] = [
  ["It exists in real life — cities, offices, nature, hands typing, tech b-roll", "Anything featuring Aditya Kachave or Aditya Goenka", "The shot is impossible to film — wild camera moves, surreal, brand characters"],
  ["It's a quick 1–2 second cutaway", "Anything be10x brand — logos, product, brand shots", "It's the hero shot the whole video depends on"],
  ["Generic b-roll for a course / explainer", "Anything for AI generalists content", "You need an on-brand look stock can't match"],
  ["You found it on a stock site in under 5 minutes", "Not in the drive? → then AI generate", "You searched stock and the drive, and nothing fits"],
];

const MODELS: string[][] = [
  ["Still image / thumbnail / start-frame", "Nano Banana Pro", "~2 credits"],
  ["No people (city, product, b-roll)", "Kling", "~6–14 credits"],
  ["Rough draft to test an idea", "Hailuo 2.3 Fast", "cheapest"],
  ["Restyle existing footage", "WAN 2.6", "low"],
  ["Motion graphics / animated text", "Gemini Omni", "Google plan, not Higgsfield — ~$0.10/sec. Never your own card. Log it too."],
  ["People — faces, emotion", "Seedance", "~22 credits (720p). The expensive one."],
  ["Blurry / low-res clip → upscale", "Magnific / Higgsfield", "Never re-generate to add detail."],
  ["Veo 3.1 / Sora 2 → ask first", "Premium", "~40–70 credits. Pod lead must say yes."],
];

const EXPERIMENTAL: string[][] = [
  ["Higgsfield DoP — video", "Cinematic camera moves & directed motion feel", "Higgsfield's own model — reach for it when camera feel matters"],
  ["Happy Horse 1.0 — video", "High-quality general video (a top-ranked newcomer)", "New & underused — test a cheap take before a final"],
  ["Seedream 5.0 — image", "Rich, detailed stills, a different look to Nano Banana", "Strong start-frames with a fresh aesthetic"],
  ["Reve — image", "Distinctive, stylised / artistic frames", "Nice for on-brand hero stills"],
  ["FLUX.2 — image", "Design, graphic & text-in-image looks", "Good base frames for motion graphics"],
];

const TRIES: string[][] = [
  ["Kling · Hailuo · WAN · Gemini", "3", "Fix the prompt — more tries need a yes"],
  ["Seedance — or anything ≥ 15 credits / clip", "2", "Pod lead must say yes first"],
];

const BUDGET: string[][] = [
  ["Reel / short (45s)", "~250", "350", "No-people shots on Kling → ~150"],
  ["Course video (5–10 min)", "~80", "150", "Mostly screen-rec + stock"],
  ["YouTube video", "~500", "700", "Motion graphics on Gemini = no Higgsfield credits"],
];

const DAILY: [string, string][] = [
  ["Name it", "Your name in the comment field, the moment it generates."],
  ["File it", "AI clips → “AI Generated — [project]” · stock → “Stock Footage — [project]” (Drive)."],
  ["Save it", "Winning prompt → prompt library."],
  ["Log it", "One tracker row at end of day — projects, models, tries, credits, flags."],
];

const PERMISSION: string[][] = [
  ["Any 1080p — any model, any video", "Pod lead must say yes. No exceptions."],
  ["Veo 3.1 / Sora 2", "Pod lead must say yes. No exceptions."],
  ["Crossing the budget max", "Message pod lead with the reason, wait for the yes."],
  ["Extra tries on a shot", "Ask pod lead, wait for the yes."],
  ["Pod lead silent for 2 working hours", "Escalate to Aditya Kachave."],
  ["Silent 4 working hours (both messages logged)", "Go ahead — target only, never 1080p / Veo / Sora. The one time silence isn't a no."],
];

const VIOLATIONS = [
  "Generating what stock or the drive already has (no logged search).",
  "Extra tries without a yes.",
  "1080p without a yes.",
  "No name in the comment field.",
  "Skipping the daily log — or logging fake numbers.",
  "Personal stuff on the company account.",
];

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="AI Credits · Editor Guide · v1.0"
        title="AI Credits — Editor Guide"
        intro="Generate smart. Stop wasting credits. Read once, follow daily — this is how every editor picks between stock and AI, chooses a model, spends tries, stays inside a budget, and logs the work."
      />

      <OnThisPage
        nav={[
          ["#rules", "The 5 Rules"],
          ["#stock-or-ai", "1 · Stock or AI?"],
          ["#models", "2 · Pick the Model"],
          ["#experimental", "Experimental Models"],
          ["#tries", "3 · Tries per Shot"],
          ["#budget", "4 · Stay in Budget"],
          ["#daily", "5 · Daily Checklist"],
          ["#permission", "When to Ask"],
          ["#violations", "Violations"],
        ]}
        storageKey="aiCreditsToc"
      >
        <Section id="rules" icon={Coins} color="text-amber-400" title="The 5 Rules">
          <p>Everything else on this page is detail. These five are the whole policy.</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {RULES.map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-white/10 bg-card p-4">
                <div className="font-label">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-medium text-foreground">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stock-or-ai" icon={Search} color="text-sky-400" title="Step 1 · Stock or AI?">
          <p>Work left to right. Stock first, then the assets drive, and only then AI.</p>
          <Table
            head={["Use STOCK ✓", "Check ASSETS DRIVE first", "Use AI only if…"]}
            rows={STOCK_VS_AI}
          />
          <p className="rounded-lg border border-sky-400/25 bg-sky-400/[0.06] p-3">
            Searched stock and the drive but nothing fit? <strong className="text-foreground">Write your search words in the tracker</strong> — a logged search is never questioned. Not sure? Use stock or the drive.
          </p>
        </Section>

        <Section id="models" icon={Cpu} color="text-violet-400" title="Step 2 · Pick the Model">
          <Table head={["Your shot", "Use", "Cost"]} rows={MODELS} />
          <p className="rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] p-3">
            <strong className="text-foreground">Golden habit:</strong> draft on Kling / Hailuo, then use Seedance only for the final take. Always check the in-app price first — it changes often.
          </p>
        </Section>

        <Section id="experimental" icon={FlaskConical} color="text-fuchsia-400" title="Bonus · Experimental Models">
          <p>Nice output, but less popular — worth reaching for when the standard menu doesn't give you the look.</p>
          <Table head={["Model", "Nice for", "Note"]} rows={EXPERIMENTAL} />
          <p className="text-sm italic">
            Experimental = test on the cheapest setting first. It still counts against your budget and tries, still needs a yes if it's premium or 1080p, and prices vary — check in-app before you generate.
          </p>
        </Section>

        <Section id="tries" icon={Repeat} color="text-orange-400" title="Step 3 · Your Tries per Shot">
          <Table head={["Model", "Max tries", "Need more?"]} rows={TRIES} mono={1} />
          <ul className="list-disc pl-5 space-y-1">
            <li>A <strong className="text-foreground">shot</strong> = one slot in your timeline. Changing the prompt or model is not a new shot.</li>
            <li>Every try counts — including the first. At budget max with tries left? <strong className="text-foreground">Max wins</strong> — stop and ask.</li>
            <li>App glitched or brief changed? Note it in the tracker — those tries don't count.</li>
            <li>Before you generate: write the prompt, check the prompt library. After publishing: save your prompt to it.</li>
          </ul>
        </Section>

        <Section id="budget" icon={Wallet} color="text-emerald-400" title="Step 4 · Stay Inside the Budget">
          <Table head={["Video type", "Target", "Max", "Tip"]} rows={BUDGET} />
          <p className="rounded-lg border border-rose-400/25 bg-rose-400/[0.06] p-3">
            <strong className="text-foreground">Max is max</strong> — it includes all your tries. Crossing it? Message your pod lead and wait for the yes. A message alone doesn't cover you.
          </p>
        </Section>

        <Section id="daily" icon={ClipboardCheck} color="text-lime-400" title="Step 5 · Daily Checklist">
          <ul className="grid gap-2 sm:grid-cols-2">
            {DAILY.map(([t, d]) => (
              <li key={t} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-card p-3">
                <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-[4px] border border-white/25" aria-hidden />
                <span>
                  <strong className="text-foreground">{t}</strong> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p>
            Pod leads match the tracker to Higgsfield history weekly — <strong className="text-foreground">log real numbers</strong>. Efficiency = spend vs your target, so people-heavy work won't hurt you. Efficient editors are recognised every month.
          </p>
        </Section>

        <Section id="permission" icon={ShieldCheck} color="text-cyan-400" title="When You Need Permission">
          <Table head={["Situation", "What to do"]} rows={PERMISSION} />
        </Section>

        <Section id="violations" icon={Ban} color="text-rose-400" title="Don't — These Count as Violations">
          <ul className="space-y-1.5">
            {VIOLATIONS.map((v) => (
              <li key={v} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-rose-400">✗</span> {v}
              </li>
            ))}
          </ul>
          <p>
            <strong className="text-foreground">If it happens:</strong> missed log → reminder · first time over a max without a yes → documented talk · repeats → written warning + all expensive models need pre-approval for a week · keeps happening → performance review.
          </p>
          <p className="text-sm">
            Questions? Ask your pod lead. Tracker &amp; prompt library links are pinned in the editors channel. AI in the edit itself is covered by{" "}
            <Link to="/editing-guidelines/$slug" params={{ slug: "ai-usage" }} className="underline text-foreground">Editing Guidelines → AI Usage Policy</Link>.
          </p>
        </Section>
      </OnThisPage>
    </div>
  );
}
