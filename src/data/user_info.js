const info = {
  // ============ MAIN DETAILS ============
  main: {
    name: 'Ugnius Motiejunas',
    description:
  'AI Engineer building intelligent systems that help businesses automate workflows, unlock insights from data, and operate more efficiently. Combines strong full-stack engineering foundations with hands-on experience in scalable AI and LLM-powered applications.',
    role: 'Software Engineer',
    photo: 'photo.webp',
    email: 'motiejunasugnius@gmail.com',
  },

  // ============ SOCIAL LINKS ============
  socials: {
    twitter: '',
    github: 'https://github.com/kambalas',
    linkedin: 'https://www.linkedin.com/in/ugniusmotiejunas/',
    instagram: '',
    facebook: '',
  },

  // ============ PROJECTS ============
  projects: [
    {
      title: 'RAG Assistant – YouTube Transcript Pipeline',
      description:
        'Upload a YouTube video and the system automatically transcribes it, organizes the content, and stores it in a searchable knowledge database. Instead of manually reviewing hours of footage, you can instantly find specific topics, answers, or key moments.',
      technologies:
        'Python, FastAPI, OpenAI Embeddings, Supabase, pgvector, httpx, Pydantic, pytest',
      github: 'https://github.com/kambalas/RAG-Agent',
      link: '',
      image: 'projects/rag-assistant.png',
      slug: 'rag-assistant',
      details:
        'A production-grade RAG data pipeline built with FastAPI and Python. Upload a YouTube video and the system automatically transcribes it, organizes the content, and stores it in a searchable knowledge database. Instead of manually reviewing hours of footage, you can instantly find specific topics, answers, or key moments.',
      features: [
        'End-to-end async pipeline: fetch → chunk → embed → store',
        'OpenAI text-embedding-3-small (1536d) with batched API calls',
        'Supabase pgvector storage with IVFFlat cosine similarity index',
        'Deduplication by video ID — skips already-processed videos',
        'Retry logic for transient API errors (408/429/500/503)',
        'Four-stage processing lifecycle with per-video status tracking',
        '26 tests across 5 modules with fully mocked external dependencies',
        'Strict type checking with mypy and linting with ruff',
      ],
      useCases: [
        {
          title: 'Corporate Training',
          description:
            'Index internal video libraries into a searchable knowledge base — cut onboarding time and reduce trainer costs.',
        },
        {
          title: 'Customer Support AI',
          description:
            'Power support bots with product tutorial transcripts, deflecting tickets and lowering support headcount.',
        },
        {
          title: 'E-Learning Platforms',
          description:
            'Enable semantic search across course content so learners find answers instantly, boosting retention and reducing churn.',
        },
        {
          title: 'Content Repurposing',
          description:
            'Agencies auto-extract key moments from hours of footage, shipping newsletters and clips in minutes instead of days.',
        },
      ],
    },

    {
      title: 'LLM-Powered Web Scraper & Evaluator',
      description:
        'An intelligent web scraping system that converts complex web pages into structured, actionable data. Uses large language models to extract meaningful information and relevance ranking to filter high-quality results. Designed for high-volume processing with built-in accuracy evaluation, making it suitable for production environments where data quality and reliability matter.',
      technologies:
        'Python, Crawl4AI, OpenAI, DeepSeek, BM25, Multiprocessing',
      github: 'https://github.com/kambalas/crawlnew',
      link: '',
      image: 'projects/llm-scraper.png',
      slug: 'llm-scraper',
      details:
        'An intelligent web scraping system that converts complex web pages into structured, actionable data. Uses large language models to extract meaningful information and relevance ranking to filter high-quality results. Designed for high-volume processing with built-in accuracy evaluation, making it suitable for production environments where data quality and reliability matter.',
      features: [
        'Asynchronous web scraping with Crawl4AI',
        'LLM-based structured data extraction (OpenAI, DeepSeek, etc...)',
        'BM25 relevance ranking for page prioritization',
        'Parallel processing via Python multiprocessing',
        'Automated evaluation with precision, recall, and F1 metrics',
        'Configurable extraction schemas for different domains',
      ],
      useCases: [
        {
          title: 'Market Intelligence',
          description:
            'Continuously monitor competitor pricing and product updates, giving sales teams an edge without manual research.',
        },
        {
          title: 'Lead Generation',
          description:
            'Extract structured contact and company data from directories at scale, reducing prospecting costs by hours per week.',
        },
        {
          title: 'Financial Research',
          description:
            'Aggregate earnings data and news across hundreds of filings overnight, enabling faster investment decisions.',
        },
        {
          title: 'E-Commerce Monitoring',
          description:
            'Track stock levels and listings across platforms to optimise pricing and avoid lost sales.',
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
      image: 'projects/cocacola.png',
      slug: 'cocacola-lottery',
      details:
        'Built for Coca-Cola Lithuania as a freelance engagement. The platform manages a full lottery lifecycle — from user registration and entry submission to randomized winner selection and announcement. Emphasis was placed on a smooth mobile-first UX, fast load times via Vite, and a clean admin workflow.',
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
      title: 'Business Website',
      description:
        'A modern business website built with Hugo for a client. Features dark mode, multilingual support, and lightning-fast performance. Currently used as a demo but ready for real-world deployment.',
      technologies: 'Hugo, HTML, CSS, JavaScript',
      github: 'https://github.com/kambalas/test-actions',
      link: 'https://kambalas.github.io/test-actions/en/',
      image: 'projects/business-website.png',
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
      value: '5',
      label: 'Projects Completed',
      description: 'Production-grade apps shipped to real clients.',
    },
    {
      value: '4+',
      label: 'Years of Experience',
      description: 'Building software across fintech, SRE, and web.',
    },
    {
      value: '4',
      label: 'Clients',
      description: 'From startups to enterprise like Coca-Cola',
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
