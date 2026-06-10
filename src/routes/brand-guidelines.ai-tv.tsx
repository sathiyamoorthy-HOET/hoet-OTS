import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/brand-guidelines/ai-tv")({
  head: () => ({ meta: [{ title: "AI-TV App — Brand & Style" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Brand · AI-TV App" title="AI-TV App — Brand & Style" intro="Stay Ahead of AI. In Minutes, Not Hours." />
      <div className="rounded-lg border border-dashed border-white/20 bg-card p-10 text-center">
        <p className="font-label">Coming Soon</p>
        <h2 className="mt-2 text-2xl font-semibold">Guideline in progress</h2>
        <p className="mt-2 text-sm text-muted-foreground">In the meantime, refer to the universal rules and formats in <Link to="/editing-guidelines" className="underline">Editing Guidelines</Link>.</p>
      </div>
    </div>
  ),
});
