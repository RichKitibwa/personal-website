// Capabilities are grouped by the kind of problem they solve, with the
// projects that evidence them. Technology levels are deliberately honest.

export const capabilities = [
  {
    id: "systems",
    title: "Problem solving & systems thinking",
    body: "Breaking big, messy problems into clear requirements and systems that can actually be built, from hospital workflows to purchase approvals.",
    projects: ["healthnavi", "ascension-procurement"],
  },
  {
    id: "product",
    title: "Software & product engineering",
    body: "Full-stack web and mobile products: frontends, APIs, databases, payments and releases to the App Store and Google Play.",
    projects: ["bench-sports", "ascension-procurement", "healthnavi"],
  },
  {
    id: "ai",
    title: "Applied AI & retrieval",
    body: "AI features that answer from real sources: RAG, embeddings, vector and hybrid search, LLM integration, and checking answers against trusted references.",
    projects: ["empirico", "healthnavi"],
  },
  {
    id: "enterprise",
    title: "Enterprise & business workflows",
    body: "Turning approvals, purchase orders, subscriptions and tax rules into software people can rely on and check.",
    projects: ["ascension-procurement"],
  },
  {
    id: "biomed",
    title: "Biomedical technology & research",
    body: "My lab background, put to work on a medical device, breathing-sound analysis and a published clinical study.",
    projects: ["mamaope-device", "healthnavi"],
  },
  {
    id: "quality",
    title: "Quality, reliability & delivery",
    body: "Testing, debugging, CI/CD, Docker deployment, rate limiting and caching. Making systems work in real use, not just in demos.",
    projects: ["empirico", "bench-sports"],
  },
] as const;

export type Level = "Daily driver" | "Working knowledge" | "Familiar";

export const technologies: { name: string; group: string; level: Level }[] = [
  { name: "Python", group: "Languages", level: "Daily driver" },
  { name: "TypeScript", group: "Languages", level: "Daily driver" },
  { name: "JavaScript", group: "Languages", level: "Daily driver" },
  { name: "Java", group: "Languages", level: "Working knowledge" },
  { name: "Kotlin", group: "Languages", level: "Working knowledge" },
  { name: "MATLAB", group: "Languages", level: "Working knowledge" },
  { name: "PHP", group: "Languages", level: "Familiar" },

  { name: "React", group: "Frontend & mobile", level: "Daily driver" },
  { name: "Next.js", group: "Frontend & mobile", level: "Daily driver" },
  { name: "React Native / Expo", group: "Frontend & mobile", level: "Working knowledge" },
  { name: "Android (Java/Kotlin)", group: "Frontend & mobile", level: "Working knowledge" },
  { name: "Vue", group: "Frontend & mobile", level: "Familiar" },

  { name: "FastAPI", group: "Backend", level: "Daily driver" },
  { name: "Flask", group: "Backend", level: "Working knowledge" },
  { name: "Node.js", group: "Backend", level: "Working knowledge" },
  { name: "Celery", group: "Backend", level: "Working knowledge" },
  { name: "Spring Boot", group: "Backend", level: "Familiar" },
  { name: "Django", group: "Backend", level: "Familiar" },
  { name: "Laravel", group: "Backend", level: "Familiar" },

  { name: "RAG pipelines", group: "AI & data", level: "Daily driver" },
  { name: "LLM integration (Gemini, OpenAI)", group: "AI & data", level: "Daily driver" },
  { name: "Embeddings & vector search", group: "AI & data", level: "Daily driver" },
  { name: "Zilliz / Milvus", group: "AI & data", level: "Working knowledge" },
  { name: "Signal processing", group: "AI & data", level: "Working knowledge" },
  { name: "Pandas / NumPy", group: "AI & data", level: "Working knowledge" },

  { name: "PostgreSQL", group: "Data & infrastructure", level: "Daily driver" },
  { name: "Docker", group: "Data & infrastructure", level: "Daily driver" },
  { name: "Redis", group: "Data & infrastructure", level: "Working knowledge" },
  { name: "MongoDB", group: "Data & infrastructure", level: "Familiar" },
  { name: "AWS (S3, EC2)", group: "Data & infrastructure", level: "Working knowledge" },
  { name: "Google Cloud", group: "Data & infrastructure", level: "Working knowledge" },
  { name: "DigitalOcean", group: "Data & infrastructure", level: "Working knowledge" },
  { name: "Vercel / Dokploy", group: "Data & infrastructure", level: "Working knowledge" },
  { name: "CI/CD (GitHub Actions, Jenkins)", group: "Data & infrastructure", level: "Working knowledge" },

  { name: "Stripe Connect", group: "Integrations", level: "Working knowledge" },
  { name: "Mux video", group: "Integrations", level: "Working knowledge" },
  { name: "HL7 FHIR", group: "Integrations", level: "Familiar" },
];
