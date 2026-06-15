import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SectionLayout } from "@/components/SectionLayout";
import { SECTIONS, SECTION_META } from "@/components/editing-content";

export const Route = createFileRoute("/editing-guidelines")({
  head: () => ({
    meta: [
      { title: "Editing Guidelines — HOET" },
      { name: "description", content: "Universal video rules — caption and super placement, caption rules, symbols & units, do's & don'ts, non-negotiables." },
      { property: "og:title", content: "Editing Guidelines — HOET" },
      { property: "og:description", content: "Universal video rules used across every House of EdTech video edit." },
    ],
  }),
  component: EditingLayout,
});

function EditingLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isOverview = path === "/editing-guidelines" || path === "/editing-guidelines/";

  const nav = (
    <>
      <Link
        to="/editing-guidelines"
        activeOptions={{ exact: true }}
        className={"block rounded-md px-2 py-1.5 transition-colors " + (isOverview ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground")}
      >
        Overview &amp; Rules of Thumb
      </Link>
      {SECTIONS.map(([slug, label]) => {
        const meta = SECTION_META[slug];
        const Icon = meta?.icon;
        const active = path === `/editing-guidelines/${slug}`;
        return (
          <Link
            key={slug}
            to="/editing-guidelines/$slug"
            params={{ slug }}
            className={"flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors " + (active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground")}
          >
            {Icon && <Icon className={`h-4 w-4 shrink-0 ${meta.color}`} />}
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <SectionLayout title="Editing Guidelines" nav={nav}>
      <Outlet />
    </SectionLayout>
  );
}
