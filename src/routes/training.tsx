import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TRAINING_DAYS, slugify } from "@/lib/training-data";
import { SectionLayout } from "@/components/SectionLayout";
import {
  Compass, ClipboardList, Wrench, Users, Building2, Target, Network, Settings,
  MessagesSquare, FileText, CircleCheck, ClipboardCheck, LayoutGrid, GitBranch,
  Megaphone, Sprout, BookOpen, Palette, Images, Sparkles, AudioLines, Wand2,
  Shapes, Trophy, UserCheck, Dot, type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/training")({
  component: TrainingLayout,
});

const DAY_ICONS: Record<string, LucideIcon> = {
  "day-1": Compass,
  "day-2": ClipboardList,
  "day-3": Wrench,
  "day-4": Users,
};

// Pick an icon from the session title's content.
function sessionIcon(name: string): LucideIcon {
  const s = name.toLowerCase();
  if (s.includes("draftdeck")) return Wand2;
  if (s.includes("motion")) return Shapes;
  if (s.includes("stock") || s.includes("asset")) return Images;
  if (s.includes("ai ")) return Sparkles;
  if (s.includes("audio") || s.includes("sound") || s.includes("voice")) return AudioLines;
  if (s.includes("incentive")) return Trophy;
  if (s.includes("brand guideline")) return Palette;
  if (s.includes("sop")) return BookOpen;
  if (s.includes("pipeline") || s.includes("workflow")) return GitBranch;
  if (s.includes("deliverable") || s.includes("format") || s.includes("delivery")) return LayoutGrid;
  if (s.includes("ad task") || s.startsWith("ad ")) return Megaphone;
  if (s.includes("organic")) return Sprout;
  if (s.includes("review") || s.includes("understanding") || s.includes("feedback")) return ClipboardCheck;
  if (s.includes("report")) return FileText;
  if (s.includes("assignment") || s.includes("brief")) return FileText;
  if (s.includes("submission") || s.includes("wrap") || s.includes("ready") || s.includes("send")) return CircleCheck;
  if (s.includes("communication")) return MessagesSquare;
  if (s.includes("software") || s.includes("setup")) return Settings;
  if (s.includes("structure") || s.includes("department")) return Network;
  if (s.includes("audience") || s.includes("marketing") || s.includes("target")) return Target;
  if (s.includes("company") || s.includes("overview")) return Building2;
  if (s.includes("pod") || s.includes("supervised")) return UserCheck;
  if (s.includes("hands-on") || s.includes("tool")) return Wrench;
  return Dot;
}

function TrainingLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isOverview = path === "/training" || path === "/training/";
  const activeDay = TRAINING_DAYS.find((d) => path === `/training/${d.slug}` || path.startsWith(`/training/${d.slug}/`));
  const activeSessionSlug = activeDay ? path.split(`/training/${activeDay.slug}/`)[1] : undefined;

  const linkCls = (active: boolean) =>
    "block rounded-md px-2 py-1.5 transition-colors " +
    (active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5");

  const renderHalf = (day: (typeof TRAINING_DAYS)[number], label: "First Half" | "Second Half", sessions: { session: string }[]) => (
    <div>
      <div className="font-label">{label}</div>
      <div className="mt-1.5 space-y-1.5">
        {sessions.map((s) => {
          const sl = slugify(s.session);
          const isActive = activeDay?.slug === day.slug && activeSessionSlug === sl;
          const Icon = sessionIcon(s.session);
          return (
            <Link
              key={s.session}
              to="/training/$day/$session"
              params={{ day: day.slug, session: sl }}
              className={"flex items-start gap-2 py-0.5 text-[13px] " + (isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-300/80" />
              <span>{s.session}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const nav = (
    <>
      <Link to="/training" className={linkCls(isOverview)}>
        <span className="flex items-center gap-2 font-medium"><LayoutGrid className="h-4 w-4 shrink-0 text-emerald-300" /> Overview</span>
      </Link>

      {TRAINING_DAYS.map((day) => {
        const active = activeDay?.slug === day.slug;
        const DayIcon = DAY_ICONS[day.slug] ?? Compass;
        return (
          <div key={day.slug}>
            <Link to="/training/$day" params={{ day: day.slug }} className={linkCls(active && !activeSessionSlug)}>
              <span className="flex items-center gap-2 font-medium"><DayIcon className="h-4 w-4 shrink-0 text-amber-300" /> {day.day}</span>
              <span className="mt-0.5 block pl-6 text-xs text-muted-foreground">{day.title}</span>
            </Link>

            <div className="mb-3 mt-2 ml-2 space-y-4 border-l border-white/10 pl-3">
              {renderHalf(day, "First Half", day.first)}
              {renderHalf(day, "Second Half", day.second)}
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <SectionLayout title="Onboarding & Training" nav={nav}>
      <Outlet />
    </SectionLayout>
  );
}
