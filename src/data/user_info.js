const info = {
  // ============ MAIN DETAILS ============
  main: {
    name: 'Ugnius Motiejunas',
    nameNative: 'Ugnius Motiejūnas',
    description:
      'Full-Stack AI Engineer. I deliver production-grade systems and products end to end: from banking microservices at Danske Bank to Bonder, an events platform and iOS app with 12.7k visitors, and Trimata, interactive 3D product configurators for manufacturers.',
    role: 'Full-Stack AI Engineer',
    shortRole: 'AI Engineer',
    location: 'Vilnius, Lithuania',
    photo: 'photo.webp',
    email: 'motiejunasugnius@gmail.com',
    // Plain, factual third-person bio. Search engines and AI assistants quote
    // this kind of text verbatim, so keep every claim true and specific.
    bio: [
      'Ugnius Motiejunas (Ugnius Motiejūnas) is a full-stack AI engineer from Vilnius, Lithuania. He builds Trimata (trimata.lt), interactive 3D product configurators and 3D visualisations for manufacturers and online shops.',
      'He built Bonder (bonder.lt), an events discovery platform for Vilnius with a native iOS app on the App Store, which reached 12.7k unique visitors and 200+ registered accounts within its first three months.',
      'Earlier he worked as a software engineer at Danske Bank (C#/.NET microservices, Kafka, Kubernetes) and Nordics Software (Go, React), and interned at Swedbank and Ruptela. In 2026 he spent two months at Network School and three months as a Builder at Lost Astronaut, a venture builder. He holds a BSc in Software Engineering from Vilnius University.',
    ],
  },

  // ============ SITE / SEO ============
  site: {
    url: 'https://udevelops.com',
    title: 'Ugnius Motiejunas | Full-Stack AI Engineer, Vilnius',
    description:
      'Ugnius Motiejunas is a full-stack AI engineer from Vilnius. Builds Trimata 3D product configurators and built Bonder, an events platform and iOS app. Ex-Danske Bank, Network School, Lost Astronaut.',
    knowsAbout: [
      'Full-stack development',
      'AI agents and LLM applications',
      'Retrieval-augmented generation (RAG)',
      'Three.js and interactive 3D product configurators',
      'iOS app development',
      'Go',
      'C# / .NET microservices',
      'React and TypeScript',
      'Kubernetes',
      'Technical SEO',
    ],
  },

  // ============ SOCIAL LINKS ============
  socials: {
    twitter: '',
    github: 'https://github.com/kambalas',
    linkedin: 'https://www.linkedin.com/in/ugniusmotiejunas/',
    instagram: '',
    facebook: '',
    upwork: 'https://www.upwork.com/freelancers/~0185a75fd0cba7d271?mp_source=share',
    trimata: 'https://www.trimata.lt/',
    bonder: 'https://bonder.lt/',
    appStore: 'https://apps.apple.com/lt/app/bonder-find-create-events/id6816441636',
  },

  // ============ TESTIMONIALS (real reviews only) ============
  testimonials: [
    {
      quote:
        'Ugnius was great to work with throughout the project. Strong communication, proactive approach, and excellent technical skills. Would definitely work with him again.',
      rating: 5.0,
      project: 'Embeddable AI Chatbot',
      author: 'Donata G.',
      role: 'IT Project Manager, Starkodas',
      source: 'upwork',
      endorsements: ['Committed to Quality', 'Solution Oriented', 'Clear Communicator'],
    },
    {
      quote:
        "I would definitely recommend him to everyone!! Ugnius is new on platform, but after speaking with him it became very clear that he's a real expert! We needed help understanding the development plan and estimates for an AI chatbot, and he explained everything clearly and created a solid roadmap for the project. He was very easy to communicate with, professional, and clearly knows what he's doing.",
      rating: 5.0,
      project: 'AI Chatbot Development Plan With Cost and Timeline Estimate',
      author: 'Sofia O.',
      role: 'Founder, Realfluency',
      source: 'upwork',
      endorsements: ['Clear Communicator', 'Professional'],
    },
  ],

  // ============ PROJECTS ============
  projects: [
    {
      title: 'Bonder: Events Platform & iOS App',
      description:
        'Bonder (bonder.lt) is an events discovery platform for Vilnius: a web app plus a native iOS app on the App Store. I designed, built and grew it solo, from the backend and event import pipeline to SEO and the App Store release. 12.7k unique visitors, 205 registered accounts and 1,068 events listed in its first three months.',
      technologies:
        'TypeScript, Next.js, React Native, Expo, iOS, PostgreSQL, Railway, PostHog, LLM-based event deduplication, Programmatic SEO',
      github: '',
      link: 'https://bonder.lt/',
      appStore: 'https://apps.apple.com/lt/app/bonder-find-create-events/id6816441636',
      image: 'projects/bonder.webp',
      slug: 'bonder',
      details:
        'Bonder is a product I built and shipped end to end as its full-stack engineer. People find what is on in Vilnius today, RSVP, see who else is going and buy tickets; organisers create events and invite friends. Behind it is a pipeline that scrapes and imports events from ticketing sites and venues, deduplicates them with an LLM, and publishes SEO landing pages for seasons, venues and dates. The native iOS app passed App Store review and launched on 29 October 2026. Numbers below are from PostHog and the production database, September to November 2026.',
      stats: [
        { value: '12.7k', label: 'unique visitors' },
        { value: '205', label: 'registered accounts' },
        { value: '29.5k', label: 'pageviews' },
        { value: '1,068', label: 'events listed' },
      ],
      features: [
        'Native iOS app (React Native / Expo) live on the App Store, with push notifications and deep links into events',
        'Event import pipeline: scrapers for ticketing sites and venues, LLM deduplication, and a reviewed import into production',
        'RSVPs, friends, private events with invitations, photo albums and comments',
        'Programmatic SEO: date, venue and seasonal guide pages, IndexNow and Search Console monitoring; Halloween guides reached 1,700+ Google clicks a week',
        'Product analytics funnels in PostHog: install banner, sign-up gate and ticket click-through tracking',
        'Admin console with an inbox for inbound email, moderation and event approval',
      ],
      useCases: [
        {
          title: 'Event discovery',
          description: 'Find what is on tonight in Vilnius by category, map or venue, and see which friends are going.',
        },
        {
          title: 'Organisers',
          description: 'Create public or private events, invite people and collect RSVPs without a ticketing contract.',
        },
        {
          title: 'Venues',
          description: 'Venue pages and party request forms bring event and booking leads to bars and clubs.',
        },
      ],
    },
    {
      title: 'Trimata: Interactive 3D Product Configurators',
      description:
        'Trimata (trimata.lt) is my 3D product studio, started in November 2026. I build browser-based 3D configurators for makers of saunas, kitchens, doors, roofing and decks: buyers choose size, colours and add-ons, see the price, and send a precise specification.',
      technologies: 'Three.js, WebGL, Blender, Next.js, TypeScript, PostHog, Railway',
      github: '',
      link: 'https://www.trimata.lt/',
      image: 'projects/trimata.webp',
      slug: 'trimata',
      details:
        'Trimata turns a manufacturer’s product catalogue into a live 3D configurator that can be embedded on their own website with one line of code. Models are prepared in Blender and rendered in the browser with Three.js, with real dimensions drawn on the model, a price that updates as you pick options, and a summary the buyer sends as a quote request. Live demos include kitchens, saunas with hot tubs, Vision panel doors, a roofing estimator and a deck planner.',
      features: [
        'Three.js configurators with real-time materials, dimensions drawn on the model and live pricing',
        'One-line embed for partner websites, plus direct demo links that load 3D only on click to keep pages fast',
        'Blender pipeline from product photos and drawings to optimised web models',
        'Per-visit analytics of what buyers choose, how long the 3D takes to load and where they leave',
        '100+ programmatic SEO pages in Lithuanian and English',
      ],
      useCases: [
        {
          title: 'Manufacturers',
          description: 'Sauna, door, kitchen and roofing makers get fewer back-and-forth emails and exact specifications.',
        },
        {
          title: 'E-shops',
          description: '3D product views with AR on product pages, without forcing 3D on every visitor.',
        },
        {
          title: 'Real estate',
          description: 'Interactive building and apartment selectors for developers.',
        },
      ],
    },
    {
      title: 'Embeddable AI Chatbot Widget',
      description:
        "A multi-tenant AI chatbot platform businesses embed on their site to handle support conversations and hand off to a human the moment the bot shouldn't be guessing. Built for Starkodas.",
      technologies:
        'TypeScript, Node.js, Cloud Functions, Firestore Vector Search, Preact, OpenAI, Gemini, Anthropic, Firebase',
      github: '',
      link: '',
      image: 'projects/widget.webp',
      slug: 'chatbot-widget',
      details:
        "A multi-tenant AI chatbot platform businesses embed on their site to handle support conversations and hand off to a human the moment the bot shouldn't be guessing. Under the hood it's a genuine tool-calling agent: on every message, the LLM can call real functions (search the knowledge base, check working hours, classify intent) through OpenAI's, Gemini's, or Anthropic's native function-calling, including its own escalate_to_operator tool to hand the conversation to a real person. A rule engine combining similarity of retrieved chunks with uncertainty-phrase detection in the model's own output decides when escalation should happen, so the bot only answers when the knowledge base actually supports the answer.",
      features: [
        'Native LLM tool calling (OpenAI functions, Gemini function declarations, Anthropic tool_use) capped at 3 rounds, with tools for knowledge base search, working-hours check, intent classification, and operator escalation',
        'RAG pipeline: crawled URLs are chunked, embedded, and stored as native Firestore vectors, retrieved by cosine-similarity KNN at query time',
        "Confidence scoring from a hardcoded keyword list, best match score, hit count, and detected uncertainty phrases into a high/medium/low/none signal",
        'Strict, prompt-engineered system prompt that forces exact quoting from retrieved context and an honest "I don\'t know"',
        'Full conversation state machine (bot_active, waiting_for_human, timeout, pending_offline, resolved) wired to Cloud Tasks for timeout handling and notifications',
        'Hard multi-tenant isolation: every Firestore path and security rule is scoped by the auth token, not just by convention',
        "Incremental crawling, so unchanged pages don't get re-embedded on every scheduled crawl",
        'Model-agnostic per tenant: swap between OpenAI, Gemini, and Anthropic',
        'Widget runs in Shadow DOM with idle-time lazy loading, so it never slows down the host page',
      ],
      useCases: [
        {
          title: 'Customer Support Automation',
          description:
            "The agent answers from tenant content and calls its own escalation tool the moment it's unsure, instead of guessing or getting stuck.",
        },
        {
          title: 'Lead Qualification',
          description:
            'The widget captures visitor intent in real time and routes warm conversations to operators during business hours, with visual and audio alerts.',
        },
        {
          title: 'Agency / White-Label Deployment',
          description:
            'Tenant isolation at the security-rule level, so one platform can run dozens of independent client chatbots with no data leakage.',
        },
        {
          title: 'After-Hours Coverage',
          description:
            'Outside working hours the bot still answers from the knowledge base and falls back to email capture, fully implemented end to end, not a stub.',
        },
      ],
    },

    {
      title: 'Real-Time Radio Network & Emergency Services Management Console',
      description:
        'A comprehensive fleet and network management console built for PMR/TETRA radio network operators and emergency services. Combines asset administration with real-time monitoring of GPS positions, signal strength, and device status across an entire radio network, all rendered on interactive maps.',
      technologies:
        'React 19, TypeScript, Vite, Material UI, TanStack Query, React Hook Form, Zod, Firebase Auth, Mapbox GL, Axios, i18next',
      github: '',
      link: '',
      image: 'projects/radio.webp',
      slug: 'radio-network-console',
      details:
        'A comprehensive fleet and network management console built for PMR/TETRA radio network operators and emergency services. Combines asset administration (radio units, base stations, teams, users) with real-time monitoring of GPS positions, signal strength, and device status across an entire radio network, all rendered on interactive maps. Built with a strict service layer architecture and Firebase authenticated API access, designed for NOC teams who need reliable, at-a-glance visibility into distributed hardware.',
      features: [
        'Full CRUD admin console for radio units, companies, teams, users, network types, and Android devices',
        'Real-time GPS and RSSI signal monitoring rendered on Mapbox coverage and heatmap views',
        'Firebase backed authentication with automatic token refresh and retry on expired sessions',
        'Per-protocol network driver metrics for TETRA, NXDN, and AKIS systems',
        'Dedicated ambulance fleet module tracking crew locations and patient care records',
        'SDS messaging and status outbox tracking for auditing device communication',
        'Multi-language support across English, Lithuanian, German, and Spanish',
        'URL driven filtering and pagination for consistent, shareable table views across every domain',
      ],
      useCases: [
        {
          title: 'Network Operations',
          description:
            'Give NOC teams a single view of radio unit health, coverage, and signal strength across a whole service area, cutting the time it takes to diagnose connectivity issues.',
        },
        {
          title: 'Emergency Fleet Coordination',
          description:
            'Track ambulance crews and their equipment in real time, tying GPS position and patient care data to the radios assigned to each vehicle.',
        },
        {
          title: 'Device and User Administration',
          description:
            'Manage hundreds of radio units, Android handhelds, and personnel across multiple companies and teams from one interface instead of scattered vendor tools.',
        },
      ],
    },
    {
      title: 'Coca-Cola Lottery Web App',
      description:
        'A lottery web application built for official Coca-Cola Lithuania client. Developed with React, TypeScript, and Vite, featuring a fast, responsive interface and secure functionality for managing lottery entries.',
      technologies: 'React, TypeScript, Vite, HTML, CSS',
      github: 'https://github.com/kambalas/cocacola-lottery',
      link: 'https://kambalas.github.io/cocacola-lottery/',
      image: 'projects/cocacola.webp',
      slug: 'cocacola-lottery',
      details:
        'Built for Coca-Cola Lithuania as a freelance engagement. The platform manages a full lottery lifecycle, from user registration and entry submission to randomized winner selection and announcement. Emphasis was placed on a smooth mobile-first UX, fast load times via Vite, and a clean admin workflow.',
      features: [
        'Secure lottery entry submission with validation',
        'Randomized winner selection algorithm',
        'Responsive mobile-first interface',
        'Fast builds and HMR with Vite',
        'Production deployment on GitHub Pages',
      ],
      useCases: [
        {
          title: 'Promotional Campaigns',
          description:
            'Run compliant giveaway mechanics that drive purchase frequency and brand engagement without heavy agency fees.',
        },
        {
          title: 'Retail Activation',
          description:
            'Gamify in-store promotions to increase basket size and collect first-party customer data at low cost.',
        },
        {
          title: 'Email & Social Growth',
          description:
            'Incentivise sign-ups and shares through prize draws, growing owned audiences at a fraction of paid-ad costs.',
        },
      ],
    },

    {
      title: 'AI Sales chatbot',
      description:
        'An intelligent WhatsApp sales assistant built for CIMES, an Argentinian logistics franchise. Cimi attends customers, offers products, and closes sales automatically, 24/7. Powered by GPT-4o and orchestrated with n8n for instant, human-like responses.',
      technologies: 'n8n, GPT, WhatsApp Business API, OpenAI',
      github: '',
      link: '',
      image: 'projects/chatbot.webp',
      slug: 'whatsapp-chatbot',
      details:
        'Cimi is an AI-powered sales assistant deployed on WhatsApp for CIMES, a logistics franchise in Argentina. It greets customers, identifies whether they are new or returning, presents relevant product options with pricing, and guides them through to purchase, all in natural Spanish conversation. Built with GPT-4o for intelligent dialogue and n8n for workflow automation, Cimi operates 24/7 with instant response times.',
      features: [
        'Automated sales conversations via WhatsApp',
        'GPT-4o powered natural language understanding in Spanish',
        'New vs. returning customer detection and tailored flows',
        'Product catalog presentation with live pricing',
        'Instant 24/7 response with no human intervention needed',
        'n8n workflow automation for order processing and CRM updates',
      ],
      useCases: [
        {
          title: 'Automated Sales',
          description:
            'Close deals around the clock without sales staff. Cimi handles the full conversation from greeting to order confirmation.',
        },
        {
          title: '24/7 Customer Engagement',
          description:
            'Never miss a lead. Customers get instant responses at any hour, increasing conversion rates and customer satisfaction.',
        },
        {
          title: 'Franchise Scaling',
          description:
            'Deploy the same sales bot across multiple franchise locations, maintaining consistent service quality without additional headcount.',
        },
        {
          title: 'Lead Qualification',
          description:
            'Automatically identify new customers, collect their information, and route high-value prospects to human sales reps.',
        },
      ],
    },

    {
      title: 'Business Website',
      description:
        'A modern business website built with Hugo for a client. Features dark mode, multilingual support, and lightning-fast performance. Currently used as a demo but ready for real-world deployment.',
      technologies: 'Hugo, HTML, CSS, JavaScript',
      github: 'https://github.com/kambalas/test-actions',
      link: 'https://kambalas.github.io/test-actions/en/',
      image: 'projects/business-website.webp',
      slug: 'business-website',
      details:
        'A statically generated business website using Hugo, designed for a client requiring multilingual content (EN/LT) and blazing-fast page loads. The site is fully themeable with dark mode support and deployed via GitHub Actions for zero-downtime updates.',
      features: [
        'Multilingual support (English and Lithuanian)',
        'Dark mode toggle with system preference detection',
        'Static generation for sub-second page loads',
        'Automated CI/CD deployment via GitHub Actions',
        'SEO-optimized meta tags and Open Graph',
      ],
      useCases: [
        {
          title: 'SMB Online Presence',
          description:
            'Give small businesses a professional, fast-loading site without ongoing hosting costs of dynamic platforms.',
        },
        {
          title: 'International Expansion',
          description:
            'Launch localised landing pages in new markets quickly, validating demand before heavy investment.',
        },
        {
          title: 'Content Marketing',
          description:
            'Static sites rank faster in search, reducing paid traffic dependency and cutting long-term acquisition costs.',
        },
      ],
    },
  ],

  // ============ EDUCATION ============
  education: [
    {
      school: 'Vilnius University',
      degree: 'Bachelor of Software Engineering',
      duration: '2021 - 2025',
      image: 'vu.webp',
    },
    {
      school: 'University of Milan',
      degree: 'Master of Software Engineering (Student exchange)',
      duration: '2023 - 2024',
      image: 'unimi.webp',
    },
  ],

  // ============ EXPERIENCE ============
  experience: [
    {
      position: '3D & Full-Stack Engineer',
      company: 'Trimata',
      url: 'https://www.trimata.lt/',
      duration: 'Nov 2026 – Present',
      image: 'trimata.webp',
      descriptions: [
        'Build Trimata (Vilnius): interactive 3D product configurators, 3D product views with AR, and 3D visualisation for manufacturers and e-shops.',
        'Built live Three.js configurators for kitchens, saunas, doors, roofing and decks, embeddable on client sites with one line of code.',
        'Run sales, pricing, pilots with first clients, and the site with 100+ programmatic SEO pages.',
      ],
    },
    {
      position: 'Full-Stack Engineer',
      company: 'Bonder',
      url: 'https://bonder.lt/',
      duration: 'Aug 2026 – Oct 2026',
      startDate: '2026-08',
      endDate: '2026-10',
      image: 'bonder.webp',
      descriptions: [
        'Designed, built and launched an events platform for Vilnius and its native iOS app (live on the App Store since Oct 2026).',
        'Grew it to 12.7k unique visitors, 205 registered accounts and 1,068 events listed in three months, mostly through programmatic SEO.',
        'Built the event import pipeline (scrapers, LLM deduplication), analytics funnels and admin tooling.',
      ],
    },
    {
      position: 'Builder',
      company: 'Lost Astronaut',
      url: 'https://lostastronaut.space/',
      duration: 'Aug 2026 – Oct 2026',
      startDate: '2026-08',
      endDate: '2026-10',
      image: 'lostastronaut.webp',
      descriptions: [
        'Builder at Lost Astronaut, a venture investor and venture builder that develops startup concepts in-house and backs founders.',
        'Took venture concepts from idea to working, production-grade products.',
      ],
    },
    {
      position: 'Resident',
      company: 'Network School',
      url: 'https://ns.com/',
      duration: 'May 2026 – Jul 2026',
      startDate: '2026-05',
      endDate: '2026-07',
      image: 'networkschool.webp',
      descriptions: [
        'Spent two months at Network School, the startup society for builders and techno-optimists founded by Balaji Srinivasan.',
        'Lived and built alongside founders and engineers from around the world while shipping my own products.',
      ],
    },
    {
      position: 'Full Stack AI Engineer',
      company: 'Starkodas',
      duration: 'Apr 2026 – Present',
      image: 'starkodas.webp',
      descriptions: [
        'Built multi-tenant AI chatbot SaaS with an embeddable, knowledge-base-trained widget.',
        'RAG pipeline (crawl, chunk, embed, vector search via Firestore KNN) with confidence-based human handoff.',
        'Multi-LLM orchestration (OpenAI / Gemini / Anthropic), per-tenant isolation, API keys and model assignment.',
      ],
    },
    {
      position: 'Full Stack Software Engineer',
      company: 'Nordics Software',
      duration: 'Dec 2025 – Present',
      image: 'nordics.webp',
      descriptions: [
        'Building backend services in Go with clean architecture and REST APIs.',
        'Developing modern frontend applications using React and TypeScript.',
        'Designing and implementing full-stack features end-to-end, from database to UI.',
      ],
    },
    {
      position: 'Software Engineer',
      company: 'Danske Bank',
      duration: 'Nov 2024 – Dec 2025',
      image: 'danske.webp',
      descriptions: [
        'C#/.NET development with microservices.',
        'Worked with RabbitMQ, Apache Kafka, Terraform, Kubernetes, and CICD pipelines.',
        'Implemented integration testing using Testcontainers.',
      ],
    },
    {
      position: 'Freelance Full-Stack Developer',
      company: 'Freelance',
      duration: '2021 – Present',
      image: 'freelance.webp',
      descriptions: [
        'Delivered full-stack web solutions for clients including Coca-Cola Lithuania, NordiccSoftware, and several smaller businesses.',
        'Developed and maintained web applications, company websites, and internal systems using Java, C#, Go, and React.',
        'Built an HR system to streamline employee management processes.',
        'Developed a Coca-Cola lottery platform in Lithuania, ensuring scalability and reliability.',
        'Collaborated directly with clients to gather requirements, propose solutions, and deliver production-ready applications.',
      ],
    },

    {
      position: 'Software Engineer Intern',
      company: 'Swedbank',
      duration: 'Mar 2023 – June 2023 (3 Months)',
      image: 'swed.webp',
      descriptions: [
        'Developed an admin panel for managing car loan applications.',
        'Worked in a Scrum team using Java, Angular, TypeScript, and Agile methodologies.',
      ],
    },
    {
      position: 'Site Reliability Engineer Intern',
      company: 'Ruptela',
      duration: 'Dec 2022 – Mar 2023 (3 Months)',
      image: 'ruptela.webp',
      descriptions: [
        'Monitored system performance and reliability metrics using Prometheus and Grafana.',
        'Created and maintained CI/CD pipelines.',
      ],
    },
  ],

  // ============ CERTIFICATES ============
  certificates: [],

  // ============ BRANDS / LOGO STRIP ============
  brands: [
    'Java',
    'C#',
    'Go',
    'Python',
    'TypeScript',
    'JavaScript',
    'React',
    'Angular',
    'Spring',
    '.NET',
    'NodeJS',
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
  ],

  // ============ METRICS ============
  metrics: [
    {
      value: '20+',
      label: 'Projects Completed',
      description: 'Production-grade apps shipped to clients.',
    },
    {
      value: '5+',
      label: 'Years of Experience',
      description: 'Building robust software and AI solutions for 5+ years',
    },
    {
      value: '15+',
      label: 'Clients',
      description: 'From startups to enterprise clients like Coca-Cola',
    },
  ],

  // ============ CONTACT ============
  contact: {
    title: "Let's Get in Touch",
    description:
      'Feel free to reach out to me via email at motiejunasugnius@gmail.com or connect with me on LinkedIn. Open to collaboration, software engineering opportunities, and innovative projects.',
  },
};

export default info;
