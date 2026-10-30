// Portfolio content. Each entry renders a card on /work and a full case study
// at /work/[slug]. Keep claims factual: every metric needs a `source`.

export const categories = [
  { id: "software", label: "Software & Product Engineering" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "enterprise", label: "Enterprise Solutions" },
  { id: "health", label: "Healthcare & Biomedical" },
  { id: "research", label: "Research & Innovation" },
  { id: "mobile-web", label: "Mobile & Web Applications" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type ProjectStatus =
  | "In production"
  | "Piloted in clinics"
  | "Research & development"
  | "In active development";

export type Metric = {
  value: string;
  label: string;
  source: { label: string; href: string };
};

export type Media = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  frame: "browser" | "phone";
};

export type FlowNode = { label: string; detail: string };

export type Project = {
  slug: string;
  name: string;
  org: string;
  headline: string;
  summary: string;
  domain: string;
  categories: CategoryId[];
  status: ProjectStatus;
  engagement: string;
  period?: string;
  featured: boolean;
  accent: string;
  cover?: Media;
  problem: string[];
  context: string[];
  solution: string[];
  architecture?: { title: string; nodes: FlowNode[]; note?: string };
  role: { area: string; items: string[] }[];
  decisions: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  outcomes: string[];
  metrics?: Metric[];
  technologies: string[];
  gallery: Media[];
  links: { label: string; href: string }[];
  learnings: string[];
};

const VERIXIV = {
  label: "Babirye et al., VeriXiv 2026 (preprint)",
  href: "https://doi.org/10.12688/verixiv.2433.1",
};

export const projects: Project[] = [
  {
    slug: "healthnavi",
    name: "HealthNavi",
    org: "MamaOpe Medicals",
    headline:
      "Engineering clinical decision-support software for real-world healthcare environments.",
    summary:
      "A clinician-facing decision-support system that helps health workers assess respiratory illness against evidence-based guidelines at the point of care.",
    domain: "Digital health · Clinical decision support",
    categories: ["health", "ai", "software", "mobile-web", "research"],
    status: "Piloted in clinics",
    engagement: "Core engineer on the MamaOpe product team",
    featured: true,
    accent: "#E8436B",
    cover: {
      src: "/projects/healthnavi-home.jpg",
      alt: "HealthNavi Android app home screen inviting clinicians to assess respiratory symptoms",
      caption: "HealthNavi Android app, version 1.0 (Google Play listing).",
      width: 590,
      height: 1280,
      frame: "phone",
    },
    problem: [
      "Pneumonia and tuberculosis remain leading causes of death in low- and middle-income countries, and their symptoms overlap with each other and with conditions such as bronchitis and asthma.",
      "Frontline clinicians often work with heavy patient loads, limited specialist support and limited diagnostic infrastructure. The gap between published guidelines and bedside practice is widest exactly where the stakes are highest.",
    ],
    context: [
      "HealthNavi is MamaOpe Medicals' clinical software product. It is designed to support clinical judgement, not replace it: the app itself states that it does not provide a medical diagnosis.",
      "HealthNavi is a separate product from Empirico. HealthNavi owns the clinical workflow and user experience; it calls the Empirico model service for knowledge retrieval and AI-generated guidance.",
    ],
    solution: [
      "A conversational, web- and mobile-accessible application in which clinicians enter symptoms, vital signs and routine clinical findings, and receive ranked, guideline-grounded differentials and next-step recommendations with references.",
      "Responses are grounded in curated sources, including the Uganda Clinical Guidelines and the British National Formulary, rather than the language model's general training data.",
      "The system design implements HL7 FHIR R5 resources, ICD-10 and SNOMED CT coding and LOINC mappings so it can integrate with health information systems.",
    ],
    architecture: {
      title: "How a clinical query flows through the system",
      nodes: [
        { label: "HealthNavi app", detail: "React / TypeScript web app and Android client" },
        { label: "HealthNavi backend", detail: "FastAPI · auth · PostgreSQL · chat history" },
        { label: "Empirico model service", detail: "Separate API for retrieval and generation" },
        { label: "Evidence retrieval", detail: "Embeddings + vector search over curated guidelines" },
        { label: "LLM", detail: "Gemini, prompted with retrieved evidence" },
        { label: "Structured response", detail: "Ranked differentials, next steps, references" },
      ],
      note: "HealthNavi calls Empirico as an outside service. They are separate products with separate codebases.",
    },
    role: [
      {
        area: "Application engineering",
        items: [
          "Developed and maintained frontend features in TypeScript/React and backend services in Python/FastAPI.",
          "Implemented clinical workflow features backed by PostgreSQL, including patient-context capture and conversation history.",
        ],
      },
      {
        area: "AI integration",
        items: [
          "Integrated the application with the Empirico model service: request/response workflows, streaming responses and error handling.",
          "Worked on evidence retrieval and context handling so answers carry their supporting references.",
        ],
      },
      {
        area: "Reliability & infrastructure",
        items: [
          "Containerised services with Docker and supported deployments across environments.",
          "Worked on request management, rate limiting and concurrency controls to keep the service responsive under load.",
        ],
      },
      {
        area: "Quality & evaluation",
        items: [
          "Tested application functionality and evaluated the consistency of AI-assisted responses against clinical reference answers.",
          "Co-authored the published performance-evaluation study of the system.",
        ],
      },
    ],
    decisions: [
      {
        title: "Separate the clinical app from the model service",
        body: "Keeping retrieval and generation in Empirico, behind an API, lets the clinical application evolve its workflow independently while the knowledge layer is improved, evaluated and reused by other products.",
      },
      {
        title: "Ground every answer in curated guidelines",
        body: "Retrieval over national and international guidelines makes responses traceable to a source a clinician can check, which is essential for trust in a clinical setting.",
      },
      {
        title: "Support judgement, don't replace it",
        body: "The product is presented as decision support, both in the app and in the study. Outputs are ranked differentials with recommendations, leaving the clinical decision with the clinician.",
      },
    ],
    challenges: [
      {
        title: "Connectivity in low-resource facilities",
        body: "The evaluation identified dependence on connectivity as a barrier and clinicians requested offline functionality. That feedback now shapes the product roadmap.",
      },
      {
        title: "Balancing sensitivity against over-diagnosis",
        body: "The system was tuned for screening: it catches most true cases but flags more patients than clinicians do. Using the first-ranked diagnosis greatly improved agreement with clinicians, pointing to where ranking and calibration work matters most.",
      },
    ],
    outcomes: [
      "Evaluated in a mixed-methods study at five health facilities in Kampala, Uganda (April – May 2025), with 168 symptomatic patients and interviews with 10 clinicians.",
      "High sensitivity and negative predictive value for both TB and pneumonia, supporting use as a screening aid; lower specificity indicated over-diagnosis, which the study reports openly.",
      "Clinicians described the system as fast and intuitive.",
      "Piloted in healthcare settings in Uganda. A pilot in Zambia is under way.",
      "Published on Google Play as an Android app for healthcare professionals.",
    ],
    metrics: [
      { value: "168", label: "symptomatic patients in the evaluation study", source: VERIXIV },
      { value: "92.3%", label: "sensitivity for pneumonia (NPV 95.2%)", source: VERIXIV },
      { value: "89.5%", label: "sensitivity for TB (NPV 97.9%)", source: VERIXIV },
      { value: "5", label: "health facilities in Kampala, Apr – May 2025", source: VERIXIV },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Docker",
      "Gemini",
      "RAG",
      "HL7 FHIR R5",
      "Android",
    ],
    gallery: [
      {
        src: "/projects/healthnavi-home.jpg",
        alt: "HealthNavi home screen with a Start button to assess respiratory symptoms",
        caption: "Home: assess presenting respiratory symptoms in a few minutes.",
        width: 590,
        height: 1280,
        frame: "phone",
      },
      {
        src: "/projects/healthnavi-about.jpg",
        alt: "HealthNavi About screen stating it supports but does not replace clinical judgement",
        caption: "About: clearly presented as support for the clinician's judgement.",
        width: 590,
        height: 1280,
        frame: "phone",
      },
    ],
    links: [
      { label: "Published evaluation study (VeriXiv)", href: "https://verixiv.org/articles/3-147/v1" },
      {
        label: "HealthNavi on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mamaope.healthnavi",
      },
      {
        label: "Grand Challenges Africa: MamaOpeAI grant (2024)",
        href: "https://gcgh.grandchallenges.org/grant/mamaopeai-clinical-decision-support-manage-respiratory-illnesses",
      },
      { label: "MamaOpe Medicals", href: "https://www.mamaope.com/" },
    ],
    learnings: [
      "In clinical software, trust is a feature: references, honest framing and predictable behaviour matter as much as model quality.",
      "Testing in real clinics finds problems no test suite will: connectivity, workflow fit and how clinicians actually read a ranked list.",
    ],
  },
  {
    slug: "empirico",
    name: "Empirico",
    org: "MamaOpe Medicals",
    headline: "Engineering an AI-powered medical knowledge platform.",
    summary:
      "A medical knowledge platform that turns large collections of clinical guidelines and reference documents into searchable, evidence-backed answers for healthcare professionals.",
    domain: "Knowledge engineering · Applied AI",
    categories: ["ai", "health", "software"],
    status: "In production",
    engagement: "Engineer on the platform and model service",
    featured: true,
    accent: "#1A9C84",
    cover: {
      src: "/projects/empirico-home.png",
      alt: "Empirico web app with a search box reading 'Ask a medical question'",
      caption: "empirico.ai: evidence-backed answers for healthcare professionals.",
      width: 1440,
      height: 900,
      frame: "browser",
    },
    problem: [
      "Medical knowledge is spread across long clinical guidelines, formularies and reference texts. Finding the right passage quickly, and knowing where it came from, is hard, especially at the point of care.",
      "General-purpose language models answer fluently but without reliable sourcing, which is not acceptable for clinical information.",
    ],
    context: [
      "Empirico is a distinct product from HealthNavi. It addresses knowledge access and retrieval, and its model service also powers other applications, including HealthNavi.",
      "The public product at empirico.ai offers drug dosing and interactions, clinical guidelines and treatment options, and states that it is for healthcare professionals and not a substitute for clinical judgement.",
    ],
    solution: [
      "A retrieval-augmented generation (RAG) platform: medical PDFs are ingested, chunked and embedded into a vector database; each question is embedded, matched against the knowledge base, and the retrieved evidence is passed to an LLM to compose a referenced answer.",
      "Two search depths trade speed against thoroughness: a quick mode, and a deep mode that retrieves more evidence across more sources.",
    ],
    architecture: {
      title: "From medical PDF to referenced answer",
      nodes: [
        { label: "Document store", detail: "Raw medical PDFs in AWS S3" },
        { label: "Ingestion", detail: "Parsing, chunking, page-level metadata" },
        { label: "Embeddings", detail: "Azure OpenAI embedding models" },
        { label: "Vector database", detail: "Zilliz (managed Milvus), hybrid retrieval" },
        { label: "Model service", detail: "Python / FastAPI · context construction" },
        { label: "LLM response", detail: "Gemini · answer + references + follow-ups" },
      ],
      note: "Components reflect the architecture during development; production configuration evolves.",
    },
    role: [
      {
        area: "Knowledge pipeline",
        items: [
          "Designed document ingestion and processing workflows for medical PDFs, with storage in S3.",
          "Implemented document and query embedding workflows and worked with vector search and hybrid retrieval.",
        ],
      },
      {
        area: "Model service & APIs",
        items: [
          "Developed the Python/FastAPI model service: evidence retrieval, context construction, LLM integration and response generation.",
          "Built API access so other applications can use the platform.",
        ],
      },
      {
        area: "Performance, cost & reliability",
        items: [
          "Worked on caching, concurrency and rate limiting; containerised services with Docker.",
          "Investigated retrieval performance and infrastructure costs.",
        ],
      },
    ],
    decisions: [
      {
        title: "Diversify sources, not just similarity",
        body: "Retrieval caps how many chunks come from any single document so an answer draws on several sources instead of repeating one book. That gives better coverage and more useful references.",
      },
      {
        title: "Quick vs. deep search",
        body: "Rather than one fixed retrieval budget, the service exposes a fast mode for routine questions and a deep mode that retrieves more evidence from more sources when thoroughness matters.",
      },
      {
        title: "Cache at the right layers",
        body: "Query embeddings and repeated responses are cached, cutting latency and embedding/LLM cost for common questions without changing answers.",
      },
      {
        title: "Page-level sources",
        body: "Each chunk keeps its source file and page number, so answers can cite exactly where the evidence came from.",
      },
    ],
    challenges: [
      {
        title: "Latency vs. thoroughness",
        body: "More retrieved context improves grounding but slows responses and raises cost. Search modes, streaming responses and caching keep the experience responsive.",
      },
      {
        title: "Infrastructure cost",
        body: "Managed vector search, embeddings and LLM calls each carry cost. Investigating retrieval performance and caching repeated work help keep running costs in check.",
      },
    ],
    outcomes: [
      "Live at empirico.ai, serving evidence-backed medical information to healthcare professionals.",
      "Provides the knowledge layer behind HealthNavi's clinical guidance.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "AWS S3",
      "Azure OpenAI",
      "Zilliz / Milvus",
      "Hybrid search",
      "Gemini",
      "Docker",
      "DigitalOcean",
    ],
    gallery: [
      {
        src: "/projects/empirico-home.png",
        alt: "Empirico home page with a medical question box and topic shortcuts",
        caption: "Ask a medical question, or start from drug dosing, guidelines or treatment options.",
        width: 1440,
        height: 900,
        frame: "browser",
      },
    ],
    links: [{ label: "empirico.ai", href: "https://empirico.ai/" }],
    learnings: [
      "How you find and cite sources (chunking, variety and page references) matters more to answer quality than swapping models.",
      "Cost is an engineering constraint like any other; measure it early.",
    ],
  },
  {
    slug: "mamaope-device",
    name: "MamaOpe Smart Auscultation Device",
    org: "MamaOpe Medicals",
    headline:
      "Bridging hardware, biomedical science and software to build medical technology.",
    summary:
      "A wireless, four-microphone chest auscultation device and Android app for respiratory assessment and pneumonia screening in children.",
    domain: "Medical devices · Biomedical signal processing",
    categories: ["health", "research", "mobile-web"],
    status: "Research & development",
    engagement: "Team member across hardware, signal processing and Android",
    featured: true,
    accent: "#6C5CE7",
    problem: [
      "Pneumonia is the leading cause of death in children under five in Sub-Saharan Africa. Diagnosis often relies on a health worker listening to chest sounds and counting breaths, skills that vary with training and workload.",
      "Where specialist support and diagnostic equipment are scarce, respiratory assessment is hard to do consistently.",
    ],
    context: [
      "The device is MamaOpe's hardware product, separate from but complementary to HealthNavi. The product-level description below comes from the Royal Academy of Engineering; it is not a claim that I designed every component.",
      "Publicly documented characteristics: four microphones that capture lung sounds simultaneously from the base and apex of each lung; suction-cup attachments; adjustable probes for different body sizes; LED status indicators; a mechanical power switch; and Wi-Fi transfer of recordings to a phone or tablet app.",
    ],
    solution: [
      "Structured, simultaneous acquisition of chest sounds from multiple positions, transmitted to an Android app that estimates respiratory rate and flags abnormal sound patterns, with recordings stored in a screening history.",
    ],
    architecture: {
      title: "Device-to-insight system overview",
      nodes: [
        { label: "Acoustic sensors", detail: "Four microphones on adjustable probes" },
        { label: "Signal acquisition", detail: "Simultaneous multi-site recording" },
        { label: "Wireless link", detail: "Wi-Fi transfer to phone or tablet" },
        { label: "Android app", detail: "Java / Kotlin · screening history" },
        { label: "Signal processing", detail: "Respiratory-rate estimation, sound analysis" },
        { label: "Clinical information", detail: "Measurements to support assessment" },
      ],
    },
    role: [
      {
        area: "Hardware",
        items: [
          "Took part in hardware design and component-level work, prototyping, assembly and testing.",
          "Worked on hardware integration and device communication with the software ecosystem.",
        ],
      },
      {
        area: "Biomedical signal processing",
        items: [
          "Developed MATLAB-based processing of chest-sound recordings.",
          "Worked on respiratory-rate estimation algorithms using signals relevant to pneumonia screening.",
        ],
      },
      {
        area: "Mobile",
        items: [
          "Developed Android application features in Java and Kotlin, including device integration and handling of captured respiratory data.",
        ],
      },
    ],
    decisions: [
      {
        title: "Multiple simultaneous listening sites",
        body: "Capturing several chest positions at once, rather than moving a single stethoscope, makes acquisition more structured and repeatable across operators.",
      },
      {
        title: "Phone as the processing and display hub",
        body: "Sending recordings over Wi-Fi to a phone or tablet keeps the device simple and lets analysis, storage and updates live in software.",
      },
    ],
    challenges: [
      {
        title: "Real-world signals are noisy",
        body: "Chest sounds from children are affected by movement, crying and ambient noise, so signal processing has to cope with imperfect recordings.",
      },
      {
        title: "Hardware and software must agree",
        body: "Device communication, data formats and the app have to be developed together. A change on one side affects the other.",
      },
    ],
    outcomes: [
      "Recognised through MamaOpe's founder's selection for the Royal Academy of Engineering Leaders in Innovation Fellowship (LIF Advance, 2024).",
      "The Grand Challenges Africa grant for MamaOpeAI (2024) builds clinical decision support on top of the device's respiratory data.",
    ],
    technologies: ["MATLAB", "Signal processing", "Java", "Kotlin", "Android", "Embedded hardware", "Wi-Fi"],
    gallery: [],
    links: [
      {
        label: "Royal Academy of Engineering: LIF Advance awardee",
        href: "https://raeng.org.uk/programmes-and-prizes/programmes/international-programmes/lif/lif-entrepreneurs/advance-innovators/lif-advance-awardees-2024/turyabagye-brian",
      },
      {
        label: "Grand Challenges: MamaOpeAI grant",
        href: "https://gcgh.grandchallenges.org/grant/mamaopeai-clinical-decision-support-manage-respiratory-illnesses",
      },
      { label: "MamaOpe Medicals", href: "https://www.mamaope.com/" },
    ],
    learnings: [
      "Physical products force end-to-end thinking: sensors, firmware, connectivity, software and the person holding the device are one system.",
    ],
  },
  {
    slug: "bench-sports",
    name: "Bench",
    org: "Bench Sports Media",
    headline: "Building a sports streaming product across mobile, web and payments.",
    summary:
      "A platform for teams, leagues and creators to stream, monetise and own their sports content, with live streaming, subscriptions, pay-per-view, tips and native mobile apps.",
    domain: "Digital media · Video streaming",
    categories: ["software", "mobile-web"],
    status: "In production",
    engagement: "Software engineer across web, mobile, streaming and payments",
    period: "2026 – present",
    featured: true,
    accent: "#C8E600",
    cover: {
      src: "/projects/bench-home.png",
      alt: "Bench home page: 'Get out of the stands. Get on the bench.'",
      caption: "benchsports.com: stream, monetise and own your sports content.",
      width: 1440,
      height: 900,
      frame: "browser",
    },
    problem: [
      "Sports teams, leagues and independent creators need a way to reach fans directly and earn from their content without depending on broadcasters or general-purpose platforms.",
      "That requires reliable live and on-demand video, payments that route money to many creators, and apps on every device fans use.",
    ],
    context: [
      "Bench is built by a distributed team. I work across the web app, the mobile app, streaming and payments, and own the features I build from design to release.",
    ],
    solution: [
      "A monorepo containing a Next.js web app, an Expo/React Native mobile app, a Vue admin dashboard and a realtime backend, with Mux for video, Stripe Connect for creator payouts and Clerk for authentication.",
    ],
    architecture: {
      title: "Platform overview",
      nodes: [
        { label: "Fans & creators", detail: "Web, iOS and Android" },
        { label: "Next.js web · Expo mobile", detail: "Shared TypeScript packages" },
        { label: "Realtime backend", detail: "Live data, server functions, auth via Clerk" },
        { label: "Mux", detail: "Live streams, uploads, playback" },
        { label: "Stripe Connect", detail: "Subscriptions, PPV, tips, creator payouts" },
      ],
    },
    role: [
      {
        area: "Monetisation (implemented)",
        items: [
          "Built the pricing and card-driven checkout flow and paywall UI.",
          "Implemented creator access controls and the pay-per-view backend; added subscriber and PPV monetisation controls.",
          "Fixed and refined Stripe Connect flows and channel switching.",
        ],
      },
      {
        area: "Live streaming & video",
        items: [
          "Improved live streaming and the viewer experience, including in-app stream preview and one stream key per channel.",
          "Added live comments, viewer counts, a live chat feed and tips.",
          "Fixed Mux upload publishing, video sizing across devices and shorts classification.",
        ],
      },
      {
        area: "Mobile app & release",
        items: [
          "Built out the Expo/React Native mobile app, fixed live streams ending early on mobile and kept the app usable when backend queries fail.",
          "Handled App Store and Google Play requirements: Sign in with Apple, account deletion for Play review, and release preparation.",
        ],
      },
      {
        area: "Accounts & creator onboarding",
        items: [
          "Built creator channel onboarding with unique channel names, forgot-password, and Google sign-in on web.",
          "Improved mobile responsiveness, navigation and the post-login flow; fixed recommendations.",
        ],
      },
    ],
    decisions: [
      {
        title: "Stripe Connect for creator payouts",
        body: "A marketplace where many creators get paid needs connected accounts, not a single merchant. Connect handles onboarding, compliance and payouts per creator.",
      },
      {
        title: "Degrade gracefully on mobile",
        body: "When a backend query fails, the mobile app keeps working instead of crashing. On spotty mobile networks, resilience matters more than perfection.",
      },
    ],
    challenges: [
      {
        title: "Live streams ending early on mobile",
        body: "Diagnosed and fixed premature stream termination in the mobile app while adding the live chat feed and tipping.",
      },
      {
        title: "App store review requirements",
        body: "Store policies drove real engineering work: in-app account deletion for Google Play and Sign in with Apple for the App Store.",
      },
    ],
    outcomes: [
      "Live at benchsports.com with subscriptions, pay-per-view, tips and sponsorships.",
      "Mobile app built with live streaming, live chat and tipping, and prepared for App Store and Google Play review.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React Native",
      "Expo",
      "Mux",
      "Stripe Connect",
      "Clerk",
      "Vue",
      "Vercel",
    ],
    gallery: [
      {
        src: "/projects/bench-home.png",
        alt: "Bench home page hero with Watch now and Start earning buttons",
        caption: "Public home page: subscriptions, PPV, tips and sponsorships in one place.",
        width: 1440,
        height: 900,
        frame: "browser",
      },
    ],
    links: [{ label: "benchsports.com", href: "https://benchsports.com/" }],
    learnings: [
      "In consumer products, payments and app-store policy are as much a part of engineering as features.",
    ],
  },
  {
    slug: "ascension-procurement",
    name: "Ascension",
    org: "Ascension Services",
    headline: "Turning complex procurement processes into enterprise software.",
    summary:
      "An enterprise procurement and operations platform covering suppliers, requests for quotation, purchase orders, inventory and payments.",
    domain: "Enterprise software · Procurement / ERP",
    categories: ["enterprise", "software", "mobile-web"],
    status: "In production",
    engagement: "Full-stack software engineer",
    period: "2025 – present",
    featured: true,
    accent: "#17566F",
    cover: {
      src: "/projects/ascension-home.png",
      alt: "Ascension home page: 'Streamline your company procurement system'",
      caption: "ascensionservices.net: procurement for growing companies and enterprises.",
      width: 1440,
      height: 900,
      frame: "browser",
    },
    problem: [
      "Procurement involves many people, approvals, records and business rules. Run on email and spreadsheets, it is slow, hard to audit and error-prone.",
    ],
    context: [
      "Ascension is built by a small team. I work across frontend and backend and own my work end to end: features, APIs, background jobs, deployment and CI/CD.",
    ],
    solution: [
      "A web platform that turns procurement into trackable digital workflows, organised into modules for users and permissions, procurement (suppliers, RFQs, purchase orders), stores and inventory (items, assets, stock movements) and payments (invoices and payment processing).",
    ],
    architecture: {
      title: "Platform architecture",
      nodes: [
        { label: "Next.js frontend", detail: "React · TypeScript" },
        { label: "FastAPI backend", detail: "Versioned REST API · JWT · role-based permissions" },
        { label: "PostgreSQL", detail: "SQLAlchemy · Alembic migrations" },
        { label: "Celery + Redis", detail: "Background and scheduled tasks" },
        { label: "Docker · Nginx", detail: "Containerised deployment" },
      ],
    },
    role: [
      {
        area: "Procurement workflows",
        items: [
          "Built purchase-order amendments and cancellations with recorded reasons, approval forwarding and approver prompts.",
          "Hardened quote visibility, supplier filtering and quote/case integrity checks.",
          "Worked on the procurement \"transit ladder\" (the timeline of procurement events) and printable procurement documents and templates.",
        ],
      },
      {
        area: "Platform & integrations",
        items: [
          "Added trial and subscription-expiry handling with staged reminder emails, and branded transactional emails.",
          "Moved supplier inquiry emails onto Celery background queues instead of sending them in-request.",
          "Fixed realtime websocket notifications, S3 attachment handling, image compression and Alembic migration conflicts.",
        ],
      },
      {
        area: "Delivery",
        items: [
          "Worked across the FastAPI backend and Next.js/TypeScript frontend, from requirements to deployment.",
          "Collaborated with other developers through Jira; supported Docker-based deployment, CI/CD and documentation.",
        ],
      },
    ],
    decisions: [
      {
        title: "Background work off the request path",
        body: "Emails and time-based jobs, such as moving bidding windows forward and closing stale cases, run on Celery workers and a scheduler, so user-facing requests stay fast.",
      },
      {
        title: "Permissions and audit built in",
        body: "Role-based permissions and audit trails are part of the core, because procurement is about accountability as much as data entry.",
      },
    ],
    challenges: [
      {
        title: "Modelling real business processes",
        body: "Procurement rules vary by organisation and change over time. Turning them into software means careful requirements work and schema migrations that keep existing data intact.",
      },
    ],
    outcomes: [
      "More than 700 commits across the backend and frontend since May 2025, spanning procurement workflows, subscriptions and notifications.",
      "Live at ascensionservices.net.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Redis",
      "Celery",
      "Docker",
      "Nginx",
    ],
    gallery: [],
    links: [{ label: "ascensionservices.net", href: "https://ascensionservices.net/" }],
    learnings: [
      "Business software works when it follows how people actually work. Understanding the requirements is half the engineering.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
