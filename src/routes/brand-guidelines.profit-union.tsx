import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/brand-guidelines/profit-union")({
  head: () => ({ meta: [{ title: "Profit Union — Brand & Style" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Brand · Profit Union" title="Profit Union — Brand & Style" intro="Funnel brand guideline." />
      <div className="rounded-lg border border-dashed border-white/20 bg-card p-10 text-center">
        <p className="font-label">Coming Soon</p>
        <h2 className="mt-2 text-2xl font-semibold">Guideline in progress</h2>
        <p className="mt-2 text-sm text-muted-foreground">In the meantime, refer to the universal rules in <Link to="/editing-guidelines" className="underline">Editing Guidelines</Link>.</p>
      </div>
    </div>
  ),
});
