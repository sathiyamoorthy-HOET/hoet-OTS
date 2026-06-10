import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/brand-guidelines/organic-video")({
  head: () => ({ meta: [{ title: "Organic Video — Brand & Style" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Brand · Organic Video" title="Organic Video — Brand & Style" intro="Long-form & shorts brand direction for organic distribution." />
      <div className="rounded-lg border border-dashed border-white/20 bg-card p-10 text-center">
        <p className="font-label">Coming Soon</p>
        <h2 className="mt-2 text-2xl font-semibold">Guideline in progress</h2>
        <p className="mt-2 text-sm text-muted-foreground">In the meantime, refer to the universal rules and formats in <Link to="/editing-guidelines" className="underline">Editing Guidelines</Link>.</p>
        <p className="mt-3 text-sm text-muted-foreground">Reference channels: <a href="https://www.youtube.com/@aitv-app" target="_blank" rel="noreferrer" className="underline text-foreground">AI-TV — long-form →</a> · <a href="https://www.youtube.com/@aitv-app/shorts" target="_blank" rel="noreferrer" className="underline text-foreground">AI-TV — shorts →</a></p>
      </div>
    </div>
  ),
});
