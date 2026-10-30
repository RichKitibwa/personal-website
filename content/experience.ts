// Professional timeline. Only confirmed roles and dates — see README before editing.

export type Role = {
  org: string;
  href?: string;
  title: string;
  type: "Current" | "Earlier";
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  projects?: string[]; // project slugs
};

export const experience: Role[] = [
  {
    org: "MamaOpe Medicals",
    href: "https://www.mamaope.com/",
    title: "Software Engineer — Full-Stack, AI/ML, Signal Processing & QA",
    type: "Current",
    period: "Feb 2021 – Present",
    location: "Kampala, Uganda",
    summary:
      "Healthtech company building AI-powered clinical decision support and a respiratory screening device for frontline health workers.",
    highlights: [
      "Engineer on HealthNavi, a clinical decision-support system piloted in Uganda, where it was evaluated with 168 patients across five Kampala facilities. A pilot in Zambia is under way.",
      "Built retrieval and model-service infrastructure for Empirico, a medical knowledge platform: document ingestion, embeddings, vector search and LLM integration.",
      "Worked across hardware prototyping, MATLAB respiratory signal processing and Android development for the MamaOpe auscultation device.",
      "Co-author of the published performance evaluation of the MamaOpe CDSS (VeriXiv, 2026).",
      "Introduced testing, debugging and QA practices to improve reliability of clinical software.",
    ],
    projects: ["healthnavi", "empirico", "mamaope-device"],
  },
  {
    org: "Ascension Services",
    href: "https://ascensionservices.net/",
    title: "Software Engineer",
    type: "Current",
    period: "May 2025 – Present",
    summary: "Enterprise procurement and operations platform.",
    highlights: [
      "Full-stack work across a FastAPI backend and Next.js frontend: purchase orders, approvals, supplier workflows and subscriptions.",
      "Background processing with Celery and Redis, PostgreSQL migrations, Docker deployment and CI/CD.",
    ],
    projects: ["ascension-procurement"],
  },
  {
    org: "Bench Sports Media",
    href: "https://benchsports.com/",
    title: "Software Engineer",
    type: "Current",
    period: "Mar 2026 – Present",
    summary: "Sports streaming platform for teams, leagues and creators.",
    highlights: [
      "Built pay-per-view, subscriber access and Stripe Connect checkout flows.",
      "Live streaming, live chat and tipping across web and the Expo/React Native mobile app; App Store and Google Play release work.",
    ],
    projects: ["bench-sports"],
  },
  {
    org: "Powem",
    href: "https://powem.co/",
    title: "Software Engineer",
    type: "Earlier",
    period: "Jun 2019 – May 2020",
    location: "Nairobi, Kenya (remote)",
    summary: "Software studio building community-focused software and helping entrepreneurs bring ideas to life.",
    highlights: [
      "Early-stage engineering: building, testing and maintaining React web applications in a small, agile team.",
    ],
  },
  {
    org: "Lancet Laboratories",
    title: "Medical Laboratory Technologist",
    type: "Earlier",
    period: "Aug 2018 – Feb 2021",
    location: "Kampala, Uganda",
    summary: "Clinical diagnostic laboratory.",
    highlights: [
      "Diagnostic testing across chemistry, haematology and microbiology under rigorous quality control.",
      "The foundation for my work in health technology: how clinical data is produced, and what makes it trustworthy.",
    ],
  },
];

export const education = [
  {
    institution: "Makerere University",
    award: "BSc Biomedical Laboratory Technology",
    period: "Graduated Jan 2022",
    location: "Kampala, Uganda",
  },
];

export const certifications = [
  {
    name: "Introduction to Computer Science and Programming Using Python",
    issuer: "MITx (edX)",
    date: "Mar 2024",
    href: "https://courses.edx.org/certificates/eba33361fb6246edb97a64d3c691b83b",
  },
  {
    name: "Introduction to Computational Thinking and Data Science",
    issuer: "MITx (edX)",
    date: "May 2024",
    href: "https://courses.edx.org/certificates/1a64f804fe894d59962c8f6863c69d40",
  },
];

export const publications = [
  {
    title:
      "Performance Evaluation of a Clinical Decision Support System (MAMAOPE AI) for Tuberculosis and Pneumonia Diagnosis",
    authors: "Babirye S, Turyabagye B, Tigist M, et al. (incl. Kitibwa R)",
    venue: "VeriXiv 3:147 (preprint)",
    date: "Apr 2026",
    href: "https://doi.org/10.12688/verixiv.2433.1",
  },
];
