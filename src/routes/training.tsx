import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TRAINING_DAYS, slugify } from "@/lib/training-data";

export const Route = createFileRoute("/training")({
  component: TrainingLayout,
});

function TrainingLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isOverview = path === "/training" || path === "/training/";
  const activeDay = TRAINING_DAYS.find((d) => path === `/training/${d.slug}` || path.startsWith(`/training/${d.slug}/`));
  const activeSessionSlug = activeDay ? path.split(`/training/${activeDay.slug}/`)[1] : undefined;

  const linkCls = (active: boolean) =>
    "block rounded-md px-2 py-1.5 transition-colors " +
    (active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5");

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="mb-10 lg:mb-0">
        <div className="lg:sticky lg:top-24">
          <p className="font-label mb-3">Onboarding & Training</p>
          <nav className="space-y-2 text-sm">
            <Link to="/training" className={linkCls(isOverview)}>Overview</Link>

            {TRAINING_DAYS.map((day) => {
              const active = activeDay?.slug === day.slug;
              return (
                <div key={day.slug}>
                  <Link to="/training/$day" params={{ day: day.slug }} className={linkCls(active && !activeSessionSlug)}>
                    <span className="block font-medium">{day.day}</span>
                    <span className="block text-xs text-muted-foreground">{day.title}</span>
                  </Link>

                  {active && (
                    <div className="mb-3 mt-2 ml-2 space-y-4 border-l border-white/10 pl-3">
                      <div>
                        <div className="font-label">First Half</div>
                        <div className="mt-1.5 space-y-1.5">
                          {day.first.map((s) => {
                            const sl = slugify(s.session);
                            return (
                              <Link key={s.session} to="/training/$day/$session" params={{ day: day.slug, session: sl }} className={"block py-0.5 text-[13px] " + (activeSessionSlug === sl ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>{s.session}</Link>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="font-label">Second Half</div>
                        <div className="mt-1.5 space-y-1.5">
                          {day.second.map((s) => {
                            const sl = slugify(s.session);
                            return (
                              <Link key={s.session} to="/training/$day/$session" params={{ day: day.slug, session: sl }} className={"block py-0.5 text-[13px] " + (activeSessionSlug === sl ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>{s.session}</Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
