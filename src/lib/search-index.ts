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
