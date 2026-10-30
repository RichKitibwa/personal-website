// Single source of truth for personal details. Used by the site, the resume
// page (/resume) and structured data. Edit here, not in components.

export const profile = {
  name: "Rich Kitibwa",
  role: "Software & Product Engineer",
  positioning:
    "Software engineer working across many domains, such as healthcare, AI, sport, enterprise and media.",
  headline: "I build whole products for all kinds of users: clinicians, sports fans, procurement teams and more.",
  intro:
    "I'm Rich Kitibwa, a software engineer who builds whole products: backend, frontend, deployment, CI/CD and debugging. I work on clinical decision-support software piloted in Uganda (with a pilot under way in Zambia), a medical knowledge platform, a respiratory screening device, an enterprise procurement system and a sports streaming platform.",
  location: "Kampala, Uganda",
  availability:
    "Open to new roles, projects and collaborations, remote or international.",
  email: "richkitibwa@gmail.com",
  // Shown on the downloadable resume only, never on web pages.
  phone: "+256 754 145 656",
  links: {
    linkedin: "https://www.linkedin.com/in/kitibwa-rich",
    github: "https://github.com/RichKitibwa",
    devto: "https://dev.to/richkitibwa",
  },
  portrait: {
    src: "/images/portrait.jpg",
    // PLACEHOLDER: replace with a professional portrait (min. 1200px, 4:5 crop).
    alt: "Portrait of Rich Kitibwa",
  },
  resumePath: "/resume/Rich-Kitibwa-Resume.pdf",
} as const;

export type Profile = typeof profile;
