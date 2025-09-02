const info = {
  // ============ MAIN DETAILS ============
  main: {
    name: 'Ugnius Motiejunas',
    description:
      'Graduate software engineering student with a passion for technology and innovation. Quick learner, detail-oriented, and thrive in collaborative environments where I can contribute ideas and learn from others. Experienced in full-stack development, site reliability, and cloud-native systems.',
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
      title: 'Coca-Cola Lottery Web App',
      description:
        'A lottery web application built for official Coca-Cola Lithuania client. Developed with React, TypeScript, and Vite, featuring a fast, responsive interface and secure functionality for managing lottery entries.',
      technologies: 'React, TypeScript, Vite, HTML, CSS',
      github: 'https://github.com/kambalas/cocacola-lottery',
      link: 'https://kambalas.github.io/cocacola-lottery/',
    },

    {
      title: 'Business Website',
      description:
        'A modern business website built with Hugo for a client. Features dark mode, multilingual support, and lightning-fast performance. Currently used as a demo but ready for real-world deployment.',
      technologies: 'Hugo, HTML, CSS, JavaScript',
      github: 'https://github.com/kambalas/test-actions',
      link: 'https://kambalas.github.io/test-actions/en/',
    },

    {
      title: 'Car Loan Application Management System - Backend',
      description:
        'A comprehensive Spring Boot application designed to streamline and manage car loan applications. The backend handles secure user authentication, application submission workflows, administrative approval processes, and email notifications. Includes a fully documented RESTful API for front-end and third-party integration.',
      technologies:
        'Spring Boot, Spring Security, Hibernate, PostgreSQL, Gradle, JUnit, OAuth 2.0',
      github: 'https://github.com/kambalas/CarLease-Backend',
      link: '',
    },
    {
      title: 'Car Loan Application Management System - Frontend',
      description:
        'A responsive Angular application designed to complement the backend system by providing an intuitive user interface for applicants and administrators. Features secure login, application submission forms, a loan calculator, an admin dashboard for approvals, real-time notifications, and seamless API integration with the backend.',
      technologies:
        'Angular, TypeScript, Angular Material, RxJS, HTML, CSS, RESTful API',
      github: 'https://github.com/kambalas/CarLease-Frontend',
      link: '',
    },
    {
      title: 'LLM-Powered Web Scraper & Evaluator',
      description:
        'A Python-based framework for large-scale web scraping and structured data extraction using LLMs (OpenAI GPT, DeepSeek) and the Crawl4AI library. Supports asynchronous multiprocessing to handle hundreds of pages in parallel. Includes automated evaluation against ground-truth datasets with precision, recall, and F1-score metrics.',
      technologies:
        'Python, Crawl4AI, OpenAI GPT, DeepSeek, BM25, Multiprocessing',
      github: 'https://github.com/kambalas/crawlnew', // replace with the actual repo link if public
      link: '',
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
      position: 'Software Engineer',
      company: 'Danske Bank',
      duration: 'Nov 2024 – Present',
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

  // ============ CONTACT ============
  contact: {
    title: "Let's Get in Touch",
    description:
      'Feel free to reach out to me via email at motiejunasugnius@gmail.com or connect with me on LinkedIn. Open to collaboration, software engineering opportunities, and innovative projects.',
  },
};

export default info;
