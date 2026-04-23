import {
  Code2, Ship, Shirt, Handshake, Briefcase, Users,
  ShieldCheck, Factory, BarChart3, Palette, Cloud, Globe, Bot,
  MapPin, FileText, Package, DollarSign, Scale, Settings, Layers,
  Activity, Search, ShoppingCart, Thermometer, ClipboardList,
} from 'lucide-react'

export type CountryCode = 'OM' | 'GB' | 'BD' | 'US'

export interface CountryPresence {
  code: CountryCode
  /** Short (3–14 words) role-specific summary of what this country contributes
   *  to this business / sub-service. Shown under the country name on cards. */
  note: string
}

export interface SubService {
  slug: string
  icon: typeof Code2
  title: string
  body: string
  image: string
  features: string[]
  countries?: CountryPresence[]
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
  subServicesHeading?: string
  /** Direct MP4 URL that autoplays (muted, looped) on the sector's
   *  detail page. Pexels CDN URLs are used by default. */
  videoUrl?: string
  subServices?: SubService[]
  countries?: CountryPresence[]
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
    countries: [
      { code: 'OM', note: 'Delivery hub & regional client engagements across the Gulf.' },
      { code: 'GB', note: 'Enterprise architecture & client-facing teams for EMEA.' },
      { code: 'BD', note: 'Engineering centre — development, QA and 24×7 support.' },
      { code: 'US', note: 'North-America partnerships & cloud/AI advisory.' },
    ],
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
        countries: [
          { code: 'OM', note: 'Discovery & delivery for Gulf enterprises.' },
          { code: 'GB', note: 'Solution architecture & stakeholder workshops.' },
          { code: 'BD', note: 'Full-stack engineering & long-term maintenance.' },
          { code: 'US', note: 'Product strategy & US-market SaaS engagements.' },
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
        countries: [
          { code: 'OM', note: 'On-site assessments & regulator-aligned audits.' },
          { code: 'GB', note: 'GDPR/ISO 27001 compliance advisory.' },
          { code: 'BD', note: 'SOC operations, monitoring & incident response.' },
          { code: 'US', note: 'Red-team & penetration-testing engagements.' },
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
        countries: [
          { code: 'OM', note: 'Public-sector & logistics digitalization.' },
          { code: 'GB', note: 'Fintech & retail platform consulting.' },
          { code: 'BD', note: 'Manufacturing & healthcare engineering.' },
          { code: 'US', note: 'Industry partnerships & product pilots.' },
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
        countries: [
          { code: 'OM', note: 'Executive dashboards for Gulf enterprises.' },
          { code: 'GB', note: 'Analytics strategy & KPI frameworks.' },
          { code: 'BD', note: 'Data engineering & ML model development.' },
          { code: 'US', note: 'Predictive-analytics consulting.' },
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
        countries: [
          { code: 'OM', note: 'Bilingual (AR/EN) design for regional brands.' },
          { code: 'GB', note: 'Design strategy & brand workshops.' },
          { code: 'BD', note: 'Product design studio & prototyping.' },
          { code: 'US', note: 'UX research & usability testing.' },
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
        countries: [
          { code: 'OM', note: 'Cloud migrations for government & enterprise.' },
          { code: 'GB', note: 'Well-architected reviews & cost optimisation.' },
          { code: 'BD', note: '24×7 managed cloud operations.' },
          { code: 'US', note: 'Serverless & container-platform consulting.' },
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
        countries: [
          { code: 'OM', note: 'Corporate sites in Arabic/English.' },
          { code: 'GB', note: 'E-commerce & headless CMS builds.' },
          { code: 'BD', note: 'Full-stack web engineering & maintenance.' },
          { code: 'US', note: 'Performance, SEO & Core Web Vitals tuning.' },
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
        countries: [
          { code: 'OM', note: 'AI adoption & regulator-aware deployments.' },
          { code: 'GB', note: 'AI strategy & enterprise RAG pipelines.' },
          { code: 'BD', note: 'Agent engineering, evaluation & tuning.' },
          { code: 'US', note: 'Frontier-model integrations & MCP tooling.' },
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
    subServicesHeading: 'Explore Our Trade & Logistics Services',
    countries: [
      { code: 'OM', note: 'Regional hub — customs clearance & Gulf trade routes.' },
      { code: 'GB', note: 'EU/UK import coordination & compliance.' },
      { code: 'BD', note: 'Sourcing, consolidation & export documentation.' },
      { code: 'US', note: 'North-America distribution & last-mile delivery.' },
    ],
    subServices: [
      {
        slug: 'trade-route-planning',
        icon: MapPin,
        title: 'Trade Route Planning & Sourcing',
        body: 'Strategic planning of trade corridors and supplier networks to ensure the most efficient, cost-effective routes for your cargo.',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        features: [
          'Trade corridor analysis & route optimization',
          'Supplier identification & vetting',
          'Cost benchmarking & carrier selection',
          'Multi-modal route planning (sea, air, land)',
          'Supplier coordination & communication',
          'Lead time management & scheduling',
        ],
      },
      {
        slug: 'freight-forwarding',
        icon: Ship,
        title: 'International Freight Forwarding',
        body: 'End-to-end freight forwarding across sea, air, and land — connecting your shipments to global destinations reliably and on time.',
        image: 'https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?auto=format&fit=crop&w=800&q=80',
        features: [
          'Full container load (FCL) & less than container load (LCL)',
          'Air freight for time-sensitive cargo',
          'Road & rail cross-border transport',
          'Port-to-port & door-to-door services',
          'Freight rate negotiation & booking management',
          'Shipment scheduling & transit management',
        ],
      },
      {
        slug: 'customs-clearance',
        icon: FileText,
        title: 'Customs Clearance & Compliance',
        body: 'Expert customs clearance, import/export compliance, and documentation handling to ensure smooth cross-border movement of goods.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
        features: [
          'Import & export customs declarations',
          'HS code classification & duty calculation',
          'Customs bond management',
          'Trade compliance advisory',
          'Certificate of origin & documentation',
          'Liaison with customs authorities',
        ],
      },
      {
        slug: 'warehousing-delivery',
        icon: Package,
        title: 'Warehousing & Last-Mile Delivery',
        body: 'Secure warehousing, efficient inventory management, and reliable last-mile delivery solutions tailored to your business needs.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        features: [
          'Short & long-term warehousing solutions',
          'Inventory tracking & management systems',
          'Pick, pack & dispatch operations',
          'Last-mile delivery coordination',
          'Cross-docking & consolidation services',
          'Real-time stock visibility & reporting',
        ],
      },
      {
        slug: 'trade-finance',
        icon: DollarSign,
        title: 'Trade Finance & Payment Structuring',
        body: 'Advisory services on trade finance instruments and payment structures that reduce risk and improve cash flow across borders.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        features: [
          'Letter of credit (LC) advisory & facilitation',
          'Payment terms structuring & negotiation',
          'Trade credit & invoice financing guidance',
          'Foreign exchange risk advisory',
          'Bank guarantee coordination',
          'Working capital optimization support',
        ],
      },
      {
        slug: 'regulatory-compliance',
        icon: Scale,
        title: 'Regulatory Compliance & Documentation',
        body: 'Comprehensive handling of cross-border regulatory requirements and trade documentation to keep your shipments compliant.',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        features: [
          'Import/export licensing & permits',
          'Sanitary & phytosanitary (SPS) compliance',
          'Trade agreement utilization (FTA, GSP)',
          'Controlled goods & restricted item advisory',
          'Document preparation & verification',
          'Regulatory update monitoring',
        ],
      },
      {
        slug: 'supply-chain-optimization',
        icon: Settings,
        title: 'Supply Chain Optimization',
        body: 'End-to-end supply chain analysis and redesign to reduce costs, shorten lead times, and build resilience into your logistics network.',
        image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
        features: [
          'Supply chain mapping & visibility',
          'Lead time reduction strategies',
          'Supplier performance management',
          'Demand forecasting & inventory planning',
          'Cost-to-serve analysis',
          'Resilience & contingency planning',
        ],
      },
      {
        slug: 'cargo-consolidation',
        icon: Layers,
        title: 'Cargo Consolidation & Coordination',
        body: 'Groupage and consolidation services that combine smaller shipments into cost-efficient full loads for international movement.',
        image: 'https://images.unsplash.com/photo-1569913486515-b74bf7751574?auto=format&fit=crop&w=800&q=80',
        features: [
          'LCL consolidation & groupage services',
          'Multi-origin cargo consolidation',
          'Shipment coordination & scheduling',
          'Co-loading & shared container solutions',
          'Deconsolidation at destination',
          'Documentation for consolidated shipments',
        ],
      },
      {
        slug: 'risk-management-tracking',
        icon: Activity,
        title: 'Risk Management & Shipment Tracking',
        body: 'Real-time shipment visibility and proactive risk management to protect your cargo and ensure on-time delivery.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        features: [
          'Real-time cargo tracking & visibility',
          'Cargo insurance advisory & coordination',
          'Delay risk identification & mitigation',
          'Supply disruption contingency planning',
          'Exception management & alerts',
          'Post-shipment performance reporting',
        ],
      },
      {
        slug: 'vendor-sourcing',
        icon: Search,
        title: 'Vendor Sourcing & Procurement',
        body: 'Trusted vendor identification, qualification, and procurement support to build reliable supply partnerships globally.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        features: [
          'Global supplier identification & shortlisting',
          'Supplier audits & qualification',
          'RFQ / RFP preparation & management',
          'Price negotiation & contract support',
          'Procurement process outsourcing',
          'Ongoing vendor relationship management',
        ],
      },
      {
        slug: 'dropshipping-ecommerce',
        icon: ShoppingCart,
        title: 'Dropshipping & E-Commerce Fulfillment',
        body: 'Seamless dropshipping and e-commerce fulfillment solutions connecting your online store to global customers efficiently.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
        features: [
          'Dropshipping supplier coordination',
          'E-commerce order processing & fulfillment',
          'Returns management & reverse logistics',
          'Marketplace integration support (Amazon, Noon)',
          'Packaging & branded fulfillment',
          'International shipping for online sellers',
        ],
      },
      {
        slug: 'cold-chain-cargo',
        icon: Thermometer,
        title: 'Cold Chain & Specialized Cargo',
        body: 'Temperature-controlled and specialized cargo handling for perishables, pharmaceuticals, and sensitive goods requiring precise conditions.',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80',
        features: [
          'Refrigerated container (reefer) booking & monitoring',
          'Temperature-controlled warehousing',
          'Pharmaceutical & healthcare cold chain',
          'Perishable food transport & handling',
          'Hazardous materials (HAZMAT) coordination',
          'Oversized & project cargo solutions',
        ],
      },
      {
        slug: 'order-fulfillment',
        icon: ClipboardList,
        title: 'End-to-End Order Fulfillment',
        body: 'Complete order fulfillment management from purchase order issuance through final delivery — one point of contact for the entire journey.',
        image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
        features: [
          'Purchase order management & tracking',
          'Factory & supplier follow-up',
          'Quality inspection coordination',
          'Packing, labeling & shipping preparation',
          'Customs & delivery management',
          'End-to-end status reporting & communication',
        ],
      },
    ],
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
    countries: [
      { code: 'OM', note: 'Regional distribution & GCC retail partnerships.' },
      { code: 'GB', note: 'Brand partnerships & UK/EU retail buyers.' },
      { code: 'BD', note: 'Manufacturing hub — production, QA & compliance.' },
      { code: 'US', note: 'Wholesale & private-label brand distribution.' },
    ],
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
    countries: [
      { code: 'OM', note: 'Commercial agency representation across the Gulf.' },
      { code: 'GB', note: 'EU/UK market-entry advisory & partner sourcing.' },
      { code: 'BD', note: 'Supplier representation & buyer matchmaking.' },
      { code: 'US', note: 'Cross-border deal structuring & closing support.' },
    ],
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
    countries: [
      { code: 'OM', note: 'Serviced offices, PRO & visa services in Muscat.' },
      { code: 'GB', note: 'Virtual office & EU-facing administration.' },
      { code: 'BD', note: 'Back-office, bookkeeping & document processing.' },
      { code: 'US', note: 'Registered agent & corporate administration support.' },
    ],
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
    countries: [
      { code: 'OM', note: 'Employer hiring & overseas deployment coordination.' },
      { code: 'GB', note: 'Student placements, UK visa & settlement guidance.' },
      { code: 'BD', note: 'Source market — recruitment, training & mobilisation.' },
      { code: 'US', note: 'Work-visa advisory & professional placements.' },
    ],
  },
]
