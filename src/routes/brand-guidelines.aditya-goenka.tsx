import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Youtube } from "lucide-react";
import adityaGoenka from "@/assets/aditya-goenka.webp";

export const Route = createFileRoute("/brand-guidelines/aditya-goenka")({
  head: () => ({ meta: [{ title: "Aditya Goenka — Organic Channel" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Brand · Organic · Founder" title="Aditya Goenka" intro="Founder channel — reference for organic tone, pacing and on-screen style." />
      <div className="rounded-lg border border-dashed border-white/20 bg-card p-10 text-center">
        <p className="font-label">Coming Soon</p>
        <h2 className="mt-2 text-2xl font-semibold">Guideline in progress</h2>
        <p className="mt-2 text-sm text-muted-foreground">In the meantime, refer to the universal rules and formats in <Link to="/editing-guidelines" className="underline">Editing Guidelines</Link>.</p>
      </div>

      <div className="mt-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Youtube className="h-4 w-4 text-red-400" /> Channel</h3>
        <p className="mt-1 text-sm text-muted-foreground">Reference the channel for tone, pacing and on-screen style on organic content.</p>
        <a
          href="https://www.youtube.com/channel/UCGY6_3YcvdDsMOEIsp5QeGw"
          target="_blank"
          rel="noreferrer"
          className="group mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-card p-4 transition hover:border-white/30 hover:bg-white/[0.03] sm:max-w-sm"
        >
          <img src={adityaGoenka} alt="Aditya Goenka" loading="lazy" className="h-10 w-10 shrink-0 rounded-md object-cover" />
          <span>
            <span className="block font-medium text-foreground">Aditya Goenka</span>
            <span className="font-label">YouTube channel →</span>
          </span>
        </a>
      </div>
    </div>
  ),
});
