import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, CircleCheck, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TRAINING_DAYS } from "@/lib/training-data";

export const Route = createFileRoute("/training/")({
  head: () => ({
    meta: [
      { title: "Onboarding & Training — HOET" },
      { name: "description", content: "A 4-day alignment program for experienced editors — the goal, what an editor can do by the end, and the day-by-day plan." },
      { property: "og:title", content: "Video Editor Onboarding & Training — HOET" },
      { property: "og:description", content: "A 4-day alignment program for experienced editors — into a pod and onto real work by week two." },
    ],
  }),
  component: Page,
});

const OUTCOMES = [
  "Apply the correct structure for every content type — ads, organic, Shorts and course videos",
  "Edit to the House of EdTech SOP and the do's and don'ts",
  "Follow brand guidelines across Be10x, AI-TV, Profit Uni and organic",
  "Use the full tool stack — AI generation, motion, stock and sound — and prompt engineering",
  "Deliver every output in the correct format and aspect ratios",
  "Work inside their pod and maintain a proper work report",
  "Understand how incentives are earned",
];

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="House of EdTech · Creative Department"
        title="Video Editor Onboarding & Training"
        intro="A 4-day alignment program for experienced editors — into a pod and onto real work by week two. We hire editors who already know their craft, so this program is not about teaching software. It is about aligning a skilled editor to House of EdTech standards: how we structure each content type, the brand rules across Be10x, AI-TV and Profit Uni, the tool and prompt-engineering stack, the formats we deliver in, and how work is reported and rewarded. Four structured days, then straight into a pod."
      />

      <section className="mb-12">
        <div className="flex items-start gap-3 rounded-lg border border-white/15 bg-card p-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-300">
            <Target className="h-5 w-5" />
          </span>
          <div>
            <p className="font-label text-emerald-300">The Goal</p>
            <p className="mt-1 text-foreground">Make a new editor production-ready on House of EdTech standards, placed in their pod by Day 4 and working on real assignments from Day 5.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold">By the end of the program, the editor can</h2>
        <ul className="mt-3 grid gap-2 text-muted-foreground leading-relaxed sm:grid-cols-2">
          {OUTCOMES.map((o) => (
            <li key={o} className="flex items-start gap-2.5">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold">The Program at a Glance</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">Each day is split into a first and second half, and builds on the last — from a baseline read of current skill to working real deliverables inside a pod. Open any day for the full breakdown.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {TRAINING_DAYS.map((d) => (
            <Link key={d.slug} to="/training/$day" params={{ day: d.slug }} className="group rounded-lg border border-white/10 bg-card p-5 transition hover:border-white/30 hover:bg-white/[0.03]">
              <div className="flex items-center gap-1.5 font-label"><CalendarDays className="h-3.5 w-3.5" /> {d.day}</div>
              <div className="mt-1 text-lg font-semibold">{d.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d.summary}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></div>
            </Link>
          ))}
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        The craft standards taught across these days live in the <Link to="/editing-guidelines" className="underline text-foreground">Editing Guidelines</Link>, and the per-brand rules in the <Link to="/brand-guidelines" className="underline text-foreground">Brand Guidelines</Link>.
      </p>
    </div>
  );
}
