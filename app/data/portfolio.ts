export type PortfolioItemType =
  | "experience"
  | "project"
  | "personal-project"
  | "article";

export type PortfolioItem = {
  id: string;
  type: PortfolioItemType;
  title: string;
  company?: string;
  eyebrow: string;
  period?: string;
  summary?: string;
  tags?: string[];
  highlights: string[];
  story?: string;
  externalUrl?: string;
  externalLabel?: string;
};

export const identityFields = [
  "Software",
  "Infrastructure",
  "Business",
  "Motorcycle",
];

export const experienceItems: PortfolioItem[] = [
  {
    id: "lead-software-abi",
    type: "experience",
    title: "Lead Software Engineer, AI Platforms",
    company: "AB InBev",
    eyebrow: "Lead Software Engineer, AI Platforms",
    period: "Nov 2024 - March 2026",
    summary:
      "At AB InBev, I built and shipped Insights Copilot, an AI chatbot for enterprise business insights, working across product UI, backend services, RAG workflows, cloud infrastructure, and scalable AI platform tooling.",
    tags: ["RAG", "Azure AKS", "Databricks", "FastAPI", "React"],
    highlights: [
      "I designed and shipped core features for Insights Copilot across FastAPI, React/Next.js, PostgreSQL, RAG, and agentic workflows.",
      "I built application architecture that connected product UI, backend services, and enterprise data retrieval into a reliable internal AI platform.",
      "I worked with DevOps to implement KEDA autoscaling on AKS, including Redis-backed chat services that scaled with real-time demand.",
      "I upgraded the NL2SQL charting experience by moving from frontend-built charts to an agentic chart-maker flow that generated Plotly visuals and rendered them directly in the UI.",
      "I helped migrate retrieval data flows toward Azure Databricks and lakehouse patterns, making RAG pipelines easier to scale, maintain, and connect with enterprise data."
    ],
    story: "This is the full story for the Lead Software Engineer experience at AB InBev."
  },
  {
    id: "software-engineer-frazil",
    type: "experience",
    title: "Software Engineer, IoT & Platform Systems",
    company: "Frazil",
    eyebrow: "Software Engineer, IoT & Platform Systems",
    period: "Sept 2022 - Oct 2024",
    summary:
      "At Fraznet, I built and shipped real-time IoT and platform systems for thousands of vending machines, working across telemetry ingestion, Kafka pipelines, analytics dashboards, Kubernetes infrastructure, and backend services for business and eCommerce operations.",
    tags: ["IoT", "Kafka", "AWS", "FastAPI", "ArgoCD"],
    highlights: [
      "I built and maintained a real-time data platform ingesting sales and machine-health telemetry from thousands of vending machines across US and Canada, with events sent every five seconds per machine.",
      "I introduced Apache Kafka to handle high-throughput ingestion of 100,000+ events per minute, improving scalability and reducing peak-load latency.",
      "I deployed and operated backend services on Kubernetes using ArgoCD GitOps, including production environments and isolated dev environments for long-running feature testing.",
      "I developed analytics dashboards and backend systems that helped business users track sales, CPM, machine status, and contract data.",
      "I implemented authentication and authorization for a new eCommerce platform used to distribute supplies such as cups and Frazil-related materials."
    ],
    story: "This is the full story for the Software Engineer experience at Frazil."
  },
    {
    id: "full-stack-engineer-care-operations-platform",
    type: "experience",
    title: "Full-Stack Engineer, Care Operations Platform",
    company: "KPS Software",
    eyebrow: "Shipping with product and business context",
    period: "Aug 2018 - Jul 2022",
    summary:
      "At KPS Software, I built and improved care operations software for workforce scheduling, caregiver matching, and service planning, working across Angular frontends, Python optimization workflows, insurance logic, automated testing, and maintainable full-stack healthcare systems.",
    tags: ["Angular", "Python", "OR-Tools", "Healthcare", "Optimization"],
    highlights: [
      "I built workforce optimization features using Python and OR-Tools, improving caregiver shift planning, matching, and scheduling reliability.",
      "I implemented constraint-based matching logic that considered working hours, location, traffic conditions, and caregiver preferences.",
      "I helped restructure complex social and private insurance workflows, making the system easier to maintain and faster to debug.",
      "I contributed to a major Angular UI restructuring for tours and service planning, improving navigation and planning workflows for users.",
      "I introduced stronger testing practices with Karate, Jasmine, and Karma, increasing frontend coverage and improving confidence in releases."
    ],
  },
];

export const projectItems: PortfolioItem[] = [
  {
    id: "settle-q",
    type: "project",
    title: "SettleQ",
    company: "Payments Recovery Platform",
    eyebrow: "Interactive identity surface",
    period: "Shipped 2026",
    summary:
      "SettleQ is the project where I learned what becoming a 10x engineer with AI actually means. Building from scratch forced me to think beyond code: product decisions, UX flows, recovery logic, pricing, backend architecture, and design direction — while using AI to move faster without giving up ownership of the final product.",
    externalUrl: "https://settleq.com",
    externalLabel: "Visit SettleQ",
    tags: ["Stripe Connect", "Twilio", "Temporal", "FastAPI", "React"],
    highlights: [
      "I shaped SettleQ from idea to product, making core decisions around payment recovery flows, user journeys, pricing boundaries, premium features, and business-facing UX.",
      "I designed the recovery experience across gentle, urgent, and final stages, balancing automation with a tone that felt calm, professional, and trustworthy for overdue invoice follow-ups.",
      "I integrated Stripe Connect to support connected accounts, payment tracking, and recovery workflows tied to real invoice and payment status.",
      "I used Temporal to model durable invoice recovery workflows, so each invoice could move through timed recovery stages reliably without fragile cron logic.",
      "I built the product across React, FastAPI, PostgreSQL, Twilio, Resend, workflow orchestration, and recovery analytics."
    ],
  },
    {
    id: "full-stack-engineer-ai-scoring",
    type: "experience",
    title: "Scholars' PTE",
    company: "Pearson's PTE Practice & Scoring Platform",
    eyebrow: "Shipping with product and business context",
    period: "Jul 2022 - Nov 2023",
    summary: "Scholars’ PTE is where I started thinking like a product builder, not just a developer. With three junior developers working alongside me, I had to move beyond writing code into shaping the product, guiding technical decisions, mentoring the team, and thinking deeply about scoring accuracy, feedback speed, learner trust, and the difference between an impressive AI demo and a dependable learning experience.",
    tags: ["Next.js", "FastAPI", "Automatic Speech Recognition", "Celery", "Supabase"],
    highlights: [
      "I designed, built, and published Scholars’ PTE, a web-based practice platform that simulated Pearson PTE-style testing, scoring, and feedback workflows.",
      "I customized a Whisper-based speech recognition pipeline with targeted datasets, reducing scoring time by around 50% and improving the speed of user feedback.",
      "I added a two-layer grammar evaluation flow using language tooling and custom checks to improve reliability of written-response assessment.",
      "I configured Celery for asynchronous task processing, reducing result wait times from roughly five minutes to around 15 seconds.",
      "I built the application across Next.js, Redux Toolkit, RTK Query, FastAPI, PostgreSQL, Supabase Auth/RLS, Backblaze object storage, and Docker.",
      "I mentored three junior developers while leading architecture decisions across frontend, backend, database, and deployment workflows."
    ],
  },
  {
    id: "mailrang",
    type: "project",
    title: "MailRang",
    company: "AI powered Cold Email Infrastructure Platform",
    eyebrow: "Writing and knowledge capture",
    period: "Shipped 2025",
    summary:
      "MailRang is where I started thinking like a product builder, not just a developer. It pushed me beyond writing features into understanding users, positioning, onboarding, deliverability, pricing, product loops, and the difference between software that works and software people actually want to use.",
    externalUrl: "https://mailrang.com",
    externalLabel: "Visit MailRang",
    tags: ["Temporal", "AI Replies", "SPF/DKIM/DMARC", "Deliverability", "Campaign Automation"],
    highlights: [
      "I built MailRang as the project that pushed me from developer mode into product-builder mode, where code had to serve positioning, onboarding, trust, and business outcomes.",
      "I used Temporal to orchestrate cold email campaign flows, including timed sends, follow-ups, pauses, reply detection, and safe exits from automation.",
      "I worked through the messy but important world of email deliverability: SPF, DKIM, DMARC, DNS health, sender reputation, warmup, and domain readiness.",
      "I explored AI-assisted reply handling for detecting positive responses, drafting next steps, and turning cold outreach into a more responsive workflow.",
      "I designed the product around the full outbound workflow: campaign setup, sender rotation, deliverability checks, automated follow-ups, inbox signals, and campaign automation."
    ],
  }
];

export const personalProjectItems: PortfolioItem[] = [
  {
    id: "docklite",
    type: "personal-project",
    title: "DockLite",
    company: "Docker Desktop alternative for VS Code",
    eyebrow: "Docker Desktop Lite",
    summary:
      "Docklite is a local-first VS Code extension for inspecting and managing Docker containers, images, and volumes without leaving the editor.",
    externalUrl:
      "https://marketplace.visualstudio.com/items?itemName=asis-paudel.docklite",
    externalLabel: "View on Marketplace",
    tags: ["VS Code Extension", "Docker CLI", "Container Management"],
    highlights: [
      "I used the avatar as the main interactive signature instead of leaning on generic particle effects or decorative backgrounds.",
      "I kept the motion subtle: eyes lead, the head follows lightly, and hover states add personality without stealing focus from the content.",
      "The project is a place to keep sharpening the balance between personal taste, recruiter clarity, and frontend craft.",
    ],
  },
  {
    id: "mocklane",
    type: "personal-project",
    title: "MockLane",
    company: "Generate and mock HTTP responses with AI",
    eyebrow: "Prompt HTTP Responses",
    summary:
      "MockLane is an in-browser mock API response generator. Users paste a model or data structure, describe the endpoint they need, and get a JSON HTTP response object back.",
    externalUrl: "https://mocklane.asispaudel.com",
    externalLabel: "Visit website",
    tags: ["API Proxy", "AI", "Transformers.js"],
    highlights: [
      "The interesting part is making practical maintenance data feel easy to revisit instead of turning it into another lifeless spreadsheet.",
      "It connects a real hobby with the kind of product thinking I enjoy: small workflows, useful defaults, and a tactile sense of progress.",
    ],
  },
];

export const articleItems: PortfolioItem[] = [
  {
    id: "quiet-software",
    type: "article",
    title: "Quiet Software Feels More Competent",
    eyebrow: "Product note",
    tags: ["Writing", "UX"],
    highlights: [
      "A short piece about calm interfaces, reduced noise, and why polish can communicate trust before a user reads a single line of content.",
      "The argument is not that everything should be minimalist, but that every detail should feel chosen.",
    ],
  },
  {
    id: "operational-taste",
    type: "article",
    title: "Operational Taste Matters Too",
    eyebrow: "Systems note",
    tags: ["Infra", "Thinking"],
    highlights: [
      "A note on why internal tools, delivery systems, and engineering workflows deserve the same clarity and composure as user-facing products.",
      "Good operational surfaces help teams think better, not just move faster.",
    ],
  },
  {
    id: "roadside-patterns",
    type: "article",
    title: "Roadside Pattern Recognition",
    eyebrow: "Field journal",
    tags: ["Motorcycle", "Reflection"],
    highlights: [
      "A looser personal essay connecting long rides, attention, and the way good software builders learn to notice patterns in messy environments.",
      "It is more voice-driven than tutorial-driven, which makes it a nice fit for the personal side of the site.",
    ],
  },
];
