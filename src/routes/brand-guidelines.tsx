import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SectionLayout } from "@/components/SectionLayout";

export const Route = createFileRoute("/brand-guidelines")({
  component: BrandLayout,
});

const BRAND_LINKS: { to: string; label: string; note?: string }[] = [
  { to: "/brand-guidelines", label: "All brands" },
  { to: "/brand-guidelines/aditya-goenka", label: "Aditya Goenka", note: "Organic · Founder" },
  { to: "/brand-guidelines/aditya-kachave", label: "Aditya Kachave", note: "Organic · Founder" },
  { to: "/brand-guidelines/organic-video", label: "AI-TV App — Organic", note: "Long-form & shorts" },
  { to: "/brand-guidelines/ai-tv", label: "AI-TV App", note: "Ads" },
  { to: "/brand-guidelines/ai-tv-course", label: "AI-TV — Course Videos" },
  { to: "/brand-guidelines/be10x", label: "Be10X", note: "Ads" },
  { to: "/brand-guidelines/profit-uni", label: "Profit Uni", note: "Ads" },
  { to: "/brand-guidelines/office-master", label: "Office Master", note: "Ads" },
  { to: "/brand-guidelines/ai-for-techies", label: "AI for Techies", note: "Ads" },
];

function BrandLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) =>
    to === "/brand-guidelines"
      ? path === "/brand-guidelines" || path === "/brand-guidelines/"
      : path === to || path.startsWith(`${to}/`);

  const linkCls = (active: boolean) =>
    "block rounded-md px-2 py-1.5 transition-colors " +
    (active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5");

  const nav = (
    <>
      {BRAND_LINKS.map((b) => (
        <Link key={b.to} to={b.to} className={linkCls(isActive(b.to))}>
          <span className="block font-medium">{b.label}</span>
          {b.note && <span className="block text-xs text-muted-foreground">{b.note}</span>}
        </Link>
      ))}
    </>
  );

  return (
    <SectionLayout title="Brand Guidelines" nav={nav}>
      <Outlet />
    </SectionLayout>
  );
}
