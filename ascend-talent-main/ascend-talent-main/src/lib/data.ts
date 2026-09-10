export type Freelancer = {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  projects: number;
  rate: number;
  score: number;
  successRate: number;
  responseRate: number;
  repeatClients: number;
  earnings: number;
  deliveryDays: number;
  availability: "Available now" | "Limited" | "Booked";
  experience: "Beginner" | "Intermediate" | "Expert";
  category: string;
  skills: string[];
  badges: string[];
  about: string;
  accent: string;
  portfolio: {
    title: string;
    category: string;
    blurb: string;
    tags: string[];
    result: string;
  }[];
  reviewsList: { client: string; rating: number; text: string; project: string }[];
  experienceList: { role: string; org: string; period: string }[];
  services: { name: string; price: number; delivery: string }[];
};

const f = (
  id: string,
  name: string,
  title: string,
  location: string,
  category: string,
  rating: number,
  reviews: number,
  projects: number,
  rate: number,
  score: number,
  skills: string[],
  accent: string,
  extra: Partial<Freelancer> = {},
): Freelancer => ({
  id,
  name,
  title,
  location,
  category,
  rating,
  reviews,
  projects,
  rate,
  score,
  skills,
  accent,
  successRate: Math.min(99, 82 + Math.round(score / 8)),
  responseRate: Math.min(100, 80 + Math.round(score / 6)),
  repeatClients: Math.round(projects * 0.32),
  earnings: projects * rate * 26,
  deliveryDays: 4 + (projects % 7),
  availability: projects % 3 === 0 ? "Limited" : "Available now",
  experience: projects > 140 ? "Expert" : projects > 60 ? "Intermediate" : "Beginner",
  badges: ["Top Rated", "On-Time Pro", "Client Favorite"].slice(0, 1 + (projects % 3)),
  about: `${name} is a ${title.toLowerCase()} based in ${location}, partnering with founders and product teams to ship work that performs. Over ${projects} completed engagements, the focus has stayed the same: clear communication, sharp craft, and outcomes clients can measure.`,
  portfolio: [
    {
      title: "E-Commerce Experience Redesign",
      category: category,
      blurb:
        "Rebuilt an outdated storefront into a conversion-focused interface with a modular design system.",
      tags: skills.slice(0, 3),
      result: "+38% checkout conversion",
    },
    {
      title: "Product Launch Platform",
      category: category,
      blurb: "End-to-end build for a Series A launch, from brand system to production release.",
      tags: skills.slice(1, 4),
      result: "12k signups in week one",
    },
    {
      title: "Internal Operations Suite",
      category: category,
      blurb: "Designed and shipped a workflow tool replacing six spreadsheets and a manual queue.",
      tags: skills.slice(0, 2),
      result: "9 hrs/week saved per team",
    },
  ],
  reviewsList: [
    {
      client: "Nova Retail",
      rating: 5,
      text: "Excellent communication and delivered the project ahead of schedule. Would hire again without hesitation.",
      project: "Storefront rebuild",
    },
    {
      client: "Halcyon Labs",
      rating: 5,
      text: "Understood the brief immediately and pushed back where it mattered. Rare combination of speed and taste.",
      project: "Design system",
    },
    {
      client: "Fieldnote",
      rating: 4,
      text: "Strong work and very responsive. Minor scope slip mid-project but handled it transparently.",
      project: "Marketing site",
    },
  ],
  experienceList: [
    { role: "Independent " + title, org: "Freelance", period: "2021 — Present" },
    { role: "Senior " + title, org: "Northbeam Studio", period: "2018 — 2021" },
  ],
  services: [
    { name: "Discovery sprint", price: rate * 12, delivery: "1 week" },
    { name: "Full project build", price: rate * 40, delivery: "3–5 weeks" },
    { name: "Ongoing retainer", price: rate * 60, delivery: "Monthly" },
  ],
  ...extra,
});

export const freelancers: Freelancer[] = [
  f("aarav-sharma", "Aarav Sharma", "Full Stack Developer", "Bengaluru, IN", "Development & IT", 4.98, 214, 248, 45, 98, ["React", "Next.js", "Node.js", "MongoDB"], "from-violet-500 to-indigo-500"),
  f("sarah-lindqvist", "Sarah Lindqvist", "UI/UX Designer", "Stockholm, SE", "Design & Creative", 4.95, 186, 173, 35, 96, ["Figma", "Design Systems", "Prototyping", "Webflow"], "from-sky-500 to-cyan-400"),
  f("alex-moreau", "Alex Moreau", "Full Stack Developer", "Lyon, FR", "Development & IT", 4.92, 160, 152, 48, 94, ["TypeScript", "Postgres", "AWS", "Remix"], "from-fuchsia-500 to-violet-500"),
  f("mina-okafor", "Mina Okafor", "Motion Designer", "Lagos, NG", "Video & Audio", 4.9, 121, 118, 30, 92, ["After Effects", "Cinema 4D", "Rive", "Sound Design"], "from-amber-400 to-orange-500"),
  f("daniel-ruiz", "Daniel Ruiz", "AI Engineer", "Madrid, ES", "AI & Automation", 4.89, 98, 96, 62, 91, ["LLM Ops", "Python", "RAG", "Vector DBs"], "from-emerald-400 to-teal-500"),
  f("hana-sato", "Hana Sato", "Brand Designer", "Tokyo, JP", "Design & Creative", 4.88, 140, 131, 40, 90, ["Identity", "Typography", "Art Direction", "Packaging"], "from-rose-400 to-pink-500"),
  f("noah-berg", "Noah Berg", "Growth Marketer", "Berlin, DE", "Marketing", 4.85, 112, 104, 38, 88, ["Paid Social", "SEO", "Lifecycle", "Analytics"], "from-lime-400 to-emerald-500"),
  f("priya-nair", "Priya Nair", "Data Analyst", "Kochi, IN", "Data & Analytics", 4.84, 76, 71, 33, 87, ["SQL", "dbt", "Looker", "Python"], "from-cyan-400 to-blue-500"),
  f("tomas-varga", "Tomas Varga", "3D Artist", "Prague, CZ", "3D & Animation", 4.82, 64, 58, 42, 85, ["Blender", "Substance", "Houdini", "Unreal"], "from-indigo-400 to-purple-500"),
  f("elena-costa", "Elena Costa", "Content Strategist", "Lisbon, PT", "Writing & Content", 4.8, 90, 88, 28, 84, ["Editorial", "SEO Writing", "Messaging", "Docs"], "from-orange-400 to-rose-500"),
  f("jonas-weber", "Jonas Weber", "Mobile Engineer", "Zurich, CH", "Development & IT", 4.79, 70, 66, 52, 83, ["Swift", "Kotlin", "React Native", "CI/CD"], "from-blue-500 to-indigo-600"),
  f("amara-diallo", "Amara Diallo", "Business Consultant", "Dakar, SN", "Business & Consulting", 4.77, 54, 49, 55, 82, ["Ops Strategy", "Pricing", "Fundraising", "GTM"], "from-teal-400 to-cyan-600"),
];

export const categories = [
  { name: "AI & Automation", desc: "LLM apps, agents, workflow automation", count: 1240, from: 40, icon: "Sparkles" },
  { name: "Development & IT", desc: "Web, mobile, infrastructure, DevOps", count: 3820, from: 25, icon: "Code2" },
  { name: "Design & Creative", desc: "Product design, brand systems, illustration", count: 2960, from: 22, icon: "PenTool" },
  { name: "Marketing", desc: "Growth, paid media, lifecycle, SEO", count: 1730, from: 20, icon: "TrendingUp" },
  { name: "Video & Audio", desc: "Editing, motion, sound, podcasts", count: 1180, from: 18, icon: "Clapperboard" },
  { name: "Writing & Content", desc: "Editorial, docs, scripts, copywriting", count: 1460, from: 15, icon: "Feather" },
  { name: "Business & Consulting", desc: "Strategy, finance, operations", count: 820, from: 35, icon: "Briefcase" },
  { name: "Data & Analytics", desc: "Pipelines, dashboards, modelling", count: 940, from: 28, icon: "BarChart3" },
  { name: "3D & Animation", desc: "Modelling, product renders, rigging", count: 610, from: 30, icon: "Boxes" },
  { name: "Photography", desc: "Product, lifestyle, retouching", count: 480, from: 24, icon: "Camera" },
];

export type Project = {
  id: string;
  title: string;
  company: string;
  description: string;
  budgetLow: number;
  budgetHigh: number;
  type: "Fixed Price" | "Hourly";
  skills: string[];
  applications: number;
  posted: string;
  level: "Beginner" | "Intermediate" | "Expert";
  category: string;
  duration: string;
};

export const projects: Project[] = [
  {
    id: "restaurant-site",
    title: "Build a modern restaurant website",
    company: "Ember & Oak",
    description:
      "We need a fast, elegant marketing site with online reservations, a seasonal menu section, and a simple CMS the team can update weekly.",
    budgetLow: 500,
    budgetHigh: 900,
    type: "Fixed Price",
    skills: ["Next.js", "UI/UX", "Tailwind CSS"],
    applications: 14,
    posted: "2 hours ago",
    level: "Intermediate",
    category: "Development & IT",
    duration: "2–3 weeks",
  },
  {
    id: "ai-support-agent",
    title: "AI support agent trained on our docs",
    company: "Halcyon Labs",
    description:
      "Retrieval-augmented assistant over 400 help articles, with escalation to human agents and analytics on unresolved questions.",
    budgetLow: 3000,
    budgetHigh: 6000,
    type: "Fixed Price",
    skills: ["Python", "RAG", "LLM Ops"],
    applications: 27,
    posted: "5 hours ago",
    level: "Expert",
    category: "AI & Automation",
    duration: "4–6 weeks",
  },
  {
    id: "brand-system",
    title: "Brand identity system for a fintech launch",
    company: "Northlane",
    description:
      "Full identity: wordmark, type scale, colour system, motion principles, and a 40-page guideline document.",
    budgetLow: 4000,
    budgetHigh: 7500,
    type: "Fixed Price",
    skills: ["Identity", "Typography", "Art Direction"],
    applications: 31,
    posted: "1 day ago",
    level: "Expert",
    category: "Design & Creative",
    duration: "5 weeks",
  },
  {
    id: "product-video",
    title: "60-second animated product explainer",
    company: "Fieldnote",
    description:
      "Script is written. Need storyboard, animation, sound design, and three social cutdowns in vertical format.",
    budgetLow: 45,
    budgetHigh: 70,
    type: "Hourly",
    skills: ["After Effects", "Motion", "Sound Design"],
    applications: 9,
    posted: "1 day ago",
    level: "Intermediate",
    category: "Video & Audio",
    duration: "3 weeks",
  },
  {
    id: "analytics-stack",
    title: "Set up a modern analytics stack",
    company: "Cadence Health",
    description:
      "Warehouse modelling with dbt, event tracking plan, and three executive dashboards. HIPAA-aware handling required.",
    budgetLow: 60,
    budgetHigh: 95,
    type: "Hourly",
    skills: ["dbt", "SQL", "Looker"],
    applications: 12,
    posted: "2 days ago",
    level: "Expert",
    category: "Data & Analytics",
    duration: "6 weeks",
  },
  {
    id: "mobile-app",
    title: "React Native app for a running club",
    company: "Pacemakers",
    description:
      "Route tracking, group challenges, and push notifications. Design files are ready in Figma.",
    budgetLow: 5000,
    budgetHigh: 9000,
    type: "Fixed Price",
    skills: ["React Native", "Maps", "CI/CD"],
    applications: 19,
    posted: "3 days ago",
    level: "Intermediate",
    category: "Development & IT",
    duration: "8 weeks",
  },
  {
    id: "lifecycle-email",
    title: "Lifecycle email programme rebuild",
    company: "Verdant",
    description:
      "Rewrite onboarding, winback, and upgrade flows. Needs copy, segmentation logic, and an experiment roadmap.",
    budgetLow: 1800,
    budgetHigh: 3200,
    type: "Fixed Price",
    skills: ["Lifecycle", "Copywriting", "Analytics"],
    applications: 8,
    posted: "4 days ago",
    level: "Intermediate",
    category: "Marketing",
    duration: "3 weeks",
  },
  {
    id: "3d-renders",
    title: "3D product renders for a hardware launch",
    company: "Atelier Nine",
    description:
      "Eight hero renders plus a looping turntable animation of a desk lamp, studio lighting, photoreal finish.",
    budgetLow: 2200,
    budgetHigh: 4000,
    type: "Fixed Price",
    skills: ["Blender", "Substance", "Lighting"],
    applications: 16,
    posted: "5 days ago",
    level: "Expert",
    category: "3D & Animation",
    duration: "4 weeks",
  },
];

export const stats = [
  { value: 10400, suffix: "+", label: "Freelancers" },
  { value: 25800, suffix: "+", label: "Projects completed" },
  { value: 150, suffix: "+", label: "Skills covered" },
  { value: 4.8, suffix: "/5", label: "Average rating", decimals: 1 },
];

export const trustedBy = ["NORTHLANE", "Halcyon", "FIELDNOTE", "Cadence", "ATELIER 9", "Verdant"];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const money = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
