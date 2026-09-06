import { ProjectItem, ExperienceItem, SkillCategory, EducationItem, CertificationItem, StationLocation } from '../types';

export const PORTFOLIO_INFO = {
  name: 'ASMAA BELKERROUCHE',
  codename: 'CYBER_OPERATIVE // AI_&_CYBERSECURITY_STUDENT',
  tagline: 'AI & Cybersecurity Student, Web & Desktop Application Developer',
  title: 'AI & Cybersecurity Student at ESTIN Higher School & Software Developer',
  bio: 'AI & Cybersecurity Student at ESTIN (Ecole Supérieure en Sciences et Technologies de l’Informatique et du Numérique) and Software Developer. Creator of custom desktop applications (such as the Air Algérie payroll platform for 300+ employees), automated business systems, full-stack web platforms, and modern software engineering solutions.',
  location: 'Bouira / Béjaïa / Algiers, Algeria',
  email: 'a_belkerrouche@estin.dz',
  phone: '0541728716',
  github: 'https://github.com/amsaqeeus',
  linkedin: 'https://www.linkedin.com/in/asma-belkerrouche-5a9365260/',
  status: 'SOFTWARE DEVELOPER & OPEN FOR PROJECTS',
  level: 99,
  languages: [
    { name: 'English', proficiency: 'Professional Working' },
    { name: 'French', proficiency: 'Fluent' },
    { name: 'Arabic', proficiency: 'Native' },
    { name: 'Kabyle', proficiency: 'Native' },
  ],
  stats: {
    projectsCount: 11,
    internshipsCount: 4,
    certsCount: 13,
    hackathonsWon: 4,
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'air-algerie-payroll-desktop',
    title: 'Air Algérie Payroll Desktop Application',
    category: 'Desktop & Automation',
    tagline: 'Dual-method automated payroll & shift calculation desktop platform for 300+ employees',
    description: 'A complete desktop application for Air Algérie to manage employee payroll, leave, and absences for over 300 employees using Python 3.12, CustomTkinter, and SQLite. Automates payroll calculation using two distinct methods (ADM 30-day base & Percentage shift rules), features Excel bulk import, intelligent shift detection, and automated color-coded Excel export. Packaged into a standalone executable with Inno Setup installer.',
    techStack: ['Python 3.12', 'CustomTkinter', 'SQLite', 'OpenPyXL', 'Pandas', 'Bcrypt', 'PyInstaller', 'Inno Setup'],
    features: [
      'Dual payroll calculation engines: ADM (30-day base, M-2 reference month) & Percentage shift calculation',
      'Automated shift rules: Friday hours (HV), Night hours (HN), Overtime (HS), Holiday hours (FH), Panier',
      'Full employee management: add, edit, delete, search by matricule/name, and bulk import from Excel',
      '9-category leave tracking (Congé, Maladie, Absence, Death, Marriage, Formation, Maternity, Missions)',
      'Automated color-coded Excel export and standalone single-file .exe with Inno Setup installer'
    ],
    metrics: 'Deployed for 300+ employees with dual automated payroll calculation pipelines',
    securityRating: 'ENTERPRISE-GRADE',
    githubUrl: 'https://github.com/amsaqeeus/air-algerie-payroll-desktop'
  },
  {
    id: 'crackguard-ai',
    title: 'CrackGuard.ai — Neural Time-to-Crack Regressor',
    category: 'AI Security',
    tagline: 'Client-side cryptographic analysis engine and real-world cryptanalysis platform',
    description: 'A client-side cryptographic analysis engine and machine learning regressor designed to calculate real-world password survivability. Unlike conventional meters that rely on simple character-set checklists, CrackGuard models adversarial attacks across dedicated GPU clusters, dictionary mutation rules, Markov n-gram transition trees, and neural synthesis networks.',
    techStack: ['Python', 'PyTorch', 'Scikit-learn', 'Markov Trees', 'Cryptography', 'FastAPI', 'React'],
    features: [
      'Dedicated GPU cluster cracking time simulation (RTX 4090 / A100 hash rates)',
      'Markov n-gram transition tree modeling probabilistic human password generation',
      'Neural synthesis network predicting human behavioral heuristics and password structure',
      'Effective search space reduction calculation across diverse modern hash algorithms'
    ],
    metrics: 'Real-world survivability analysis across GPU cluster attack scenarios',
    securityRating: 'CRYPTO-REGRESSOR',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'sentinel-ir',
    title: 'SentinelIR — Windows Endpoint Detection & IR',
    category: 'Incident Response',
    tagline: 'Lightweight EDR platform for Windows host monitoring, threat detection & incident triage',
    description: 'A Windows endpoint security monitoring and incident response platform built with Python. Continuously collects security-relevant evidence from the local host, analyzes data using multi-layered detection rules, correlates alerts into incidents, extracts Indicators of Compromise (IOCs), calculates a dynamic threat score, and presents the results through an interactive Streamlit security dashboard.',
    techStack: ['Python', 'Windows Security APIs', 'Streamlit', 'YARA/Sigma Rules', 'Threat Intel', 'IOC Extractor'],
    features: [
      'Continuous live Windows host telemetry and process behavioral collection',
      'Multi-rule threat detection engine correlating alerts into unified actionable incidents',
      'Automated extraction of Indicators of Compromise (IOCs: IPs, hashes, persistence keys)',
      'Interactive Streamlit SOC dashboard with real-time risk scoring and alert triage'
    ],
    metrics: 'EDR-style telemetry with real-time incident correlation and IOC extraction',
    securityRating: 'EDR-DEFENSE',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'osint-investigation-platform',
    title: 'OSINT Multi-Target Investigation Platform',
    category: 'Threat Intelligence',
    tagline: 'Automated intelligence aggregation & entity relationship mapping visualizer',
    description: 'An interactive Open Source Intelligence (OSINT) platform built with Python and NiceGUI that automates the investigation of domains, IP addresses, URLs, and file hashes. Aggregates data from multiple public cyber intelligence sources, evaluates composite security scores, and visualizes relationships between discovered entities through an interactive graph dashboard.',
    techStack: ['Python', 'NiceGUI', 'VirusTotal API', 'Shodan', 'NetworkX', 'Threat Intelligence'],
    features: [
      'Automated multi-target OSINT investigations (domains, IP addresses, URLs, file hashes)',
      'Multi-source public threat intelligence aggregation and composite reputation scoring',
      'Interactive entity relationship visualizer mapping pivots, certificates, and infrastructure links',
      'Automated intelligence briefing generation and structured report export'
    ],
    metrics: 'Aggregates threat intelligence across 10+ open-source reputation feeds',
    securityRating: 'INTEL-SPEC',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'slsa-supply-chain-risk',
    title: 'AI-Powered SLSA Software Supply Chain Risk Platform',
    category: 'Supply Chain Security',
    tagline: 'AI-powered security scanner for GitHub repositories with ML anomaly detection',
    description: 'AI-powered security scanner for software supply chains and GitHub repositories that detects vulnerabilities in dependencies and base images, generates Software Bill of Materials (SBOM), and delivers ML-based anomaly risk assessment with an Isolation Forest model (89% recall).',
    techStack: ['Python', 'Syft', 'Trivy', 'pip-audit', 'Isolation Forest', 'FastAPI', 'Docker', 'SBOM'],
    features: [
      'Multi-engine vulnerability scanning combining Syft, Trivy, and pip-audit',
      'Machine learning anomaly detection using Isolation Forest with 89% recall',
      'Cryptographically verifiable SBOM generation (SPDX and CycloneDX standards)',
      'Production-ready REST API with automated OpenAPI documentation'
    ],
    metrics: '89% recall on supply chain anomaly detection; SLSA Level 3 compliance audits',
    securityRating: 'SLSA-3',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'vulnscan-educational',
    title: 'VulnScan — Educational Vulnerability Scanner',
    category: 'Web Security',
    tagline: 'Full-stack vulnerability assessment platform with CVE database integration & live Celery worker scans',
    description: 'A comprehensive educational web application designed for learning vulnerability scanning and security assessment techniques. Provides TCP port scanning with configurable parameters, CVE integration with the National Vulnerability Database (NVD), secure JWT authentication with HTTP-only cookies, live scan progress tracking with Celery and Redis, and multi-format reports.',
    techStack: ['React 19', 'Vite', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
    features: [
      'Configurable TCP port scanning engine and service banner identification',
      'Automated CVE correlation via the National Vulnerability Database (NVD)',
      'Secure JWT authentication system with HTTP-only cookies',
      'Real-time background scanning queue powered by Celery and Redis with multi-format export (PDF, HTML, JSON)'
    ],
    metrics: 'Full-stack async scanning architecture with Docker containerization',
    securityRating: 'OWASP-HARDENED',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'fingerprint-recognition-rf',
    title: 'Biometric Fingerprint Recognition (Random Forest)',
    category: 'Biometrics',
    tagline: 'Biometric authentication system achieving 100% accuracy on FVC2002 benchmark dataset',
    description: 'Biometric authentication system implementing the Random Forest ensemble learning algorithm for fingerprint identification on the international FVC2002 fingerprint benchmark dataset. Achieves 100% classification accuracy by extracting minutiae patterns and biometric texture features.',
    techStack: ['Python', 'OpenCV', 'Scikit-learn', 'Random Forest', 'NumPy', 'FVC2002 Dataset'],
    features: [
      'Adaptive biometric image enhancement, binarization, and ridge thinning',
      'Crossing Number (CN) minutiae extraction (ridge endings and bifurcations)',
      'Random Forest ensemble classifier tuned for zero false acceptance rate',
      'Rigorous evaluation and 100% verification accuracy on FVC2002 benchmark'
    ],
    metrics: '100% classification accuracy on international FVC2002 fingerprint dataset',
    securityRating: 'BIO-METRIC',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'ai-phishing-detector',
    title: 'AI Phishing Email Detector',
    category: 'AI Security',
    tagline: 'Interactive NLP engine classifying deceptive emails into Safe, Suspicious, or Phishing with confidence score',
    description: 'An interactive artificial intelligence tool designed to detect malicious phishing emails before users fall victim to credential harvesting or financial fraud. Users paste any email, and the NLP classifier analyzes urgent linguistic cues, deceptive sender heuristics, and suspicious domain patterns to provide real-time confidence ratings.',
    techStack: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Pandas', 'Regex', 'Streamlit'],
    features: [
      'Three-tier risk rating: "Looks safe", "Suspicious / Medium risk", or "High probability phishing"',
      'Detection of urgency manipulation, spoofed authority, and fraudulent financial triggers',
      'Extraction and risk scoring of obfuscated links and suspicious domains',
      'Interactive, beginner-friendly web interface for email verification'
    ],
    metrics: 'High-precision NLP classifier trained on deceptive phishing corpora',
    securityRating: 'SOC-GUARD',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'gesturecam-vision',
    title: 'GestureCam — Touchless Gesture Camera',
    category: 'Computer Vision',
    tagline: 'Touchless webcam interface using MediaPipe 21-landmark tracking & real-time filter',
    description: 'GestureCam is a real-time gesture-controlled camera application developed using Python, OpenCV, and MediaPipe. Enables users to interact with a webcam without touching the keyboard or mouse by recognizing hand gestures in real time, cropping defined hand regions, and applying a lightweight beauty enhancement filter.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    features: [
      '21-landmark 3D hand tracking in real time via MediaPipe',
      'Touchless shutter and camera control triggered by recognized gestures',
      'User-defined hand bounding box region-of-interest cropping',
      'Lightweight real-time visual filter for enhanced captured image quality'
    ],
    metrics: 'Real-time 30+ FPS touchless gesture detection and action actuation',
    securityRating: 'VISION-AI',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'dz-immobilier',
    title: '1CS DZ-Immobilier Management Platform',
    category: 'Full-Stack Web',
    tagline: 'Modern full-stack real estate listing, management and client interaction platform',
    description: 'A modern full-stack real estate platform developed to simplify property listings, management, and client interactions in Algeria. Enables users to browse, publish, update, and manage property listings while providing administrators with comprehensive tools to curate platform content. Built using Node.js and Express.js with a clean RESTful architecture.',
    techStack: ['Node.js', 'Express.js', 'RESTful API', 'JavaScript', 'HTML5', 'CSS3'],
    features: [
      'Full CRUD property listings with image upload and category filtering',
      'Secure administrative dashboard for platform content moderation',
      'Modular RESTful backend architecture with clean separation of concerns',
      'Responsive UI for desktop and mobile property browsing'
    ],
    metrics: 'RESTful architecture powering complete real estate management workflows',
    securityRating: 'REST-SECURE',
    githubUrl: 'https://github.com/amsaqeeus'
  },
  {
    id: 'text-summarizer',
    title: 'Neural Text Summarizer',
    category: 'NLP & AI',
    tagline: 'Fast, production-ready NLP tool condensing long text into concise summaries',
    description: 'Production-ready NLP application that turns lengthy text, technical documents, and reports into crisp, high-impact summaries. Employs state-of-the-art transformer architectures to retain key semantic takeaways with speed and efficiency.',
    techStack: ['Python', 'Hugging Face Transformers', 'PyTorch', 'Streamlit'],
    features: [
      'Fast abstractive and extractive document summarization',
      'Configurable length and compression ratio controls',
      'Production-ready pipeline with low inference latency'
    ],
    metrics: 'Rapid document distillation with high semantic retention',
    securityRating: 'NLP-PROD',
    githubUrl: 'https://github.com/amsaqeeus'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'software-engineering-cyber',
    company: 'Software Engineering & Client Solutions',
    role: 'Web & Desktop Application Developer | Software Automation',
    period: 'Jun 2026 – Present',
    location: 'Remote / Worldwide',
    type: 'Software Development',
    summary: 'Delivering tailored desktop software, high-performance web applications, automated business solutions (payroll and shift management), security audits, and intelligent ML/RAG pipelines.',
    keyAchievements: [
      'Architected and delivered custom desktop applications using Python 3.12, CustomTkinter, and SQLite with automated installers.',
      'Developed full-stack web applications with Django, Node.js/Express, and React for client workflow automation.',
      'Designed custom business automation engines: automated multi-method payroll calculations and Excel bulk processing.',
      'Conducted web application security assessments, vulnerability scanning (Nmap, Wireshark), and system architecture reviews.',
      'Integrated Machine Learning, RAG (Retrieval-Augmented Generation), and anomaly detection into client software systems.'
    ],
    technologies: ['Desktop App Dev', 'Python', 'Django', 'React', 'JavaScript', 'Docker', 'Web Security', 'Automation', 'RAG', 'Payroll Management'],
    badgeColor: '#10b981'
  },
  {
    id: 'air-algerie',
    company: 'Air Algérie — Client Desktop Application',
    role: 'Desktop Application Developer (Contract / Project)',
    period: 'Aug 2026 · 1 mo',
    location: 'Algiers, Algeria (Hybrid)',
    type: 'Client Project',
    summary: 'Designed and developed a complete desktop application for Air Algérie to manage payroll for over 300 employees, automating multi-method calculations and administrative reporting.',
    keyAchievements: [
      'Designed and developed a complete desktop application for Air Algérie to manage payroll for over 300 employees.',
      'Automated payroll calculation using two methods (ADM 30-day base salary & Percentage shift calculations).',
      'Full employee management: add, edit, delete, and bulk import from Excel with matricule search.',
      'Integrated Excel planning import with intelligent shift detection (HV Friday hours, HN Night hours, HS Overtime, FH Holiday hours, Panier).',
      'Built with Python 3.12 and SQLite, packaged into a standalone executable with Inno Setup installer.',
      'Automated Excel export of payroll results with color-coded headers for administrative departments.',
      'Collaborated closely with HR teams to understand and digitize complex business rules.'
    ],
    technologies: ['Python 3.12', 'CustomTkinter', 'SQLite', 'OpenPyXL', 'Pandas', 'Bcrypt', 'PyInstaller', 'Inno Setup'],
    badgeColor: '#0066cc'
  },
  {
    id: 'dz-immobilier-project',
    company: '1CS DZ-Immobilier — Client Real Estate Platform',
    role: 'Full-Stack Web Developer (Client Project)',
    period: '2026',
    location: 'Algeria (Remote)',
    type: 'Client Web Project',
    summary: 'Engineered a modern full-stack real estate listing, administrative curation, and property management platform with a modular RESTful backend and responsive client interaction interface.',
    keyAchievements: [
      'Architected modular RESTful backend using Node.js and Express.js with clean separation of concerns.',
      'Implemented full CRUD property listing workflow with image asset management and structured property categorization.',
      'Built an administrative moderation panel allowing curators to review, approve, and manage public listings.',
      'Designed a responsive front-end interface optimized for fast property discovery on both mobile and desktop.'
    ],
    technologies: ['Node.js', 'Express.js', 'RESTful API', 'JavaScript', 'HTML5', 'CSS3', 'Backend Architecture'],
    badgeColor: '#00a8ff'
  },
  {
    id: 'tech-club-leadership',
    company: 'ESTIN Tech Club Leadership (Sirius & School of AI)',
    role: 'Event & Technical Communication Co-Manager',
    period: 'Oct 2023 – Jun 2025',
    location: 'Béjaïa, Algeria',
    type: 'Student Leadership & Community',
    summary: 'Co-managed communication, partner relations, and hackathon organization across major student tech clubs at ESTIN, engaging hundreds of engineering students in coding and AI initiatives.',
    keyAchievements: [
      'Spearheaded communications, marketing campaigns, and technical workshops across multiple digital channels.',
      'Connected with tech sponsors and industry partners to organize collaborative student hackathons.',
      'Fostered hands-on student participation in AI, computer science, and practical coding projects.'
    ],
    technologies: ['Team Leadership', 'Event Organization', 'Tech Community', 'Technical Communication', 'Partnerships'],
    badgeColor: '#f39c12'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    categoryName: 'Web & Desktop Application Engineering',
    iconName: 'Code',
    skills: [
      { name: 'Desktop Application Development', level: 96, category: 'Desktop Dev', yearsOrDepth: 'CustomTkinter, SQLite, PyInstaller, Inno Setup', specialty: 'Air Algérie payroll system (300+ employees)' },
      { name: 'Python (Programming Language)', level: 97, category: 'Core Language', yearsOrDepth: 'Advanced Python 3.12, Automation, OOP, Scripting', specialty: 'Desktop apps, security tools & ML models' },
      { name: 'Back-End Web Development (Django & Express)', level: 91, category: 'Back-End Web', yearsOrDepth: 'Django REST, Node.js, Express.js, JWT, REST APIs', specialty: 'VulnScan, DZ-Immobilier platform' },
      { name: 'JavaScript & Front-End Web (React)', level: 88, category: 'Web Development', yearsOrDepth: 'React 19, Vite, Tailwind CSS, Modern JS/TS', specialty: 'Dynamic SPAs & interactive dashboards' },
      { name: 'Payroll Management & Business Automation', level: 95, category: 'Automation', yearsOrDepth: 'Dual-engine ADM calculation & shift planning', specialty: 'OpenPyXL, Pandas, automated Excel exports' },
      { name: 'Software Integration & Git / Version Control', level: 92, category: 'Software Eng', yearsOrDepth: 'Git, GitHub, CI/CD, modular architecture', specialty: 'Clean code, branch management & packaging' },
      { name: 'Bash Scripting & Linux Tools', level: 93, category: 'Systems & Scripting', yearsOrDepth: 'Cisco Linux Unhatched, shell scripts, CLI tools', specialty: 'Process automation & system maintenance' }
    ]
  },
  {
    categoryName: 'Cybersecurity, Penetration Testing & IT Audit',
    iconName: 'ShieldAlert',
    skills: [
      { name: 'Web Application Security & URL Filtering', level: 91, category: 'AppSec', yearsOrDepth: 'OWASP Top 10, XSS, CSRF, URL filtering rules', specialty: 'Web defense, proxy rules & vulnerability triage' },
      { name: 'Vulnerability Scanning & Nmap', level: 90, category: 'Network Recon', yearsOrDepth: 'Nmap, Nessus, CVE correlation, NVD database', specialty: 'Port scanning, service discovery & banner grabbing' },
      { name: 'Penetration Testing & Wireshark', level: 89, category: 'Offensive / Defensive', yearsOrDepth: 'Deep packet inspection, ethical hacking, traffic analysis', specialty: 'CodeAlpha projects, packet forensics' },
      { name: 'IT Security Audit & Active Directory', level: 92, category: 'Audit & Governance', yearsOrDepth: 'Workstations, accounts & GPO policies', specialty: 'Naftal audit, WSUS deployment, password policies' },
      { name: 'Supply Chain Security & SBOM', level: 88, category: 'SecOps', yearsOrDepth: 'Syft, Trivy, pip-audit, SLSA framework', specialty: 'Automated SBOM audits & dependency scanning' },
      { name: 'Cisco Security & Packet Tracer', level: 90, category: 'Network Defense', yearsOrDepth: 'Cisco devices, switch/router configuration, ACLs', specialty: '7 Cisco labs, 12 Packet Tracer activities' },
      { name: 'Network Architecture & Infrastructure', level: 89, category: 'Networking', yearsOrDepth: 'Enterprise topology, banking networks, telecom', specialty: 'BDL Bank & Algérie Telecom infrastructure' }
    ]
  },
  {
    categoryName: 'Machine Learning, AI & Data Science',
    iconName: 'Sparkles',
    skills: [
      { name: 'RAG (Retrieval-Augmented Generation)', level: 88, category: 'GenAI / NLP', yearsOrDepth: 'Vector embeddings, semantic search, document retrieval', specialty: 'Intelligent contextual knowledge agents' },
      { name: 'Classification & Regression Models', level: 92, category: 'Machine Learning', yearsOrDepth: 'Random Forest, Scikit-learn, Time-to-Crack regression', specialty: 'CrackGuard.ai & Biometric authentication' },
      { name: 'Unsupervised Learning & Anomaly Detection', level: 89, category: 'AI Security', yearsOrDepth: 'Isolation Forest, clustering, feature modeling', specialty: 'SLSA supply chain risk intelligence (89% recall)' },
      { name: 'Datasets & Data Engineering', level: 91, category: 'Data Science', yearsOrDepth: 'Dataset curation, normalization, preprocessing', specialty: 'FVC2002 benchmark dataset, tabular pipelines' },
      { name: 'Computer Vision & Biometrics', level: 90, category: 'Vision AI', yearsOrDepth: 'OpenCV & MediaPipe 21-landmark tracking', specialty: 'GestureCam & Biometric fingerprinting (100%)' }
    ]
  },
  {
    categoryName: 'Systems, Virtualization & Professional Management',
    iconName: 'Cpu',
    skills: [
      { name: 'Virtualization (VMware & VirtualBox)', level: 92, category: 'Virtualization', yearsOrDepth: 'Isolated security lab setups, VM provisioning, networking', specialty: 'Malware analysis environments & testbeds' },
      { name: 'Docker & Containerization', level: 88, category: 'DevOps & Systems', yearsOrDepth: 'Intermediate Docker Certified, multi-stage images', specialty: 'Container networking, volume management' },
      { name: 'Computer Systems Analysis & CIS Management', level: 89, category: 'IT Architecture', yearsOrDepth: 'Information systems management, corporate IT audits', specialty: 'System administration, compliance & hardware' },
      { name: 'Problem Solving & Soft Skills', level: 95, category: 'Core Competency', yearsOrDepth: 'Analytical problem decomposition, team leadership', specialty: 'Agile project delivery, client requirements' },
      { name: 'Social Media & Club Management', level: 92, category: 'Leadership', yearsOrDepth: 'Tech club communications & external outreach', specialty: 'Sirius ESTIN & School of AI Béjaïa' }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Higher Studies in Computer Science (AI & Cybersecurity Focus)',
    institution: 'Ecole Supérieure en Sciences et Technologies de l’Informatique et du Numérique (ESTIN)',
    period: 'Sep 2022 – Present',
    location: 'Amizour, Béjaïa, Algeria',
    highlight: 'Prestigious National Higher School of Computer Science // Specializing in AI & Cybersecurity',
    details: [
      'Comprehensive curriculum spanning Artificial Intelligence, Cybersecurity, Applied Cryptography, Operating Systems, Computer Networks, Database Administration, and Machine Learning.',
      'Active leadership in student tech clubs: Co-managed communications for Sirius ESTIN and external relations for School of AI Béjaïa.',
      'Hands-on academic & technical projects covering enterprise desktop software (Air Algérie), cybersecurity auditing, EDR tools, neural networks, and machine learning classifiers.'
    ]
  },
  {
    degree: 'Baccalauréat, Sciences Expérimentales',
    institution: 'Lycée Polyvalent',
    period: 'Sep 2020 – Jun 2022',
    location: 'Bouira, Algeria',
    highlight: 'Grade: Excellent (High Honors)',
    details: [
      'Rigorous foundation in mathematics, physics, and computational logic with high academic distinction.',
      'Earned admission to the competitive national computer science higher school ESTIN.'
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Blue Team Junior Analyst (BTJA)',
    issuer: 'Centri',
    year: 'Jul 2026',
    badgeCode: 'CENTRI-BTJA'
  },
  {
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    year: 'Jun 2026',
    badgeCode: 'CISCO-JCA'
  },
  {
    title: 'Networking Devices and Initial Configuration',
    issuer: 'Cisco Networking Academy',
    year: 'Jun 2026',
    badgeCode: 'CISCO-NET-DEV'
  },
  {
    title: 'SQL for Database Administrators',
    issuer: 'DataCamp',
    year: 'Feb 2026',
    badgeCode: 'DATACAMP-SQL-DBA'
  },
  {
    title: 'Intermediate Docker',
    issuer: 'DataCamp',
    year: 'Feb 2026',
    badgeCode: 'DATACAMP-DOCKER'
  },
  {
    title: 'AI Security and Risk Management',
    issuer: 'DataCamp',
    year: 'Feb 2026',
    badgeCode: 'DATACAMP-AI-SEC'
  },
  {
    title: 'Cisco Network Defense',
    issuer: 'Cisco Networking Academy',
    year: 'Sep 2025',
    credentialId: '5bc64991-3b1a-4291-ae56-3ed131b9ce77',
    badgeCode: 'CISCO-NET-DEF'
  },
  {
    title: 'Datacom - Cybersecurity Job Simulation',
    issuer: 'Forage',
    year: 'Sep 2025',
    credentialId: 'XYyd8YxzebrJwYr45',
    badgeCode: 'FORAGE-DATACOM'
  },
  {
    title: 'Mastercard - Cybersecurity Job Simulation',
    issuer: 'Forage',
    year: 'Sep 2025',
    credentialId: 'XdeiW44x5eH3BRvTX',
    badgeCode: 'FORAGE-MASTERCARD'
  },
  {
    title: 'Advanced Diploma in Python Programming for the Novice to Expert',
    issuer: 'Alison',
    year: 'Sep 2025',
    badgeCode: 'ALISON-PYTHON'
  },
  {
    title: 'Cisco Networking (Networking Basics)',
    issuer: 'Cisco Networking Academy',
    year: 'Aug 2025',
    badgeCode: 'CISCO-NET-BASICS'
  },
  {
    title: 'Cisco Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: 'Aug 2025',
    badgeCode: 'CISCO-CYBER'
  },
  {
    title: 'Cisco Linux Unhatched',
    issuer: 'Cisco Networking Academy',
    year: 'Aug 2025',
    badgeCode: 'CISCO-LINUX'
  }
];

// Interactive 3D World Stations Positions (X, Y, Z coordinates inside the Office Room)
export const STATIONS: StationLocation[] = [
  {
    id: 'station-about',
    name: 'OPERATIVE DOSSIER',
    label: 'Folder: Biography & Lore',
    icon: 'User',
    color: '#00ff96',
    position: [-2.2, 0, -3.2],
    radius: 2.8,
    type: 'about'
  },
  {
    id: 'station-projects',
    name: 'PROJECTS ARCHIVE',
    label: 'Folder: 11 Production Tools',
    icon: 'FolderGit2',
    color: '#00ffff',
    position: [-6.8, 0, -4.8],
    radius: 2.8,
    type: 'projects'
  },
  {
    id: 'station-experience',
    name: 'CAREER & MISSIONS FILE',
    label: 'Folder: Experience & Engineering Missions',
    icon: 'Briefcase',
    color: '#ff007f',
    position: [6.8, 0, -4.8],
    radius: 2.8,
    type: 'experience'
  },
  {
    id: 'station-skills',
    name: 'SKILLS ARSENAL BINDER',
    label: 'Folder: 39 Tech Proficiencies',
    icon: 'Cpu',
    color: '#f1c40f',
    position: [-7.8, 0, 3.5],
    radius: 2.8,
    type: 'skills'
  },
  {
    id: 'station-certs',
    name: 'CERTIFICATIONS ARCHIVE',
    label: 'Folder: ESTIN & 13 Certs',
    icon: 'GraduationCap',
    color: '#9b59b6',
    position: [7.8, 0, 3.5],
    radius: 2.8,
    type: 'certs'
  },
  {
    id: 'station-contact',
    name: 'COMMS & DISPATCH DOSSIER',
    label: 'Folder: Contact & Social Frequencies',
    icon: 'Radio',
    color: '#2ecc71',
    position: [0, 0, 6.2],
    radius: 2.8,
    type: 'contact'
  }
];
