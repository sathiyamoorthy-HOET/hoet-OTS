// To add a training video, set `video` to a YouTube link, e.g.
//   video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
// Leave it out and no video is shown for that session.
export type Session = { session: string; what: string; video?: string; trainerLed?: boolean; link?: { to: string; label: string } };

export function brandLogo(domain: string): string {
  // Falls back to a generic globe if the site has no icon.
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export type SessionWithHalf = Session & { half: "First Half" | "Second Half"; slug: string };

export function findDay(daySlug: string): TrainingDayData | undefined {
  return TRAINING_DAYS.find((d) => d.slug === daySlug);
}

export function daySessions(day: TrainingDayData): SessionWithHalf[] {
  return [
    ...day.first.map((s) => ({ ...s, half: "First Half" as const, slug: slugify(s.session) })),
    ...day.second.map((s) => ({ ...s, half: "Second Half" as const, slug: slugify(s.session) })),
  ];
}

export type TrainingDayData = {
  slug: string;
  day: string;
  title: string;
  summary: string;
  note?: string;
  first: Session[];
  second: Session[];
};

export const TRAINING_DAYS: TrainingDayData[] = [
  {
    slug: "day-1",
    day: "Day 1",
    title: "Orientation & Baseline Assignment",
    summary: "Orientation, setup, then the baseline assignment.",
    note: "Day 1 is to know what they know — a baseline day where we see how the editor applies the skills they already have. No craft is taught yet; that starts on Day 2. Assignment: create a 30-second ad with light direction — the point is to see current skill, not guide the result. It is reviewed at the start of Day 2.",
    first: [
      { session: "Company & brand overview", what: "House of EdTech and the brand portfolio — Be10x, AI-TV, Profit Uni and more" },
      { session: "Audience, marketing & brand targets", what: "Who each brand speaks to, the marketing approach and the target for each" },
      { session: "Creative department structure", what: "Teams, pods, roles and where the editor fits in.", trainerLed: true },
      { session: "Software requirements & setup", what: "Confirm tools and licenses; provision anything missing.", trainerLed: true },
      { session: "Communication flow", what: "Attendance and HR on Keka, communication on Slack, and reviews on Frame.io.", trainerLed: true },
    ],
    second: [
      { session: "Assignment brief", what: "Give the assignment and explain the delivery requirements — format, aspect ratios, duration and the 7 PM deadline. Share references and expectations.", trainerLed: true },
      { session: "Assignment + tech support", what: "The editor builds the assignment; the trainer is on hand for technical support only — help new joiners with any tooling, setup or export issues.", trainerLed: true },
      { session: "Submission & wrap-up", what: "Collect every submission on time — even if incomplete — sharply by 7 PM. Quick recap, and a look at the next day.", trainerLed: true },
    ],
  },
  {
    slug: "day-2",
    day: "Day 2",
    title: "SOP, Content Types & Brand Standards",
    summary: "Review, SOP, structures and content types, then editing & brand standards.",
    first: [
      { session: "Review of Day 1 assignments", what: "Review each editor's assignment one by one, then share the feedback with all the new joiners together — calling out the common mistakes so everyone learns from them.", trainerLed: true },
      { session: "Editing Pipeline", what: "The eight-step post-production pipeline every video runs through — from ingest to final export." },
      { session: "Deliverable structure", what: "The four video formats, their export specs, and the on-screen anatomy of each — how every deliverable is built." },
      { session: "Ad Task Types", what: "The main ad editing task types you'll be assigned, and what each one means.", trainerLed: true },
    ],
    second: [
      { session: "Editing SOP — ads, organic & course", what: "The House of EdTech editing standard applied to each format — ads, organic and course. The full SOP, do's & don'ts and on-screen rules live on the Editing Guidelines page.", link: { to: "/editing-guidelines", label: "Open Editing Guidelines" } },
      { session: "Delivery formats", what: "Aspect ratios, the master-then-resize workflow, and the export specs for each format." },
      { session: "Brand guidelines", what: "How each brand looks and sounds on screen — Be10x, AI-TV & course videos, Profit Uni and organic. Each brand keeps its own Brand & Style Guideline.", link: { to: "/brand-guidelines", label: "Open Brand Guidelines" } },
    ],
  },
  {
    slug: "day-3",
    day: "Day 3",
    title: "Tools & Prompt Engineering — Hands-On",
    summary: "Tool walkthroughs, then hands-on with each tool.",
    first: [
      { session: "Stock & assets", what: "Where to source footage, music, graphics and icons." },
      { session: "Content & prompt engineering", what: "Use AI to draft scripts, hooks and copy — and learn to prompt for clean, usable output." },
      { session: "AI generation", what: "Generate avatars, video and visuals with AI when there's no shoot footage." },
      { session: "Audio & sound", what: "Create voice-overs and build a clean, balanced sound mix." },
      { session: "Draftdeck", what: "House of EdTech's own script-to-video app — draft the script with AI, then generate the voice-over and avatar video in one place." },
      { session: "Motion graphics", what: "Build animated text and elements fast." },
    ],
    second: [
      { session: "Hands-on with each tool", what: "The editor produces something with every tool from the walkthroughs. The trainer sets the short tasks, supports, and unblocks any hands-on issues.", trainerLed: true },
      { session: "Review of outputs", what: "The trainer reviews what each tool produced with the group — calling out what worked, what to improve, and where each tool fits in the workflow.", trainerLed: true },
    ],
  },
  {
    slug: "day-4",
    day: "Day 4",
    title: "Pod, Supervised Work & Close",
    summary: "Pod and supervised work, then review, reporting & incentives — program closes.",
    note: "Program close — with the review done and reporting and incentives understood, structured onboarding is complete. From Day 5 the editor runs as a full member of their pod.",
    first: [
      { session: "Pod allocation", what: "Meet the pod and roles, and get introduced to the team. From here you receive your tasks from the pod and work on them with the trainer's guidance — discuss the approach with the trainer before and during the task.", trainerLed: true },
      { session: "Supervised work", what: "Work on real deliverables with the trainer's guidance and support — the trainer is there to guide the new joiner and help them through each task.", trainerLed: true },
    ],
    second: [
      { session: "Review of supervised work", what: "Review the task output and, if needed, deliver it to the real pod manager — with any revisions applied first." },
      { session: "Understanding check", what: "Share feedback on the new joiner's work — the positives, the negatives, and concrete suggestions to improve their skills." },
      { session: "Work report", what: "How to maintain and follow the work report — the format, the fields, and the daily discipline of keeping it updated. The trainer walks through it with the sample below.", trainerLed: true },
      { session: "Incentive structure", what: "Eligibility and how incentives are earned.", trainerLed: true },
      { session: "You're Pod-Ready", what: "Wrap-up and a send-off — structured onboarding is complete. From Day 5 you run as a full member of your pod. The trainer recaps the journey and what Day 5 onward looks like.", trainerLed: true },
    ],
  },
];

export const DELIVERY_REFERENCE: [string, string, string][] = [
  ["YouTube video", "16:9", "—"],
  ["YouTube Shorts", "9:16", "—"],
  ["Ads", "9:16 (master)", "1:1 and 16:9"],
];

export const EDITING_PIPELINE: [string, string][] = [
  ["Ingest & Editing Report", "Import raw footage · label clips by Script ID · log takes in camera-roll order"],
  ["Rough Cut", "Assemble best takes · follow script / storyboard · target duration"],
  ["Fine Cut", "Trim frames · pacing & rhythm · add transitions · music bed"],
  ["Graphics & Motion", "Lower thirds · kinetic text · logo animation · motion templates"],
  ["Colour Grade", "Primary grade · LUT application · brand colour consistency"],
  ["Audio Mix", "Dialogue levelling · music fade · SFX layering · loudness -14 LUFS · final peak -5 to -2 dB"],
  ["Captions", "Auto-generate · proof-read · brand font · position & size per format"],
  ["Export", "Format-specific export · file naming per convention · upload to shared drive"],
];

export const EXPORT_SPECS: [string, string, string, string, string][] = [
  ["Ads (9×16)", "H.264", "1080×1920", "25", "8–15 Mbps"],
  ["Course (9×16)", "H.264", "1080×1920", "25", "8 Mbps"],
  ["Organic (16×9)", "H.264", "1920×1080", "25", "10–20 Mbps"],
  ["Org. Shorts", "H.264", "1080×1920", "25", "8 Mbps"],
];

export const FORMATS: { name: string; purpose: string; spec: string; res: string; br: string }[] = [
  { name: "Ads", purpose: "Paid promotion across all brands. Hook within 3 seconds.", spec: "9×16 master + derived 1:1 and 16:9 · 15–90 sec", res: "1080×1920", br: "8–15 Mbps" },
  { name: "Course", purpose: "Educational short-form content published exclusively on AI TV App. One course = multiple episodes.", spec: "9×16 vertical · 3–12 min", res: "1080×1920", br: "8 Mbps" },
  { name: "Organic", purpose: "Long-form organic content for YouTube, website embeds, brand awareness.", spec: "16×9 landscape · 5–30 min", res: "1920×1080", br: "10–20 Mbps" },
  { name: "Organic Shorts", purpose: "Short awareness-first content for YT Shorts, IG Reels, FB Reels.", spec: "9×16 vertical · 15–90 sec", res: "1080×1920", br: "8 Mbps" },
];

export const ADS_PHASES: [string, string, string][] = [
  ["HOOK", "0–3 sec", "Pattern interrupt, big claim, or curiosity gap. If they don't stop scrolling in 3 seconds, the ad is dead."],
  ["BUILD", "3–15 sec", "Set up the problem or promise. Tease the value to keep them watching past 15 seconds."],
  ["BODY", "15–35 sec", "Core message — demo, social proof, transformation, USP. This is where conversion is earned."],
  ["CTA", "last 3–5 sec", "Single clear CTA — verbal + on-screen text. 5-sec outro is mandatory at the end of every ad."],
];

export const ORG_PHASES: [string, string, string][] = [
  ["INTRO & HOOK", "0–30 sec", "Open with the promise of the video. Tell the viewer what they will gain and give them a reason to stay."],
  ["CONTEXT", "30 sec – 2 min", "Frame the topic — why it matters, who it is for, and what the video will cover."],
  ["MAIN CONTENT", "2 min – last 2 min", "The core value, delivered in clear segments or chapters. Use B-roll, demos, and on-screen graphics to keep pace."],
  ["RECAP & CTA", "last 1–2 min", "Summarise the key takeaways and end with a clear next step."],
];

export const SHORT_PHASES: [string, string, string][] = [
  ["HOOK", "0–3 sec", "Stop the scroll. A bold visual, a sharp question, or a surprising statement in the first 3 seconds."],
  ["VALUE", "3–45 sec", "Deliver one quick, self-contained idea, tip, or insight. Keep it tight — one short, one point."],
  ["PAYOFF", "45–55 sec", "The takeaway moment — the result, the reveal, or the punchline that makes the short worth sharing."],
  ["SOFT CTA", "last 5 sec", "A light call to action — follow for more, or a loop back to the start. No hard sell."],
];

export const WORK_REPORT: [string, string][] = [
  ["Date", "Date the video was completed"],
  ["Video ID", "Original video identifier"],
  ["New Video ID", "Renamed file per the naming convention (e.g. AI_P5_AITV001_MP)"],
  ["Video Type", "Talking Head, Motion Graphic, and so on"],
  ["Angle", "The hook or angle of the ad"],
  ["Status", "Todo, In progress, Approved"],
  ["Review Link", "Frame.io review link"],
  ["Final Link", "Google Drive final delivery folder"],
  ["Ratio", "Aspect ratios delivered (16:9, 9:16, 1:1)"],
  ["Editor", "Editor initials"],
  ["Script Doc", "Source script or document"],
  ["Duration", "Finished length (hh:mm:ss)"],
  ["Comments", "Notes, revisions or blockers"],
];

export const COMPANY = {
  about:
    "House of EdTech is India's fastest-growing multi-brand education company. We build and operate brands that educate working professionals in the skills that matter most — from artificial intelligence and stock-market trading to personal finance and sports analytics. Each brand is purpose-built for a specific domain, with its own expert trainers, dedicated curriculum, and learning community.",
  founders:
    "Co-founded by Aditya Goenka and Aditya Kachave — two operators making practical, career-changing skills accessible to working professionals across India.",
  founderBios: [
    {
      name: "Aditya Goenka",
      tagline: "Turns ambitious visions into scalable realities — powered by AI.",
      bio: "IIT Kharagpur alumnus (Class of 2019) with research stints at Stanford and UIUC. He has built two 8-figure companies using AI tools and a five-person team, and helps others scale without burning out or bloating the team.",
      stats: [
        ["2M+", "Professionals impacted"],
        ["8-figure", "Companies built with a 5-person team"],
        ["3", "Global research internships (Stanford, UIUC, NTU)"],
        ["4.9/5", "Rating"],
      ] as [string, string][],
    },
    {
      name: "Aditya Kachave",
      tagline: "Simplifies complex AI tools to build smart, lean businesses that scale.",
      bio: "IIT Kharagpur alumnus who landed India's highest fresher package (₹1.2 Cr), then built two 8-figure companies with five-member teams. He now mentors others to use AI as their growth partner — multiplying outcomes with half the effort.",
      stats: [
        ["2M+", "Professionals impacted"],
        ["₹1.2 Cr", "India's highest fresher package (IIT-KGP)"],
        ["8-figure", "AI-first companies scaled"],
        ["4.9/5", "Rating"],
      ] as [string, string][],
    },
  ],
  stats: [
    ["₹400 Cr+", "ARR"],
    ["3 Million+", "Paid Learners"],
    ["8", "Brands"],
    ["1200+", "Team Members"],
  ] as [string, string][],
  brands: [
    ["Be10X", "be10x.com", "AI tools workshop"],
    ["AI TV App", "aitv.pro", "AI learning in short, vertical episodes"],
    ["Office Master", "officemaster.in", "Excel using AI"],
    ["AI for Techies", "aifortechies.in", "Python using AI"],
    ["Profit Uni", "profituni.in", "Stock market trading"],
    ["SpringPad", "springpad.in", "Stock market using AI"],
    ["Dr. Finance", "drfinance.in", "Personal finance & mutual funds"],
    ["Divinelane", "divinelane.co", "Gemstones & consultation"],
  ] as [string, string, string][],
};

export const BRAND_TARGETS: { name: string; domain: string; audience: string; approach: string; target: string; tone: string }[] = [
  { name: "Be10X", domain: "be10x.com", audience: "Working professionals who want to use AI to get ahead at work — analysts, managers, and office teams across India.", approach: "Hook-led paid ads and AI tools workshops promising 10X productivity, with strong before/after proof and testimonials.", target: "Workshop sign-ups, then upsell to the Advanced AI mastercourse.", tone: "Premium, futuristic and human — strong type, real people, AI-forward; never cheap or robotic." },
  { name: "AI TV App", domain: "aitv.pro", audience: "Mobile-first learners who want to stay current on AI in minutes, not hours.", approach: "Short, vertical episodes and Shorts/Reels-style content that teach one idea fast.", target: "App installs and subscriptions.", tone: "Snappy and punchy — fast hooks, bold supers, high energy." },
  { name: "Office Master", domain: "officemaster.in", audience: "Office workers and students levelling up Excel and workplace productivity with AI.", approach: "Skill-gap hooks and quick, practical how-tos.", target: "Course sign-ups.", tone: "Clear and practical — clean screen demos, readable supers." },
  { name: "AI for Techies", domain: "aifortechies.in", audience: "Developers and technical professionals learning Python with AI.", approach: "Code-along, demo-driven content that shows real output.", target: "Course enrolment.", tone: "Technical and precise — clean code screens, minimal fluff." },
  { name: "Profit Uni", domain: "profituni.in", audience: "Aspiring and active stock-market traders.", approach: "Market-education hooks and chart breakdowns building credibility.", target: "Trading course and webinar enrolment.", tone: "Confident and data-led — charts, numbers, clear callouts." },
  { name: "SpringPad", domain: "springpad.in", audience: "Young investors learning the stock market with AI.", approach: "Relatable, AI-assisted market content that lowers the barrier to entry.", target: "Course and tool sign-ups.", tone: "Friendly and approachable — relatable framing, clean motion." },
  { name: "Dr. Finance", domain: "drfinance.in", audience: "People building personal-finance and mutual-fund knowledge.", approach: "Finance-education hooks that simplify money decisions.", target: "Personal-finance course enrolment.", tone: "Trustworthy and calm — educational, uncluttered, reassuring." },
  { name: "Divinelane", domain: "divinelane.co", audience: "People seeking gemstones and personalised consultation.", approach: "Trust- and outcome-led storytelling with social proof.", target: "Consultation bookings.", tone: "Warm and premium — soft, trust-building visuals." },
];

const WIKI = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const favicon = (d: string) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;

export type Tool = { name: string; desc: string; icon: string; url?: string };

export const ADOBE_APPS: Tool[] = [
  { name: "Premiere Pro", desc: "Primary editor — cutting, assembly, captions and final export.", icon: WIKI + "Adobe%20Premiere%20Pro%20CC%20icon.svg" },
  { name: "After Effects", desc: "Motion graphics, animated text, logo reveals and visual effects.", icon: WIKI + "Adobe%20After%20Effects%20CC%20icon.svg" },
  { name: "Photoshop", desc: "Image editing, thumbnails and graphic assets.", icon: WIKI + "Adobe%20Photoshop%20CC%20icon.svg" },
  { name: "Audition", desc: "Audio cleanup, noise removal and mixing.", icon: WIKI + "Adobe%20Audition%20CC%20icon.svg" },
  { name: "Media Encoder", desc: "Batch and format-specific exports / encoding.", icon: favicon("adobe.com") },
];

export const PROVIDED_TOOLS: Tool[] = [
  { name: "Higgsfield", desc: "AI image & video generation — for visuals, hooks and scenes when there's no shoot footage.", icon: favicon("higgsfield.ai") },
  { name: "Envato", desc: "Envato Elements — stock footage, music, templates and graphic assets.", icon: "https://cdn.simpleicons.org/envato" },
];

export const COMM_TOOLS: Tool[] = [
  { name: "Keka", desc: "Attendance and HR — clock in and out, apply for leave, raise HR requests and track your shift. Mark attendance every working day.", icon: favicon("keka.com"), url: "https://app.keka.com" },
  { name: "Slack", desc: "Day-to-day communication and workflow — pod channels, DMs, task hand-offs and announcements. Keep notifications on during work hours and reply in-thread to keep context.", icon: favicon("slack.com"), url: "slack://open" },
  { name: "Frame.io", desc: "Review platform — upload every cut here, read and resolve each timestamped comment, and manage versions. Paste the review link into your work report.", icon: favicon("frame.io"), url: "https://app.frame.io" },
];

// An ad task type. Optional fields render extra content under the description:
//  - note: a highlighted callout (e.g. the Outro/CTA update rule)
//  - workflow: a step pipeline shown as an arrow chain; a step that is an array
//    of strings renders its items as alternatives (an "or" branch)
//  - videos: sample YouTube Shorts shown as embeds; each may carry a label
//  - comparisons: before/after Shorts pairs shown side by side
export type SampleVideo = { id: string; label?: string };
export type VideoComparison = { label: string; before: string; after: string };
export type AdTaskType = {
  name: string;
  desc: string;
  note?: string;
  workflow?: (string | string[])[];
  videos?: SampleVideo[];
  comparisons?: VideoComparison[];
};

export const AD_TASK_TYPES: AdTaskType[] = [
  {
    name: "New ads (raw / HeyGen)",
    desc: "Fresh ads cut from raw shoot footage, or built with HeyGen AI avatars when there's no shoot.",
    workflow: ["Script", ["Shoot — raw footage", "AI avatar — HeyGen + ElevenLabs"], "Editing", "Final delivery"],
    videos: [
      { id: "u4vnzLw9rU0", label: "AI avatar — HeyGen generated" },
      { id: "YYIVW9VGUeg", label: "Raw footage" },
    ],
  },
  {
    name: "Rehash",
    desc: "A re-edit of an existing ad — restructured or refreshed from the same assets to extend its life.",
    note: "Always update the outro to the new version of the Outro / CTA — never carry over the old endscreen from the source ad.",
    comparisons: [
      { label: "Sample 1", before: "NZGlDSI-FOw", after: "XY03n55moSU" },
      { label: "Sample 2", before: "LyRH_wBdCGU", after: "YqRe79SA9fc" },
    ],
  },
  {
    name: "Motion graphic",
    desc: "An ad built primarily from motion graphics and animated text rather than footage.",
    videos: [{ id: "4gYP-z5zZQA" }, { id: "KRqfMNpLW2Y" }, { id: "Db0hSMXC4Fg" }],
  },
  {
    name: "Hook change",
    desc: "Swapping only the opening hook of an existing ad to test new openings while keeping the body.",
    note: "Even when only the hook changes, update the outro to the new version of the Outro / CTA — never leave the old endscreen on the ad.",
    comparisons: [
      { label: "Sample 1", before: "Nb-QUxvcswQ", after: "ZJYcg2Vw4y0" },
      { label: "Sample 2", before: "EEZPyE97-7s", after: "Eh9e9J27MlI" },
    ],
  },
];

// Day 3 tool walkthroughs — keyed by session name. Most tools have a tutorial
// video; `video` is optional so a tool can be listed without one.
export type ToolWithVideo = { name: string; desc: string; video?: string; url?: string; sop?: string };

export const DAY3_SECTIONS: Record<string, ToolWithVideo[]> = {
  "Stock & assets": [
    { name: "Mr Horse", desc: "Mister Horse — a drag-and-drop motion-design plugin for Premiere Pro and After Effects. Its libraries (Premiere Composer / Animation Composer) bundle ready-made transitions, titles, lower-thirds, text animations, overlays and sound effects you drop straight onto the timeline.", url: "misterhorse.com" },
    { name: "Magnific", desc: "Freepik's AI image generation and upscaling, plus the Freepik library of stock graphics, vectors and photos. Search by style, customise, and download — always check usage rights.", video: "lGHW4CR2HfA", url: "magnific.com" },
    { name: "Flaticon", desc: "Millions of icons across many styles. Pick one consistent style per video, customise colour and size, and export SVG or PNG.", video: "wPbg4kAqopM", url: "flaticon.com" },
    { name: "Envato", desc: "Envato Elements — one subscription for stock footage, music, motion templates, graphics and SFX. The go-to for B-roll and template-based motion.", video: "Q6audyAUjEM", url: "elements.envato.com" },
    { name: "Storyblocks", desc: "Royalty-free music, stock video and sound effects on an unlimited plan — handy for background tracks and quick B-roll.", video: "NA0EyFp-h3U", url: "storyblocks.com" },
    { name: "Storyblocks in Premiere Pro", desc: "Browse and download Storyblocks stock footage, music and SFX without leaving Adobe Premiere Pro. Install the Storyblocks panel, search and preview clips on the timeline, then download and place them directly into your sequence — a faster B-roll and audio workflow.", video: "fFHcUPZm7l8", url: "storyblocks.com" },
    { name: "Earn Edits", desc: "Downloadable After Effects project files (AEP) built from proven viral edits — fully editable compositions with neatly labelled layers, built-in colour controls and suggested SFX/music. Customise the text, colours and timing to ship high-impact short-form reels fast.", url: "earnedits.com" },
  ],
  "Content & prompt engineering": [
    { name: "Claude", desc: "Anthropic's AI assistant — strong at long-form scripting, ideation, rewriting and following detailed instructions. Use it to draft scripts, hooks and angles.", video: "r2vYObllqJU", url: "claude.ai" },
    { name: "ChatGPT (GPT)", desc: "OpenAI's versatile assistant for scripts, hooks, copy and quick research — great for brainstorming variations fast.", video: "gi6o2yYWrzw", url: "chatgpt.com" },
    { name: "Prompt engineering", desc: "Writing clear, structured prompts — role, context, references, format and constraints — to get clean, usable output the first time.", video: "ysPbXH0LpIE" },
  ],
  "AI generation": [
    { name: "HeyGen", desc: "AI video and talking-head avatar generation from a script — used when there's no shoot footage. Pick an avatar and voice, paste the script, and generate.", video: "bcXeQAguN7s", url: "heygen.com" },
    { name: "Higgsfield", desc: "AI image and video generation for hooks, scenes and VFX, with control over motion and a cinematic look.", video: "R7GZjRMsrzM", url: "higgsfield.ai" },
    { name: "Higgsfield in Premiere Pro", desc: "Generate Higgsfield AI image and video without leaving Adobe Premiere Pro. Use the Higgsfield panel to prompt, generate and preview hooks, scenes and VFX, then place the result straight onto your timeline — a faster generate-to-edit workflow.", video: "r7HD-SEMQ7E", url: "higgsfield.ai" },
    { name: "Envato", desc: "Beyond stock, Envato's AI generation tools turn a text prompt into usable images and video — generate AI visuals, hooks and scenes, then drop them straight into the edit alongside its huge template and asset library.", video: "0BHzNjCjROE", url: "elements.envato.com" },
  ],
  "Audio & sound": [
    { name: "ElevenLabs", desc: "AI voice-over and text-to-speech with natural, multilingual voices and voice cloning. Generate clean VO straight from a script.", video: "BRJdL3QJpxQ", url: "elevenlabs.io", sop: "https://docs.google.com/document/d/1wZaZFUm7-IGsKz1015sRlqrGez9D9Ji1ZB3KeRdcsDY/edit?tab=t.0" },
  ],
  "Draftdeck": [
    { name: "Draftdeck", desc: "House of EdTech's own web app that runs the whole script-to-video pipeline in one place. Create a project, pick an AI model (Claude / Anthropic), and use the AI Script Writer with reusable Skills (e.g. ad-script-generator) to draft and approve a script. Then configure the voice-over through the ElevenLabs integration — choosing from the team's own professional voice clones with stability, style, similarity and speed controls and saved audio presets — and generate the avatar video through HeyGen, picking the engine (Avatar III/IV/V), character and look. Organise everything into projects and folders, track usage with credits, and also handle translations and brand assets. The single tool that takes a no-shoot ad from script to finished avatar video.", video: "Gg9HilZL3IU", url: "draftdeck.houseofedtech.in" },
  ],
  "Motion graphics": [
    { name: "AutoAE", desc: "Online After Effects alternative for motion graphics — generate text animations, 3D transforms, engagement mockups and video flowcharts in a few clicks, then download and drop the snippet into your edit. Fast motion design without keyframing from scratch.", video: "KrJiAUgTiXw", url: "autoae.online" },
    { name: "Jitter", desc: "Browser-based motion graphics tool for animated text, lower-thirds and elements — fast templates with clean export.", video: "4QJfDMl3YS8", url: "jitter.video" },
    { name: "Descript", desc: "Transcript-based audio and video editor — edit by editing the text, remove filler words and silences automatically, and clean up voice-over with Overdub and Studio Sound. Handy for fast rough cuts and talking-head edits.", video: "D5MQbP4b_sQ", url: "descript.com" },
    { name: "ATOM", desc: "AI assistant for After Effects — write expressions, automate scripts and build complex rigs using plain natural language instead of code. Speeds up the technical side of motion graphics.", url: "tryatom.ai" },
    { name: "Claude + Remotion", desc: "Generate and refine Remotion (React) code with Claude (claude.ai), then render templated, code-driven motion graphics straight to MP4 with Remotion — ideal for data-driven, programmatic graphics.", video: "IkKYuygHzn4", url: "remotion.dev" },
  ],
};

export const CREATIVE_TEAMS: { name: string; items: string[] }[] = [
  { name: "Content Creation", items: ["Script writing & ideation", "Hook development", "Storyboarding", "Trend research", "Script ID assignment"] },
  { name: "Video Production", items: ["Camera operation", "Lighting setup", "On-set direction", "Audio recording", "B-roll capture"] },
  { name: "AI Generalist", items: ["AI voiceovers & avatars", "AI image generation", "AI video for the hook", "AI scenes per script", "Owns prep for no-shoot scripts"] },
  { name: "Video Editing", items: ["Rough & fine cut", "Motion graphics & colour grade", "Audio mixing", "Captions & subtitles", "AI video if needed"] },
  { name: "Digital Media", items: ["Platform scheduling", "Ad campaign setup", "Analytics & reporting", "A/B testing", "Community management"] },
];

export const INCENTIVE_FACTORS: [string, string][] = [
  ["Deliverables amount", "The volume of completed, delivered outputs."],
  ["Duration of outputs", "The total finished output produced, weighted by how complex the work is."],
  ["Quality", "The QC rating — clean first-pass work earns full value, heavy rework reduces it."],
  ["Behaviour", "Professionalism and ownership — how you show up, collaborate within the pod, and follow process."],
  ["Responsiveness", "How quickly you reply on Slack, pick up assigned work, and turn around revisions."],
];
