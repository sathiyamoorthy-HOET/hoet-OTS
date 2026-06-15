import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SECTIONS, SECTION_META, SECTION_TITLES, SECTION_BODIES } from "@/components/editing-content";

export const Route = createFileRoute("/editing-guidelines/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${SECTION_TITLES[params.slug] ?? "Editing Guidelines"} — HOET` }],
  }),
  component: SectionPage,
});

function SectionPage() {
  const { slug } = Route.useParams();
  const body = SECTION_BODIES[slug];
  const meta = SECTION_META[slug];

  if (!body) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Section not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That rule doesn't exist. <Link to="/editing-guidelines" className="underline text-foreground">Back to Editing Guidelines</Link>.
        </p>
      </div>
    );
  }

  const Icon = meta?.icon;
  const idx = SECTIONS.findIndex(([s]) => s === slug);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx >= 0 && idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  return (
    <article>
      <Link to="/editing-guidelines" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Editing Guidelines
      </Link>

      <h1 className="mt-3 flex items-center gap-3 text-3xl font-semibold tracking-tight">
        {Icon && <Icon className={`h-7 w-7 shrink-0 ${meta.color}`} />}
        {SECTION_TITLES[slug]}
      </h1>

      <div className="mt-5 space-y-3 text-sm text-muted-foreground leading-relaxed">{body}</div>

      <nav className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
        {prev ? (
          <Link to="/editing-guidelines/$slug" params={{ slug: prev[0] }} className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span><span className="font-label block">Previous</span>{prev[1]}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/editing-guidelines/$slug" params={{ slug: next[0] }} className="group inline-flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground">
            <span><span className="font-label block">Next</span>{next[1]}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
