import { TRAINING_DAYS, daySessions, DAY3_SECTIONS, slugify } from "@/lib/training-data";

export type SearchEntry = {
  title: string;
  path: string;
  section: string;
  keywords: string;
};

// Onboarding & Training — generated from the training data so search stays in sync.
const TRAINING_ENTRIES: SearchEntry[] = [
  {
    title: "Onboarding & Training",
    path: "/training",
    section: "Program",
    keywords: "video editor onboarding training program overview goal outcomes welcome new editor guide 4 day pod",
  },
  ...TRAINING_DAYS.flatMap((d) => [
    {
      title: `${d.day} — ${d.title}`,
      path: `/training/${d.slug}`,
      section: "Training",
      keywords: `${d.day} ${d.title} ${d.summary}`.toLowerCase(),
    },
    ...daySessions(d).map((s) => ({
      title: `${d.day} · ${s.session}`,
      path: `/training/${d.slug}/${s.slug}`,
      section: "Training",
      keywords: `${d.day} ${s.half} ${s.session} ${s.what}`.toLowerCase(),
    })),
  ]),
];

// Individual Day 3 tools — each links to the section page that covers it.
const TOOL_ENTRIES: SearchEntry[] = Object.entries(DAY3_SECTIONS).flatMap(([section, tools]) =>
  tools.map((t) => ({
    title: t.name,
    path: `/training/day-3/${slugify(section)}`,
    section: "Tools",
    keywords: `${t.name} ${t.desc} ${section} day 3 tools`.toLowerCase(),
  })),
);

export const SEARCH_INDEX: SearchEntry[] = [
  { title: "Home", path: "/", section: "Overview", keywords: "house of edtech hoet company profile video editing overview" },
  ...TRAINING_ENTRIES,
  ...TOOL_ENTRIES,
  { title: "Editing Guidelines", path: "/editing-guidelines", section: "Editing", keywords: "universal video rules safe zone 9x16 1080x1920 talking head framing close-up wide shot eye line caption placement supers placement caption rules 16 characters symbols units rupee fps do dont non-negotiables editing corrections edit flow pacing avatar quality typography spacing sfx audio balance transitions logo reveal accountability review revision triggers final delivery icons visuals b-roll file naming rules of thumb" },
  { title: "AI Credits — Editor Guide", path: "/ai-credits", section: "AI Credits", keywords: "ai credits editor guide higgsfield generate generation stock or ai assets drive model kling seedance nano banana pro hailuo wan gemini omni magnific upscale veo sora premium tries per shot budget reel short course youtube daily checklist tracker prompt library pod lead permission 1080p violations credits spend efficiency" },
  { title: "AI Credits · Pick the Model", path: "/ai-credits", section: "AI Credits", keywords: "which model kling seedance nano banana pro hailuo 2.3 fast wan 2.6 gemini omni magnific higgsfield veo 3.1 sora 2 cost credits experimental dop happy horse seedream reve flux.2" },
  { title: "AI Credits · Budget & Tries", path: "/ai-credits", section: "AI Credits", keywords: "budget target max tries per shot 3 tries 2 tries reel short 250 350 course 80 150 youtube 500 700 pod lead approval ask first" },
  { title: "Storage Optimization SOP", path: "/storage-optimization", section: "Storage", keywords: "storage optimization sop drive full free space 15% compress stock envato media encoder h.264 bitrate prores 422 lt raw cut project manager collect files exclude unused clips rushes archive drive shared library media cache purge friday cleanup recycle bin checklist" },
  { title: "Storage · Compress Stock Files", path: "/storage-optimization", section: "Storage", keywords: "compress stock file 100 mb adobe media encoder h.264 resolution bitrate 20 30 mbps 10 15 mbps aac 320 kbps prores 422 lt colour grading keying zip delete" },
  { title: "Storage · Friday Cleanup", path: "/storage-optimization", section: "Storage", keywords: "friday cleanup media cache delete unused purge all memory disk cache old versions v1 v2 v3 desktop downloads c drive archive 7 days recycle bin empty" },
  { title: "Brand Guidelines", path: "/brand-guidelines", section: "Brand", keywords: "be10x ai tv organic video profit union brand style" },
  { title: "Be10X — Brand & Style", path: "/brand-guidelines/be10x", section: "Brand", keywords: "be10x logo typography sf pro captions supers colour themes do don'ts cta endscreen watermark" },
  { title: "AI-TV App — Brand", path: "/brand-guidelines/ai-tv", section: "Brand", keywords: "ai tv app brand style guideline ads coming soon" },
  { title: "AI-TV App · Course Videos — Brand", path: "/brand-guidelines/ai-tv-course", section: "Brand", keywords: "ai tv app course videos informative brand book star motif indigo off-white periwinkle lavender poppins oswald lora montserrat captions cta licensing safe zone quality check handoff naming" },
  { title: "Organic Video — Brand", path: "/brand-guidelines/organic-video", section: "Brand", keywords: "organic video brand guideline coming soon youtube long form" },
  { title: "Profit Uni — Brand", path: "/brand-guidelines/profit-uni", section: "Brand", keywords: "profit uni profit union brand guideline coming soon" },
];

export function searchIndex(q: string): SearchEntry[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return SEARCH_INDEX.filter((e) =>
    (e.title + " " + e.section + " " + e.keywords).toLowerCase().includes(query),
  ).slice(0, 8);
}
