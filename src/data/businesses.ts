import {
  Code2, Ship, Shirt, Handshake, Briefcase, Users,
  ShieldCheck, Factory, BarChart3, Palette, Cloud, Globe, Bot,
} from 'lucide-react'

export interface SubService {
  slug: string
  icon: typeof Code2
  title: string
  body: string
  image: string
  features: string[]
}

export interface Business {
  slug: string
  icon: typeof Code2
  title: string
  body: string
  details: string
  features: string[]
  footer?: string
  image: string
  /** Direct MP4 URL that autoplays (muted, looped) on the sector's
   *  detail page. Pexels CDN URLs are used by default. */
  videoUrl?: string
  subServices?: SubService[]
}

export const businesses: Business[] = [
  {
    slug: 'it-software',
    icon: Code2,
    title: 'IT Software & Web Development',
    body: 'Custom software, web platforms, ERP systems, and infrastructure projects engineered for enterprises of every size.',
    details:
      'We design and develop custom software, scalable web platforms, enterprise ERP systems, and robust infrastructure solutions for businesses of all sizes. We also build custom AI solutions, including AI agents and prompt-based services, to automate processes, enhance decision-making, and improve operational efficiency.',
    features: [
      'Custom web & mobile applications',
      'ERP design and implementation',
      'Cloud migration (AWS / Azure / hybrid infrastructure)',
      'UI/UX research, design & engineering',
      'Cybersecurity assessments & system hardening',
      'Business intelligence dashboards & data analytics',
      'AI solutions, including AI agents and automation systems',
      'Prompt-based AI workflows & intelligent task automation',
      'MCP-based system integration for AI-connected applications',
      'API development & system integration services',
      'Scalable SaaS product development',
      'DevOps, CI/CD & infrastructure automation',
      'Legacy system modernization & digital transformation',
    ],
    footer:
      '🚀 We deliver end-to-end digital and AI-powered solutions built for scalability, security, and business growth.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4',
    subServices: [
      {
        slug: 'custom-software-development',
        icon: Code2,
        title: 'Custom Software Development',
        body: 'Bespoke software engineered around your exact workflows — from internal tools and ERPs to customer-facing SaaS products.',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
        features: [
          'Requirements analysis & solution architecture',
          'Custom web & desktop application development',
          'ERP, CRM & workflow automation systems',
          'SaaS product engineering',
          'API design & third-party integrations',
          'Long-term maintenance & support',
        ],
      },
      {
        slug: 'cyber-security',
        icon: ShieldCheck,
        title: 'Cyber Security & Ethical Hacking',
        body: 'End-to-end security assessments, penetration testing, and system hardening to protect your business from evolving threats.',
        image:
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        features: [
          'Vulnerability assessments & penetration testing',
          'Network & application security audits',
          'Security operations & incident response',
          'Ethical hacking & red-team engagements',
          'Compliance consulting (ISO 27001, GDPR, PCI-DSS)',
          'Security awareness training',
        ],
      },
      {
        slug: 'industries-services',
        icon: Factory,
        title: 'Industries Services',
        body: 'Industry-specific digital solutions for manufacturing, retail, logistics, healthcare, finance, and the public sector.',
        image:
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        features: [
          'Manufacturing & industrial automation software',
          'Retail & e-commerce platforms',
          'Logistics & supply-chain systems',
          'Healthcare & hospital management tools',
          'Fintech & digital banking solutions',
          'Government & public-sector digitalization',
        ],
      },
      {
        slug: 'data-analytics',
        icon: BarChart3,
        title: 'Data Analytics',
        body: 'Turn raw data into business intelligence with modern data platforms, dashboards, and predictive analytics.',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        features: [
          'Data warehousing & ETL pipelines',
          'Business intelligence dashboards (Power BI, Tableau, Looker)',
          'Predictive analytics & machine-learning models',
          'Real-time data streaming & monitoring',
          'Big-data engineering on cloud platforms',
          'KPI frameworks & reporting automation',
        ],
      },
      {
        slug: 'ui-ux-designing',
        icon: Palette,
        title: 'UI/UX Designing',
        body: 'Research-driven interface design that blends clarity, accessibility, and brand identity into delightful digital experiences.',
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=800&q=80',
        features: [
          'User research & journey mapping',
          'Wireframing & interactive prototyping',
          'Responsive web & mobile app design',
          'Design systems & component libraries',
          'Accessibility (WCAG) & usability testing',
          'Brand-aligned visual design',
        ],
      },
      {
        slug: 'aws-services',
        icon: Cloud,
        title: 'AWS Services',
        body: 'Certified AWS architecture, migration, and managed cloud operations built for scale, resilience, and cost efficiency.',
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        features: [
          'Cloud architecture & well-architected reviews',
          'Lift-and-shift & re-platform migrations',
          'Serverless (Lambda, API Gateway, DynamoDB) builds',
          'Container orchestration (ECS, EKS, Fargate)',
          'DevOps, CI/CD & infrastructure-as-code',
          'Cost optimization & 24×7 managed cloud ops',
        ],
      },
      {
        slug: 'web-design-development',
        icon: Globe,
        title: 'Web Design & Development',
        body: 'High-performance corporate websites, e-commerce platforms, and web applications built with modern frameworks.',
        image:
          'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
        features: [
          'Corporate websites & landing pages',
          'E-commerce stores (Shopify, WooCommerce, custom)',
          'Progressive web apps (PWAs)',
          'Headless CMS integrations',
          'SEO, performance & Core Web Vitals tuning',
          'Ongoing web maintenance & hosting support',
        ],
      },
      {
        slug: 'ai-agent-service',
        icon: Bot,
        title: 'AI Agent Service',
        body: 'Custom AI agents, prompt-based assistants, and intelligent automation built on modern LLMs and MCP integrations.',
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        features: [
          'Custom AI agents for business workflows',
          'Prompt engineering & RAG pipelines',
          'LLM integration (Claude, GPT, Gemini, open-source)',
          'MCP-based tool & system integrations',
          'Voice & chat conversational assistants',
          'AI-powered document processing & summarization',
          'Intelligent task automation & decision support',
          'Agent monitoring, evaluation & continuous tuning',
        ],
      },
    ],
  },
  {
    slug: 'export-import',
    icon: Ship,
    title: 'Global Trade & Supply Chain Solutions',
    body: 'International trade across multiple regions — sourcing, logistics, and end-to-end fulfilment.',
    details:
      'Yanabiya Gulf facilitates seamless international trade across multiple regions through a trusted network of logistics partners and deep expertise in local compliance. We manage the entire end-to-end value chain — from sourcing and consolidation to shipping, customs clearance, and final delivery — enabling our clients to focus on expanding their markets while we handle operational complexity.',
    features: [
      'Trade route planning, sourcing & supplier coordination',
      'International freight forwarding (sea, air, and land)',
      'Customs clearance, import/export compliance & documentation',
      'Warehousing, inventory management & last-mile delivery',
      'Trade finance advisory & payment structuring support',
      'Regulatory compliance & cross-border documentation handling',
      'Supply chain optimization & logistics management',
      'Cargo consolidation & shipment coordination',
      'Risk management & shipment tracking solutions',
      'Vendor sourcing & procurement support',
      'Dropshipping solutions & e-commerce fulfillment support',
      'Cold chain & specialized cargo handling (as required)',
      'End-to-end order fulfillment solutions',
    ],
    footer:
      '🚀 We deliver reliable, compliant, and efficient global trade operations designed to ensure smooth cross-border movement of goods and long-term business scalability.',
    image:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/32746861/13960848_2560_1440_60fps.mp4',
  },
  {
    slug: 'clothing',
    icon: Shirt,
    title: 'Clothing & Accessories',
    body: 'Garment and fashion-accessory trading with trusted manufacturers and retail partners.',
    details:
      'Our apparel division connects Bangladesh\u2019s world-class garment manufacturing capabilities with retailers, distributors, and brand partners across key international markets. We manage private-label production, quality assurance, sourcing, and brand collaboration — delivering end-to-end apparel supply chain solutions from factory floor to retail shelf.',
    features: [
      'Private-label manufacturing & brand development',
      'Bulk garment sourcing & production management',
      'Fashion accessories trading & supply',
      'Quality assurance & inspection programs',
      'Retail and wholesale partnership networks',
      'Ethical sourcing & compliance audits',
      'Custom apparel design & product development',
      'Fabric sourcing & material procurement',
      'OEM & ODM manufacturing solutions',
      'Sampling, prototyping & pre-production services',
      'Packaging, labeling & branding solutions',
      'Export documentation & logistics coordination',
      'Seasonal collection sourcing & trend support',
      'Inventory planning & bulk order fulfillment',
    ],
    footer:
      '🚀 We deliver scalable apparel sourcing and supply chain solutions focused on quality, reliability, and market responsiveness.',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/35469631/15027063_2560_1440_30fps.mp4',
  },
  {
    slug: 'agents-brokerage',
    icon: Handshake,
    title: '🤝 Agents & Brokerage',
    body: 'Commercial agency, representation, and brokerage services connecting global suppliers and buyers.',
    details:
      'Through our professional brokerage network, we represent suppliers, manufacturers, and institutions across key markets — connecting buyers with the right partners, structuring deals, and supporting transactions from initial engagement to successful closure.',
    features: [
      'Commercial agency representation',
      'Cross-border deal brokerage',
      'Market-entry consulting & partner identification',
      'Contract negotiation & deal structuring support',
      'Due diligence coordination & verification',
      'Strategic partnership matchmaking',
      'Business representation in target markets',
      'Supplier & buyer sourcing services',
      'Distribution partner identification',
      'Tender participation & bid facilitation',
      'Trade intermediary & commission-based representation',
      'Joint venture facilitation & collaboration support',
      'Business development & lead generation',
      'Memorandum of Understanding (MoU) coordination',
      'Transaction management & closing support',
    ],
    footer:
      '🚀 We enable efficient business connections, trusted partnerships, and structured commercial engagements across industries.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/8426053/8426053-uhd_2560_1440_25fps.mp4',
  },
  {
    slug: 'office-management',
    icon: Briefcase,
    title: 'Office Management Services',
    body: 'Corporate office administration, facilities, and back-office operations for growing businesses.',
    details:
      'We manage end-to-end back-office and administrative operations so our clients can focus on core business activities. From serviced offices and reception management to accounting support and compliance coordination, Yanabiya Group ensures smooth, professional, and efficient day-to-day administration.',
    features: [
      'Serviced office spaces & flexible workspace solutions',
      'Reception & secretarial support',
      'Document processing & administrative coordination',
      'Accounting, bookkeeping & payroll assistance',
      'Visa processing & PRO services',
      'Facilities & office operations management',
      'Business correspondence & mail handling',
      'Company formation & administrative setup support',
      'Meeting room & conference coordination',
      'Document control & records management',
      'HR administration & employee onboarding support',
      'Office procurement & vendor coordination',
      'Compliance tracking & renewal management',
      'Virtual office & remote administrative support',
      'Travel coordination & executive assistance',
    ],
    footer:
      '🚀 Structured administrative and operational support designed to enhance business efficiency and compliance.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/35454651/15020850_1080_1920_60fps.mp4',
  },
  {
    slug: 'manpower',
    icon: Users,
    title: 'Global Mobility & Workforce Services',
    body: 'Overseas employment, recruitment, student placements, aviation, and end-to-end mobility solutions.',
    details:
      'We provide comprehensive overseas employment, recruitment, and mobility solutions for individuals and organizations. From workforce sourcing and employer hiring to immigration guidance, student placements, and travel coordination, we manage the entire journey for working, studying, and relocating abroad. Our services cover compliance, mobilisation, settlement support, and aviation coordination aligned with destination-country regulations.',
    features: [
      'Skilled and semi-skilled workforce recruitment',
      'Employer hiring & overseas placement services',
      'Student placement & education pathway guidance',
      'Immigration & visa consultancy support',
      'Work permit processing & documentation',
      'Overseas job matching & career advisory',
      'Worker mobilisation & deployment coordination',
      'Settlement & relocation assistance',
      'Travel planning & international ticketing',
      'Aviation coordination & flight management',
      'Tour & travel services for individuals and groups',
      'Labour compliance & regulatory guidance',
      'Welfare support & post-deployment assistance',
      'Contract-based workforce supply solutions',
    ],
    footer:
      '🚀 End-to-end global mobility solutions for employment, education, and international relocation.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    videoUrl:
      'https://videos.pexels.com/video-files/32801087/13982978_2560_1440_30fps.mp4',
  },
]
