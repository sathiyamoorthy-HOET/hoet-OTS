import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { OnThisPage } from "@/components/OnThisPage";
import { HardDrive, FileArchive, Scissors, FolderSymlink, Trash2, CheckSquare, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/storage-optimization")({
  head: () => ({
    meta: [
      { title: "Storage Optimization SOP — HOET" },
      { name: "description", content: "Editing team storage SOP — compress stock before saving, raw cut first, share Envato elements once, and clean up every Friday. Keep 15% free space." },
      { property: "og:title", content: "Storage Optimization SOP — HOET" },
      { property: "og:description", content: "Four rules that keep editing drives from filling up mid-project." },
    ],
  }),
  component: Page,
});

function Section({ id, n, icon: Icon, color, title, children }: { id: string; n?: string; icon: React.ComponentType<{ className?: string }>; color: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="flex items-center gap-2.5 text-xl font-semibold">
        <Icon className={`h-5 w-5 shrink-0 ${color}`} />
        {n && <span className="font-label">{n}</span>}
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

const ENCODE: string[][] = [
  ["Format", "H.264"],
  ["Resolution", "Same as your timeline (do not keep 4K for a 1080p or 9 × 16 edit)"],
  ["Bitrate", "20–30 Mbps for 1080p  |  10–15 Mbps for 9 × 16"],
  ["Audio", "AAC 320 kbps, or none if the clip has no useful audio"],
];

const LIBRARY = [
  "Stock_Footage",
  "Motion_Graphics_Templates",
  "Sound_Effects",
  "Music",
  "LUTs_Presets",
  "Fonts / Logos / Brand_Assets",
];

const CHECKLIST = [
  "Stock file over 100 MB compressed in Media Encoder",
  "Compressed file uploaded to shared library",
  "Original download and ZIP deleted",
  "Raw cut done before the creative edit",
  "Rushes moved to archive drive",
  "Rushes deleted only after approval and pod lead OK",
  "Shared library checked before downloading",
  "File named properly so the team can find it",
  "Media cache and disk cache cleared this week",
  "Old versions deleted, final kept",
  "Delivered projects archived within 7 days",
  "Recycle Bin emptied",
  "Drive above 15% free",
];

function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Post Production · SOP · v1.0"
        title="Storage Optimization SOP"
        intro="Drives keep getting full, so editing stops in the middle of work. Follow these four rules — and always keep at least 15% free space on your drive."
      />

      <OnThisPage
        nav={[
          ["#compress", "1 · Compress Stock"],
          ["#raw-cut", "2 · Raw Cut First"],
          ["#share", "3 · Share Elements"],
          ["#friday", "4 · Friday Cleanup"],
          ["#checklist", "Quick Checklist"],
        ]}
        storageKey="storageSopToc"
      >
        <div className="mb-10 flex items-start gap-3 rounded-lg border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm">
          <HardDrive className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <p className="text-muted-foreground">
            <strong className="text-foreground">Why this SOP:</strong> a full drive stops an edit mid-project — and nothing on the timeline matters if the export can't run. Editing Team · Post Production.
          </p>
        </div>

        <Section id="compress" n="01" icon={FileArchive} color="text-sky-400" title="Make stock files smaller before you save them">
          <ul className="list-disc pl-5 space-y-1">
            <li>Stock file from Envato bigger than <strong className="text-foreground">100 MB</strong>? Do not save it as it is.</li>
            <li>Open <strong className="text-foreground">Adobe Media Encoder</strong>, export a smaller version, then save that in the project folder.</li>
            <li>Upload the compressed file to the shared drive library. Then nobody has to download it again or compress it again.</li>
            <li>Delete the original download and the ZIP file.</li>
          </ul>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/15">
                  {["Setting", "Use this"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-foreground">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {ENCODE.map(([k, v]) => (
                  <tr key={k} className="border-b border-white/10 align-top">
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rounded-lg border border-sky-400/25 bg-sky-400/[0.06] p-3">
            If the clip needs heavy colour grading or keying, export <strong className="text-foreground">ProRes 422 LT</strong> instead.
          </p>
        </Section>

        <Section id="raw-cut" n="02" icon={Scissors} color="text-violet-400" title="Do the raw cut first, then remove the extra footage">
          <ul className="list-disc pl-5 space-y-1">
            <li>A 1 hour 45 minute shoot usually has only <strong className="text-foreground">10 to 15 minutes</strong> of useful footage. The rest is waste.</li>
            <li>Do the raw cut <strong className="text-foreground">before</strong> you start the creative edit. Keep only the good takes.</li>
            <li>In Premiere use <strong className="text-foreground">File → Project Manager → Collect Files</strong>, with <strong className="text-foreground">Exclude Unused Clips ON</strong>.</li>
            <li>Move the full rushes off your editing drive to the archive drive.</li>
          </ul>
          <p className="flex items-start gap-2.5 rounded-lg border border-rose-400/25 bg-rose-400/[0.06] p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span><strong className="text-foreground">Important:</strong> delete the rushes only after the video is delivered and approved, and only with your pod lead's OK. <strong className="text-foreground">Never delete rushes before approval.</strong></span>
          </p>
        </Section>

        <Section id="share" n="03" icon={FolderSymlink} color="text-emerald-400" title="Share Envato elements — don't download the same file twice">
          <ul className="list-disc pl-5 space-y-1">
            <li>Check the shared drive library <strong className="text-foreground">first</strong> before you download anything.</li>
            <li>If it is not there, download once, compress it, then upload the compressed version to the shared drive and tell the team.</li>
            <li>Always upload the compressed file, not the heavy original. <strong className="text-foreground">One download, one compress, everyone uses the same file.</strong></li>
            <li>Name it properly so others can find it — for example <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-foreground">Transition_GlitchPack01_1080p_Envato.mogrt</code>.</li>
            <li>No files named <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">download (3).mp4</code> or <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">final final v2</code>. Nobody can find those, so they get downloaded again.</li>
          </ul>
          <div>
            <p className="font-label">Shared library folders — all on the shared drive</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LIBRARY.map((f) => (
                <span key={f} className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-xs text-foreground">{f}</span>
              ))}
            </div>
          </div>
          <p className="text-sm">
            Deliverable file names follow the convention in{" "}
            <Link to="/editing-guidelines/$slug" params={{ slug: "file-naming" }} className="underline text-foreground">Editing Guidelines → File Naming</Link>.
          </p>
        </Section>

        <Section id="friday" n="04" icon={Trash2} color="text-orange-400" title="Clean up every Friday">
          <ul className="list-disc pl-5 space-y-1">
            <li>Clear media cache. Premiere: <strong className="text-foreground">Edit → Preferences → Media Cache → Delete Unused</strong>. After Effects: <strong className="text-foreground">Edit → Purge → All Memory and Disk Cache</strong>. This alone frees 50 to 200 GB.</li>
            <li>Delete old versions (v1, v2, v3 review). Keep only the approved final file.</li>
            <li>Keep nothing on Desktop, Downloads or C drive. All media on the working drive.</li>
            <li>Move delivered projects to the archive drive within <strong className="text-foreground">7 days</strong>.</li>
            <li>Empty the Recycle Bin. Deleted files do not free space until you do this.</li>
          </ul>
          <p className="text-sm">
            Project handover packaging is covered by{" "}
            <Link to="/editing-guidelines/$slug" params={{ slug: "project-backup" }} className="underline text-foreground">Editing Guidelines → Project Backup &amp; Handoff</Link>.
          </p>
        </Section>

        <Section id="checklist" icon={CheckSquare} color="text-lime-400" title="Quick Checklist">
          <p>Print it and keep it at your desk.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-card p-3">
                <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-[4px] border border-white/25" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Section>
      </OnThisPage>
    </div>
  );
}
