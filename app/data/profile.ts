// Single source of truth for every piece of content on the site.
// Pages, the home page previews, the command palette and the AI companion all read from here.

export type Accent = 'silver' | 'cyan' | 'lime' | 'magenta' | 'amber';

export const ACCENTS: Record<Accent, string> = {
  silver: '#ECEFF1',
  cyan: '#00E5FF',
  lime: '#AEEA00',
  magenta: '#D500F7',
  amber: '#FFB300',
};

export interface Media {
  label: string;
  src: string;
  alt: string;
}

export const PROFILE = {
  name: 'Ozan Özen',
  shortTitle: 'AI · Language · Technology',
  roles: ['English Language Educator', 'AI Model Trainer', 'Tech Journalist'],
  tagline:
    'Shaping the frontier of language and logic. English Language Educator, AI Model Trainer, and Tech Journalist bridging the gap between human expression and machine intelligence.',
  location: 'Ankara, TR',
  locationFull: 'Ankara, Türkiye',
  timezone: 'Europe/Istanbul',
  year: '2026',
  email: 'ozanozen05@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ozan-özen-6a46a82a3',
  siteUrl: 'https://kneezen.github.io',
};

export const MARQUEE_ITEMS = ['AI Training', 'ELT Pedagogy', 'Tech Journalism', 'Software Architecture', '3D Printing', 'Hardware Analytics'];

export const PILLARS = [
  {
    tag: '01 // AI TRAINING',
    title: 'AI Language Architect',
    desc: 'Training advanced large language models to master contextual nuance, reasoning, and human-like interaction at Outlier.',
    href: '/experience',
    accent: 'cyan' as Accent,
  },
  {
    tag: '02 // ACADEMIA & PEDAGOGY',
    title: 'Educational Innovator',
    desc: 'Revolutionizing English Language Teaching at TED University through digital storytelling, interactive frameworks, and modern pedagogy.',
    href: '/education',
    accent: 'lime' as Accent,
  },
  {
    tag: '03 // EDTECH ARCHITECTURE',
    title: 'Digital Learning Architect',
    desc: 'Blending custom 3D game engines, 5E storytelling frameworks, and Web 2.0 micro-portals to revolutionize grammar retention and learner engagement.',
    href: '/projects',
    accent: 'magenta' as Accent,
  },
];

/* ───────────────────────── ABOUT ───────────────────────── */

export const MANIFESTO = [
  {
    tag: 'MISSION STATEMENT',
    content:
      "I work at the intersection of human language and cognitive computing. Whether I'm building a classroom lesson plan or training a large language model, my approach is grounded in the same core principle: decode complexity, encode clarity, and deliver meaning with zero signal loss.",
  },
  {
    tag: 'THE NARRATIVE',
    content:
      "My deep dive into language didn't start in a university lecture hall, but during an intensive English teaching curriculum in high school. That early exposure built a strong instinct for grammar and phonology long before I formally studied pedagogy. Today, that foundation drives a dual path: studying and applying modern teaching methodologies at TED University, while simultaneously training large language models to parse context, nuance, and advanced semantic reasoning at Outlier. Navigating daily life in Tokyo and Beijing gave me firsthand insights into cross-cultural communication, a perspective that now informs every teaching framework and AI evaluation rubric I build.",
  },
  {
    tag: 'ADMINISTRATIVE TRAJECTORY',
    content:
      'An organizational approach driven by a systematic reliance on clear, structured lesson planning. My expertise centers on designing deeply scaffolded educational environments to balance cognitive load and maximize target-language output. By combining Vygotskyan social cognitive theories with structured, data-informed design, I treat language learning as an active, living operating system.',
  },
  {
    tag: 'METHODOLOGICAL STACK',
    content:
      "Whether I'm optimizing an LLM or teaching a communicative language class, I rely on the same core principles: clear instructions, logical sequencing, and the elimination of ambiguity. I put this into practice through a defined methodological stack: Communicative Language Teaching (CLT) for authentic interaction, Presentation-Practice-Production (PPP) loops for systematic acquisition, the 5E Instructional Model for engaging narratives, and UNESCO-aligned PREPARE frameworks for creating accessible and effective learning materials.",
  },
];

export const CONTACT_BLURB =
  "I'm always open to discussing new ideas, innovative projects, or future collaborations. Whether you want to talk about AI language models, modern pedagogy, or simply say hello, feel free to reach out via email or connect with me on LinkedIn.";

/* ───────────────────────── EXPERIENCE ───────────────────────── */

export interface TimelineEntry {
  id: string;
  company: string;
  role: string;
  tag: string;
  period: string;
  status: 'ACTIVE' | 'COMPLETED';
  content: string;
  metrics: string[];
  layout: 'dual' | 'stack';
  media: (Media & { contain?: boolean })[];
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'outlier',
    company: 'Outlier',
    role: 'Administrator & AI Model Trainer',
    tag: 'OUTLIER // ADMINISTRATOR & AI MODEL TRAINER',
    period: '2024 – Present',
    status: 'ACTIVE',
    content:
      'Evaluate and curate dataset training environments for high-tier large language models within the Milky Way and Lightspeed tracking frameworks. Monitor model accuracy benchmarks, linguistic alignment, metadata validation, and conversational reasoning pipelines. Responsible for routing complex multi-turn dialogue evaluations and maintaining strict error tolerance across prompt-response pairs in advanced reasoning tasks.',
    metrics: ['Milky Way Framework', 'Lightspeed Accuracy', 'Multi-Turn Dialogue', 'Sub-1% Error Tolerance'],
    layout: 'dual',
    media: [
      { label: 'CORPORATE IDENTITY // FRONTIER_ALIGNMENT', src: '/32476_32476_OutlierAIlogo.webp', alt: 'Outlier AI Logo' },
      { label: 'SYSTEM ENVIRONMENT // HUMAN_BRILLIANCE_INTERFACE', src: '/z6BS3awu1NyauoW9fWBXTFepDo.png', alt: 'Outlier UI Capture' },
    ],
  },
  {
    id: 'technopat',
    company: 'Technopat',
    role: 'Technology Journalist',
    tag: 'TECHNOPAT // TECHNOLOGY JOURNALIST',
    period: '2024 – 2026',
    status: 'COMPLETED',
    content:
      'Translate hardware innovations, processing breakthroughs, and digital ecosystem trends into sharp, accessible technical narratives for consumers. Conduct hands-on RTX graphics hardware testing and benchmarking, write in-depth Fedora Linux kernel optimization guides, and analyze next-generation processing stacks, including AMD Zen architectures and Intel hybrid core topologies. Ensure editorial accuracy across GPU tier-lists and thermal performance deep-dives.',
    metrics: ['RTX Benchmarking', 'Linux Kernel Guides', 'GPU Analytics', 'Thermal Analysis'],
    layout: 'stack',
    media: [
      { label: 'EDITORIAL MASTHEAD // HARDWARE_LOGS', src: '/Technopat-Logo-1619x1080.jpg', alt: 'Technopat Master Logo' },
      { label: 'COMMUNITY PLATFORM // SOCIAL_INTERFACE_CAPTURE', src: '/Screenshot 2026-06-03 181414.png', alt: 'Technopat Social Interface Overview' },
    ],
  },
  {
    id: 'british-side',
    company: 'British Side',
    role: 'Examination Invigilator',
    tag: 'BRITISH SIDE // EXAMINATION INVIGILATOR',
    period: '2024 – Present',
    status: 'ACTIVE',
    content:
      'Managed operational compliance and security for international English-language examinations under British Council standardized protocols. Ensured strict adherence to regulatory frameworks, covering candidate identity verification, test-center conditions, synchronized timing, and the secure handling of post-examination materials.',
    metrics: ['British Council Protocol', 'Chain-of-Custody', 'Compliance Audit', 'Timing Sync'],
    layout: 'stack',
    media: [
      { label: 'REGULATORY PROTOCOL // INTERFACE_PORTAL', src: '/Screenshot 2026-06-03 175834.png', alt: 'British Side Portal Capture' },
      { label: 'ADMINISTRATIVE ALIGNMENT // CREDENTIAL_LOGS', src: '/Screenshot 2026-06-03 180009.png', alt: 'British Side Verification Capture' },
    ],
  },
];

/* ───────────────────────── EDUCATION ───────────────────────── */

export const INSTITUTION = {
  name: 'TED University',
  facts: [
    ['Location', 'Ankara, Türkiye'],
    ['Program', 'English Language Teaching (ELT)'],
    ['Status', '3rd-Year Undergraduate'],
    ['Track', 'Teacher Education & Applied Linguistics'],
  ] as [string, string][],
  image: { label: 'ARTIFACT_IMG_01 // CAMPUS_OVERVIEW', src: '/image_d874e4.jpg', alt: 'TED University campus' },
};

export const PEDAGOGY_STATEMENT =
  'Training centers around deploying student-centered frameworks that prioritize active target-language production, moving decisively away from archaic rote memorization paradigms. The pedagogical philosophy is grounded in the belief that language acquisition occurs most effectively when learners are immersed in authentic communicative contexts with structured scaffolding that is gradually removed as competence develops.';

export const METHODOLOGIES = [
  {
    code: 'CLT',
    name: 'Communicative Language Teaching',
    desc: 'Structuring realistic, high-impact communicative goals that prioritize meaning negotiation over mechanical accuracy. Lessons are built around authentic discourse scenarios, such as information gaps, role-plays, and opinion exchanges, that force genuine target-language production rather than scripted repetition.',
  },
  {
    code: 'PPP',
    name: 'Presentation → Practice → Production',
    desc: 'Designing systematic lessons through a clean three-phase architecture: controlled Presentation of target structures, guided Practice through scaffolded activities, and autonomous Production where learners deploy acquired language in unscripted, communicative contexts with decreasing teacher intervention.',
  },
  {
    code: 'PREPARE',
    name: 'UNESCO PREPARE Framework',
    desc: 'Utilizing structured UNESCO metrics to generate equitable, high-impact lesson outlines and acoustic educational materials. This framework emphasizes inclusive design, ensuring lesson accessibility across diverse learner profiles while maintaining rigorous pedagogical standards and measurable learning outcomes.',
  },
];

export const SOCIETIES = [
  {
    title: 'Institutional Footprint',
    desc: 'Active engagement within the TED University Directorate of Social and Cultural Affairs, participating in campus ecosystems focused on democratic participation, peer mentoring, and community building.',
  },
  {
    title: 'Competency Frameworks',
    desc: 'Researching and implementing digital competency frameworks and sustainable development goals (SDGs) to bridge the gap between regional student societies and global academic standards.',
  },
];

export const ERASMUS = {
  title: 'GLOBAL MOBILITY CLEARANCE',
  content:
    'Successfully vetted and cleared for the international Erasmus+ Student Mobility tracks for the 2025–2026 academic calendar. This milestone validates cross-institutional academic standing and opens pathways for embedded pedagogical research within European university systems.',
  badge: 'Erasmus+ Cleared // 2025–2026',
};

/* ───────────────────────── PROJECTS ───────────────────────── */

export const FIVE_E_STAGES = [
  { code: 'E1', name: 'Engage', desc: 'Activate prior knowledge through mystery-driven prompts and visual storytelling hooks.' },
  { code: 'E2', name: 'Explore', desc: 'Guided investigation of narrative elements through collaborative pair and group tasks.' },
  { code: 'E3', name: 'Explain', desc: 'Explicit instruction on target grammar and vocabulary within the narrative context.' },
  { code: 'E4', name: 'Elaborate', desc: 'Extended production activities where learners create original story branches.' },
  { code: 'E5', name: 'Evaluate', desc: 'Formative and summative assessment through storytelling performance tasks.' },
];

export interface Project {
  id: string;
  index: string;
  title: string;
  tag: string;
  kicker: string;
  content: string;
  metrics: string[];
  stages?: typeof FIVE_E_STAGES;
  link?: string;
  linkText?: string;
  layout: 'dual' | 'grid' | 'wide';
  media: Media[];
  cover: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'race-engine',
    index: '01',
    title: 'Linguistic Race Engine',
    tag: 'LINGUISTIC RACE ENGINE',
    kicker: 'Gamified Syntax & Vocabulary Module',
    content:
      'A custom-developed, gamified racing game module engineered to supercharge classroom interaction. It leverages competitive, rapid-fire sequencing mechanics and real-time vocabulary matching to turn syntactic drills into an active, high-velocity learning experience.',
    metrics: ['Gamified Learning', 'Real-Time Sequencing', 'Syntactic Drills', 'Interactive Module'],
    layout: 'dual',
    cover: '/The 3D driving simulator view.jpg',
    media: [
      { label: 'ENGINE METRICS // THREE.JS_WORKSPACE', src: '/The Three.js coin collection code view.jpg', alt: 'Three.js Code Workspace' },
      { label: 'CAPTURE MATRIX // 3D_DRIVING_VIEW', src: '/The 3D driving simulator view.jpg', alt: '3D Driving Simulator' },
    ],
  },
  {
    id: 'backpack-mysteries',
    index: '02',
    title: 'Backpack Mysteries',
    tag: 'THE "BACKPACK MYSTERIES" MODULE',
    kicker: '5E Model Narrative Framework',
    content:
      'A comprehensive digital storytelling narrative designed for 6th-grade learners, fully scaffolded via the 5E Model (Engage, Explore, Explain, Elaborate, Evaluate) to drive contextual grammar retention. Designed to transform passive grammar instruction into an immersive narrative experience.',
    metrics: ['Digital Storytelling', '5E Model', 'Grade 6', 'Contextual Grammar', 'Narrative Experience'],
    stages: FIVE_E_STAGES,
    link: 'https://gamma.app/docs/Backpack-Mysteries-Telling-What-Happened-s6pnsanpxvctzom',
    linkText: 'VIEW SLIDE DECK // GAMMA_ENGINE →',
    layout: 'grid',
    cover: '/Screenshot 2026-06-03 175203.png',
    media: [
      { label: 'INSTRUCTIONAL CANVAS // SLIDE_01', src: '/Screenshot 2026-06-03 175203.png', alt: 'Gamma Slide 01' },
      { label: 'TASK SCAFOLDING // SLIDE_02', src: '/Screenshot 2026-06-03 175224.png', alt: 'Gamma Slide 02' },
      { label: 'GRAMMAR EXCEPTIONS // SLIDE_03', src: '/Screenshot 2026-06-03 175242.png', alt: 'Gamma Slide 03' },
      { label: 'PRACTICE ASSESSMENT // SLIDE_04', src: '/Screenshot 2026-06-03 175302.png', alt: 'Gamma Slide 04' },
    ],
  },
  {
    id: 'whose-is-it',
    index: '03',
    title: '“Whose Is It?” Grammar Engine',
    tag: '"WHOSE IS IT?" INTERACTIVE GRAMMAR ENGINE',
    kicker: 'Web 2.0 Inquiry Portal',
    content:
      'An inductive, inquiry-based grammar portal custom-engineered for 3rd-grade language learners. The platform systematically integrates an ecosystem of digital tools, including Bubbl.us concept mapping, Canva designs, Wordwall modules, StoryJumper digital books, Google Forms evaluation metrics, and Suno.com auditory assets, allowing students to apply, analyze, and evaluate possessive pronoun constructs within an active clothing-themed communicative network.',
    metrics: ['Web 2.0 Ecosystem', 'Inquiry-Based Learning', 'Grade 3', 'Digital Orchestration'],
    link: 'https://sites.google.com/view/possessive-pronouns-clothes/main-page',
    linkText: 'LAUNCH LIVE PORTAL // EXTERNAL_LINK →',
    layout: 'wide',
    cover: '/Web.2.0.png',
    media: [{ label: 'PORTAL OVERVIEW // WEB_2.0_ECOSYSTEM', src: '/Web.2.0.png', alt: 'Web 2.0 Interactive Grammar Engine' }],
  },
];

/* ───────────────────────── CERTIFICATIONS ───────────────────────── */

export interface Certification {
  tag: string;
  title: string;
  issuer: 'Web 2.0' | 'UC Irvine' | 'IBM SkillsBuild' | 'LinkedIn Learning';
  content: string;
  metrics: string[];
  image: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    tag: 'WEB 2.0 TOOL INTEGRATION',
    title: 'Web 2.0 Tool Integration',
    issuer: 'Web 2.0',
    content:
      'Completed advanced certification focused on deploying and managing modern Web 2.0 digital ecosystems in educational environments. Mastery of integrating platforms like Wordwall, Bubbl.us, Canva, and StoryJumper into systematic inquiry-based language learning modules.',
    metrics: ['Digital Ecosystems', 'EdTech Deployment', 'Interactive Tooling', 'System Integration'],
    image: '/houston_web2_certificate.png',
  },
  {
    tag: 'TEACHING TIPS FOR TRICKY ENGLISH GRAMMAR',
    title: 'Teaching Tips for Tricky English Grammar',
    issuer: 'UC Irvine',
    content:
      'Specialized credentialing in addressing high-friction grammatical concepts. Focused on utilizing structured Presentation-Practice-Production (PPP) pipelines and contextual scaffolding to resolve persistent learner errors in complex syntax and morphosyntactic structures.',
    metrics: ['Syntax Resolution', 'Contextual Scaffolding', 'PPP Pipelines', 'Error Remediation'],
    image: '/uci_grammar_certificate.png',
  },
  {
    tag: 'IBM SKILLSBUILD // BUILD YOUR FIRST CHATBOT',
    title: 'Build Your First Chatbot',
    issuer: 'IBM SkillsBuild',
    content:
      'Completed rigorous technical training within the IBM SkillsBuild enterprise framework to architect and deploy intelligent conversational agents. This certification covers the end-to-end lifecycle of chatbot development, including intent classification, entity extraction, dialogue flow design, and integration with Watson assistant technologies to handle complex, multi-turn user interactions.',
    metrics: ['Conversational AI', 'IBM SkillsBuild', 'Dialogue Flow', 'Watson Technologies'],
    image: '/ibm_chatbot_badge.png',
  },
  {
    tag: 'IBM SKILLSBUILD // GRANITE MODELS FOR SOFTWARE DEVELOPMENT',
    title: 'Granite Models for Software Development',
    issuer: 'IBM SkillsBuild',
    content:
      "Mastered the application of IBM's proprietary Granite foundational models designed specifically for enterprise-grade software engineering. The certification focuses on leveraging highly-specialized large language models to accelerate code generation, optimize software architectures, and streamline complex development workflows within secure, professional environments.",
    metrics: ['IBM Granite Models', 'LLM Deployment', 'Code Generation', 'Enterprise AI'],
    image: '/ibm_granite_badge.png',
  },
  {
    tag: 'LINKEDIN LEARNING // CRITICAL THINKING & DECISION MAKING',
    title: 'Critical Thinking & Decision Making',
    issuer: 'LinkedIn Learning',
    content:
      'Advanced professional credentialing focused on high-stakes analytical reasoning and strategic decision-making frameworks. Mastery of neutralizing cognitive biases, structuring complex problem-solving architectures, and executing data-driven judgments within fast-paced enterprise environments.',
    metrics: ['Analytical Reasoning', 'Cognitive Architecture', 'Decision-Making', 'Strategic Framing'],
    image: '/linkedin_critical_thinking.png',
  },
  {
    tag: 'IBM SKILLSBUILD // BUILD AN AI AGENT',
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    content:
      'Completed advanced architectural training in designing and deploying autonomous AI agents. Expertise in integrating large language models with tool-use capabilities, orchestrating multi-agent systems, and building robust, production-ready AI frameworks capable of executing complex, multi-step reasoning workflows independently.',
    metrics: ['Autonomous Agents', 'LLM Orchestration', 'Multi-Agent Systems', 'Tool Integration'],
    image: '/ibm_ai_agent.png',
  },
  {
    tag: 'IBM SKILLSBUILD // WEB DEVELOPMENT FUNDAMENTALS',
    title: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    content:
      "Earned professional certification in core web development principles through IBM's SkillsBuild platform. Comprehensive mastery of HTML5, CSS3, and JavaScript fundamentals, along with responsive design methodologies, accessibility standards, and modern front-end development workflows essential for building production-grade web applications.",
    metrics: ['HTML5 & CSS3', 'JavaScript', 'Responsive Design', 'Front-End Architecture'],
    image: '/Screenshot 2026-06-25 162819.png',
  },
  {
    tag: 'IBM SKILLSBUILD // ARTIFICIAL INTELLIGENCE FUNDAMENTALS',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    content:
      "Completed foundational certification in artificial intelligence through IBM's enterprise learning ecosystem. Deep understanding of core AI concepts including machine learning paradigms, neural network architectures, natural language processing pipelines, and the ethical frameworks governing responsible AI deployment across industry verticals.",
    metrics: ['Machine Learning', 'Neural Networks', 'NLP Pipelines', 'AI Ethics'],
    image: '/Screenshot 2026-06-25 162838.png',
  },
  {
    tag: 'LINKEDIN LEARNING // WHAT IS GENERATIVE AI?',
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    content:
      'Advanced professional credentialing in the foundational principles and enterprise applications of generative artificial intelligence. Mastery of large language model architectures, diffusion-based generation systems, prompt engineering methodologies, and the strategic frameworks for evaluating and deploying generative AI solutions within professional workflows.',
    metrics: ['Generative AI', 'LLM Architecture', 'Prompt Engineering', 'AI Strategy'],
    image: '/Screenshot 2026-06-25 162755.png',
  },
];

/* ───────────────────────── CV ───────────────────────── */

export interface CvEntry {
  label: string;
  value: string;
  link?: { href: string; text: string };
}

export const CV_SECTIONS: { category: string; entries: CvEntry[] }[] = [
  {
    category: 'EDUCATION & ENGAGEMENT',
    entries: [
      { label: 'Institution', value: 'TED University, Ankara, Türkiye' },
      { label: 'Program', value: 'English Language Teaching (ELT)' },
      { label: 'Status', value: '3rd-Year Undergraduate' },
      { label: 'Track', value: 'Teacher Education & Applied Linguistics' },
      { label: 'Mobility', value: 'Erasmus+ Cleared (2025–2026)' },
      { label: 'Society', value: 'Directorate of Social and Cultural Affairs Engagement' },
    ],
  },
  {
    category: 'EXPERIENCE',
    entries: [
      { label: 'Outlier', value: 'Project Administrator (2024–Present)' },
      { label: 'Outlier', value: 'AI Language Model Trainer (2024–Present)' },
      { label: 'Technopat', value: 'Technology Journalist (2024–2026)' },
      { label: 'British Side', value: 'Examination Invigilator (2024–Present)' },
      { label: 'Freelance', value: 'Digital Architecture & UI/UX Design' },
      { label: 'Academic', value: 'Pedagogical Materials Developer' },
    ],
  },
  {
    category: 'PROJECTS & MODULES',
    entries: [
      { label: 'Race Engine', value: 'Linguistic Race Engine | Gamified Syntax & Vocabulary Module' },
      {
        label: 'Storytelling',
        value: 'Backpack Mysteries | 5E Model Narrative Framework',
        link: { href: 'https://gamma.app/docs/Backpack-Mysteries-Telling-What-Happened-s6pnsanpxvctzom', text: 'GAMMA_ENGINE' },
      },
      { label: 'Suite', value: 'Interactive Engagement Suite | Kahoot, Design-a-Creature, Robot Architecture' },
      {
        label: 'Grammar',
        value: 'Whose Is It? Interactive Grammar Engine',
        link: { href: 'https://sites.google.com/view/possessive-pronouns-clothes/main-page', text: 'LIVE LINK' },
      },
    ],
  },
  {
    category: 'TECHNICAL COMPETENCIES',
    entries: [
      { label: 'AI/ML', value: 'LLM Training, Dataset Curation, Prompt Engineering, Accuracy Benchmarking' },
      { label: 'Journalism', value: 'Technical Writing, Hardware Analysis, Trend Reporting, GPU Benchmarking' },
      { label: 'Fabrication', value: '3D Printing, Rapid Prototyping, CAD Modeling' },
      { label: 'Software', value: 'Web Architecture, Next.js, TypeScript, Modern Frameworks' },
      { label: 'Systems', value: 'Fedora Linux, Kernel Optimization, CLI Workflows' },
    ],
  },
  {
    category: 'METHODOLOGICAL STACK',
    entries: [
      { label: 'CLT', value: 'Communicative Language Teaching | Meaning-Focused Interaction' },
      { label: 'PPP', value: 'Presentation → Practice → Production Pipeline' },
      { label: 'PREPARE', value: 'UNESCO Equitable Lesson Framework & Acoustic Materials' },
      { label: '5E Model', value: 'Engage → Explore → Explain → Elaborate → Evaluate' },
    ],
  },
];

/* ───────────────────────── NAVIGATION ───────────────────────── */

export const NAV = [
  { label: 'About', href: '/about', accent: 'silver' as Accent, code: 'PHILOSOPHY' },
  { label: 'Experience', href: '/experience', accent: 'cyan' as Accent, code: 'CHRONOLOGY' },
  { label: 'Education', href: '/education', accent: 'lime' as Accent, code: 'ACADEMIA' },
  { label: 'Projects', href: '/projects', accent: 'magenta' as Accent, code: 'ARCHIVE' },
  { label: 'Certifications', href: '/certifications', accent: 'amber' as Accent, code: 'CREDENTIALS' },
  { label: 'CV', href: '/cv', accent: 'amber' as Accent, code: 'VITAE' },
];

export const VIDEOS: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  certifications: 'certifications',
  cv: 'cv',
  network: 'network',
  rain: 'rain',
};
