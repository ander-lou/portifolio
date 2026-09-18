import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Linkedin,
  Lock,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react'
import { lazy, Suspense, type FormEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react'

const BlackHoleCanvas = lazy(() => import('./BlackHoleCanvas'))

const base = import.meta.env.BASE_URL
const whatsapp =
  'https://wa.me/5585996584857?text=Ol%C3%A1%2C%20Anderson!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.'
const courseVideo = 'https://drive.google.com/file/d/1f-vY1wQSqUmM3U3NrX02XZO61YdH_Mup/view?usp=sharing'
const coursePasswordHash = '8fe5e7c0fd4dcd9f53beef9d01650f87546d8e7a2faf79f1b167871802a6e14c'

type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  description: string
  cover: string
  color: string
  ink: 'dark' | 'light'
  tags: string[]
}

const projects: Project[] = [
  {
    slug: 'azo-sistemas',
    number: '01',
    title: 'Azo Sistemas',
    eyebrow: 'Retail ERP · Web & mobile',
    description:
      'A research-led redesign that reorganized a complex retail management platform and translated it into a responsive product system.',
    cover: `${base}images/azo-cover.webp`,
    color: '#dff5f8',
    ink: 'dark',
    tags: ['Discovery', 'Information architecture', 'UX/UI Design'],
  },
  {
    slug: 'ummo',
    number: '02',
    title: 'UMMO',
    eyebrow: 'Edtech · Mobile product',
    description:
      'An online-learning experience shaped around study routines, visible progress and feedback that keeps learners engaged.',
    cover: `${base}images/ummo-cover.webp`,
    color: '#f8b5d8',
    ink: 'dark',
    tags: ['Research', 'Product strategy', 'Usability testing'],
  },
  {
    slug: 'carteira-advisor',
    number: '03',
    title: 'Carteira Advisor',
    eyebrow: 'Fintech · B2B platform',
    description:
      'Rebranding and product interface standardization for an investment platform, connecting clearer journeys with more efficient implementation.',
    cover: `${base}images/carteira-advisor.png`,
    color: '#6b39e8',
    ink: 'light',
    tags: ['Product design', 'Rebranding', 'Design system'],
  },
]

const experience = [
  {
    role: 'Senior UX/UI Designer',
    company: 'Performa IT · Pague Menos account',
    period: 'Feb 2026 — Present',
    place: 'Fortaleza, Brazil',
    description:
      'Leading the evolution of the Pague Menos e-commerce experience: customer journeys, Home and PDP redesigns, usability testing, behavioral analytics and Design System evolution.',
  },
  {
    role: 'Senior Product Designer',
    company: 'Quattrus · Freelance',
    period: 'Mar 2025 — Jun 2026',
    place: 'Remote',
    description:
      'Designed end-to-end flows, wireframes and high-fidelity prototypes for ERP products, including a mobile experience redesign and metric-informed product decisions.',
  },
  {
    role: 'Senior UX Designer',
    company: 'Labsit',
    period: 'Apr 2023 — Jun 2025',
    place: 'Remote',
    description:
      'Worked across B2B and B2C products in investments, healthcare, workforce management, credit and marketplaces, from UX assessment to responsive delivery.',
  },
  {
    role: 'UX/UI Design Instructor',
    company: 'Juventude Digital',
    period: 'Oct 2023 — Oct 2024',
    place: 'Fortaleza, Brazil',
    description:
      'Taught practical UX, UI and Figma courses. The final 2023 cycle reached 92% NPS, 84% participation and 58% completion.',
  },
  {
    role: 'UX/UI Designer',
    company: 'Kand-ID',
    period: 'Nov 2022 — Mar 2024',
    place: 'Remote',
    description:
      'Partnered with ICC Biolabs on healthcare journeys, market research, product requirements, MVP definition and responsive prototypes.',
  },
  {
    role: 'Junior UX Designer',
    company: 'Rodobank',
    period: 'Jun 2022 — Mar 2023',
    place: 'Fortaleza, Brazil',
    description:
      'Redesigned fintech experiences serving more than 80,000 users, connecting research, interface design, product metrics and engineering collaboration.',
  },
]

const skillGroups = [
  {
    title: 'Product thinking',
    items: ['Discovery', 'User research', 'User flows', 'Design Thinking', 'Hypothesis validation'],
  },
  {
    title: 'Craft & systems',
    items: ['UI Design', 'Prototyping', 'Responsive design', 'Design Systems', 'Accessibility'],
  },
  {
    title: 'Evidence & delivery',
    items: ['Usability testing', 'Google Analytics', 'Hotjar', 'Microsoft Clarity', 'Maze'],
  },
  {
    title: 'Tools & technology',
    items: ['Figma', 'Framer', 'Spline', 'JavaScript', 'TypeScript', 'React Native'],
  },
]

type CaseData = {
  project: Project
  intro: string
  meta: Array<[string, string]>
  proof: Array<[string, string]>
  sections: Array<{
    eyebrow: string
    title: string
    paragraphs: string[]
    bullets?: string[]
    image?: string
    imageAlt?: string
  }>
  sourceHref: string
  sourceLabel: string
  note?: string
}

const cases: Record<string, CaseData> = {
  'azo-sistemas': {
    project: projects[0],
    intro:
      'Azo is a business-management product for general retail and fashion businesses. The redesign turned an expansive operational structure into a clearer, responsive web and mobile experience.',
    meta: [
      ['Role', 'UX/UI Design'],
      ['Duration', '16 weeks'],
      ['Platforms', 'Web and mobile'],
      ['Tools', 'Figma, Optimal Workshop, Attention Insight'],
    ],
    proof: [
      ['7', 'remote card-sorting sessions'],
      ['10', 'tree-testing sessions'],
      ['+9%', 'dashboard clarity in attention analysis'],
      ['+9.8%', 'sales visibility in attention analysis'],
    ],
    sections: [
      {
        eyebrow: '01 · Map',
        title: 'Make the complexity visible before redesigning it.',
        paragraphs: [
          'The work began by understanding the company, the audience and the existing product flow. Mapping the platform exposed structural issues before visual decisions entered the conversation.',
          'Personas were built from business material to keep the redesign anchored in two retail realities: a generalist operation and a fashion-focused business.',
        ],
        bullets: [
          'Mapped the current product and its operational dependencies',
          'Created personas to frame needs and pain points',
          'Connected new requirements to the existing platform structure',
        ],
      },
      {
        eyebrow: '02 · Research',
        title: 'Rebuild the information architecture with users.',
        paragraphs: [
          'A remote card sort tested 30 functional categories and surfaced more intuitive groupings. The first taxonomy was then evaluated through tree testing in two rounds, with five tasks per round.',
          'The resulting architecture reduced ambiguity and organized seven main categories, creating a more stable foundation for future features.',
        ],
        image: `${base}images/azo-research.webp`,
        imageAlt: 'Card sorting, tree testing and the revised Azo information architecture',
      },
      {
        eyebrow: '03 · Design & validation',
        title: 'A system that holds together from dashboard to mobile.',
        paragraphs: [
          'The interface was rebuilt from a shared style guide using Atomic Design principles. Components covered navigation, form controls, data tables, charts, feedback states and subscription moments.',
          'Low-fidelity mobile screens helped translate desktop functionality before high-fidelity delivery. Attention analysis then guided iterations in dashboard hierarchy and key financial signals.',
        ],
        bullets: [
          'Responsive web and mobile screen set',
          'Reusable component language and spacing rules',
          'Clearer visibility for results, sales and expenses',
        ],
        image: `${base}images/azo-results.webp`,
        imageAlt: 'Azo dashboard, client list and subscription interface',
      },
    ],
    sourceHref: 'https://www.behance.net/gallery/218491911/Azo-Sistemas-Web-App',
    sourceLabel: 'View original Behance case',
  },
  ummo: {
    project: projects[1],
    intro:
      'UMMO explores a practical question: how might a distance-learning product help students build a study routine, understand their progress and complete more of what they start?',
    meta: [
      ['Role', 'Research, flows, wireframes, UI and testing'],
      ['Team', 'Lia Feijó + Anderson Loureiro'],
      ['Duration', '16 weeks'],
      ['Platform', 'Mobile'],
    ],
    proof: [
      ['31', 'survey respondents'],
      ['5', 'qualitative interviews'],
      ['92.3%', 'reported difficulty balancing study and other activities'],
      ['5', 'participants in usability testing'],
    ],
    sections: [
      {
        eyebrow: '01 · Understand',
        title: 'Dropout was a routine problem, not a motivation slogan.',
        paragraphs: [
          'The research combined a 31-person survey with five interviews. Time management and inconsistent study routines emerged as the strongest barriers.',
          'Students valued visible progress, practical reinforcement and short-term goals. They also needed feedback that explained mistakes instead of merely marking them wrong.',
        ],
        bullets: [
          '42.8% rated their time-management skills poor or very poor',
          '46.2% could not establish a study routine',
          'A journey map connected planning, study, portfolio and job-search moments',
        ],
        image: `${base}images/ummo-research.webp`,
        imageAlt: 'UMMO research findings, persona, journey map and prioritization matrix',
      },
      {
        eyebrow: '02 · Decide',
        title: 'Prioritize actions that make progress tangible.',
        paragraphs: [
          'An impact-versus-effort matrix focused the concept on a personalized study plan, progress feedback, reminders, practice reviews and a point system connected to useful rewards.',
          'The information architecture connected course discovery, a routine questionnaire, study plan, lessons, feedback, challenges and the learner profile.',
        ],
      },
      {
        eyebrow: '03 · Test & refine',
        title: 'Prototype early enough to change the structure.',
        paragraphs: [
          'Five people completed a medium-fidelity usability script. Half had trouble choosing times for multiple study days, leading to a redesigned schedule flow with an “apply to all days” option.',
          'Half also wanted the overall course score visible from the beginning. The dashboard was adjusted to show total progress and the points available for exchange.',
        ],
        bullets: [
          'Study-plan questionnaire and weekly schedule',
          'Course progress, lesson review and explanatory feedback',
          'Reminders, incentives and visible achievement loops',
        ],
        image: `${base}images/ummo-results.webp`,
        imageAlt: 'Final UMMO mobile screens for study planning, lessons and progress',
      },
    ],
    sourceHref: 'https://www.behance.net/gallery/195294943/UXUI-Estudo-de-caso-Ummo',
    sourceLabel: 'View original Behance case',
  },
  'carteira-advisor': {
    project: projects[2],
    intro:
      'A B2B investment platform for advisors, managers and family offices. My work at Labsit focused on rebranding, navigation flows and interface standardization across responsive experiences.',
    meta: [
      ['Role', 'Senior UX Designer'],
      ['Context', 'Labsit client project'],
      ['Platforms', 'Responsive web and mobile'],
      ['Focus', 'Rebranding and product consistency'],
    ],
    proof: [
      ['B2B', 'investment-management context'],
      ['Web + mobile', 'responsive product surfaces'],
      ['System', 'reusable patterns and components'],
      ['Handoff', 'closer design and front-end alignment'],
    ],
    sections: [
      {
        eyebrow: '01 · Product context',
        title: 'Dense financial information needs a calm hierarchy.',
        paragraphs: [
          'The public product consolidates investment portfolios and supports performance, allocation, reporting and client-management workflows. That breadth makes navigation clarity and visual consistency essential.',
          'The design work evaluated product journeys across responsive web and mobile and translated the rebrand into reusable interface decisions.',
        ],
      },
      {
        eyebrow: '02 · Contribution',
        title: 'Standardize the experience without flattening the product.',
        paragraphs: [
          'The contribution covered UX assessments, redesigned navigation flows, low- and high-fidelity prototypes and close collaboration with front-end teams on features and reusable components.',
          'The resulting standardization strengthened visual consistency and made implementation more direct across a complex product ecosystem.',
        ],
        bullets: [
          'Responsive flows for B2B investment journeys',
          'Rebranding translated into product UI',
          'Reusable components aligned with engineering',
        ],
      },
      {
        eyebrow: '03 · Next detail',
        title: 'An initial case page, ready for deeper evidence.',
        paragraphs: [
          'This first version uses the verified scope from the resume and the current public product context. Research artifacts, before-and-after screens and private outcomes can be added as they become available.',
        ],
      },
    ],
    sourceHref: 'https://www.carteiraadvisor.com/',
    sourceLabel: 'Visit product website',
    note: 'Initial case framing based on the current resume and public product information.',
  },
}

function Brand({ dark = true }: { dark?: boolean }) {
  return (
    <a className={`brand ${dark ? 'brand--light' : ''}`} href={`${base}#top`} aria-label="Anderson Loureiro — home">
      <span className="brand-mark">AL</span>
      <span>Anderson Loureiro</span>
    </a>
  )
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const links = [
    ['About', '#about'],
    ['Work', '#work'],
    ['Expertise', '#expertise'],
    ['Journey', '#journey'],
  ]

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer">
        WhatsApp <ArrowUpRight size={15} />
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className={`mobile-nav ${open ? 'is-open' : ''}`}>
        {links.map(([label, href], index) => (
          <a key={href} href={href} onClick={() => setOpen(false)}><span>{label}</span><small>0{index + 1}</small></a>
        ))}
        <a className="mobile-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">Start a conversation <MessageCircle size={19} /></a>
      </div>
    </header>
  )
}

function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const courseDialogRef = useRef<HTMLDialogElement>(null)
  const [coursePassword, setCoursePassword] = useState('')
  const [courseError, setCourseError] = useState('')

  useEffect(() => {
    document.title = 'Anderson Loureiro — Senior Product Designer'
  }, [])

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = heroRef.current
    if (!hero) return

    const bounds = hero.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const offsetX = x - 0.5
    const offsetY = y - 0.5

    hero.style.setProperty('--tilt-x', `${(0.5 - y) * 2.8}deg`)
    hero.style.setProperty('--tilt-y', `${offsetX * 3.6}deg`)
    hero.style.setProperty('--shift-x', `${offsetX * 8}px`)
    hero.style.setProperty('--shift-y', `${offsetY * 7}px`)
    hero.style.setProperty('--black-hole-x', `${offsetX * -28}px`)
    hero.style.setProperty('--black-hole-y', `${offsetY * -20}px`)
  }

  const resetHeroInteraction = () => {
    const hero = heroRef.current
    if (!hero) return

    for (const property of ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y', '--black-hole-x', '--black-hole-y']) {
      hero.style.removeProperty(property)
    }
  }

  const openCourseAccess = () => {
    setCoursePassword('')
    setCourseError('')
    courseDialogRef.current?.showModal()
  }

  const closeCourseAccess = () => {
    courseDialogRef.current?.close()
  }

  const handleCourseAccess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const bytes = new TextEncoder().encode(coursePassword)
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')

    if (hash !== coursePasswordHash) {
      setCourseError('Incorrect password. Check it and try again.')
      return
    }

    setCourseError('')
    courseDialogRef.current?.close()
    window.location.assign(courseVideo)
  }

  return (
    <main id="top">
      <Navigation />
      <section ref={heroRef} className="hero" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroInteraction}>
        <div className="hero-universe" aria-hidden="true">
          <div className="black-hole-field" />
          <Suspense fallback={null}><BlackHoleCanvas /></Suspense>
        </div>
        <div className="hero-copy">
          <p className="kicker">Senior UX/UI & Product Designer · Fortaleza, Brazil</p>
          <h1>Turning complex products into <em>clear decisions.</em></h1>
          <p className="hero-summary">Six years designing e-commerce, ERP, fintech and healthcare products — from research and systems thinking to interfaces that engineering can ship.</p>
          <div className="hero-actions">
            <a className="button button--accent" href="#work">Explore selected work <ArrowDown size={17} /></a>
            <a className="text-link text-link--light" href={`${base}Resume-Anderson-Loureiro-2026.pdf`} target="_blank" rel="noreferrer">Resume <Download size={16} /></a>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-stage">
            <figure className="hero-portrait">
              <img src={`${base}images/anderson-profile.webp`} alt="3D portrait of Anderson Loureiro with round glasses and a beard" width="872" height="872" />
              <figcaption><span>Currently</span><strong>Performa IT · Pague Menos</strong></figcaption>
            </figure>
            <div className="portrait-facts" aria-hidden="true">
              <div className="portrait-fact-orbit">
                <div className="portrait-fact"><span><strong>120+</strong> students</span></div>
                <div className="portrait-fact"><span>English-speaking teams</span></div>
                <div className="portrait-fact"><span>Portugal · Switzerland</span></div>
                <div className="portrait-fact"><span>Hackathon winner</span></div>
                <div className="portrait-fact"><span>UX · Product · Code</span></div>
                <div className="portrait-fact"><span>ICC-incubated startup</span></div>
              </div>
            </div>
          </div>
          <div className="hero-interaction-hint" aria-hidden="true"><span /> Move to navigate · Hover portrait</div>
        </div>
        <div className="hero-index" aria-hidden="true">01 — 26</div>
      </section>

      <section className="about section-light" id="about">
        <div className="section-shell about-grid">
          <div>
            <p className="section-kicker">01 · About</p>
            <h2 className="section-heading">Evidence first.<br /><em>Clarity always.</em></h2>
          </div>
          <div className="about-copy">
            <p className="lead-copy">I’m Anderson, a Senior UX/UI and Product Designer who moves comfortably between discovery, interaction design, visual systems and product delivery.</p>
            <div className="about-columns">
              <p>Today I evolve the Pague Menos e-commerce experience, using behavioral data, usability testing and cross-functional collaboration to improve discovery, conversion and content exploration.</p>
              <p>My engineering background helps me make complex rules legible and collaborate across disciplines. I have delivered products with fully English-speaking teams and for clients in Portugal and Switzerland.</p>
            </div>
            <div className="credibility-list">
              <div><span>01</span><p><strong>International delivery</strong>Projects with fully English-speaking teams, including work for Portugal and Switzerland.</p></div>
              <div><span>02</span><p><strong>Design education</strong>A recorded UX/UI course and more than 120 students trained through Juventude Digital.</p></div>
              <div><span>03</span><p><strong>Entrepreneurship</strong>A healthcare startup incubated by Instituto do Câncer do Ceará.</p></div>
              <div><span>04</span><p><strong>Recognition</strong>First place in a healthcare hackathon while leading the UX practice.</p></div>
            </div>
            <div className="about-actions">
              <a className="button button--dark" href={whatsapp} target="_blank" rel="noreferrer">Talk on WhatsApp <MessageCircle size={18} /></a>
              <a className="text-link" href={`${base}Resume-Anderson-Loureiro-2026.pdf`} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
        <div className="section-shell stats-row">
          <div><strong>6+</strong><span>Years designing digital products</span></div>
          <div><strong>80k+</strong><span>Users on a redesigned fintech platform</span></div>
          <div><strong>120+</strong><span>Students trained in UX/UI Design</span></div>
          <div><strong>01</strong><span>Hackathon first place in healthcare</span></div>
        </div>
      </section>

      <section className="work section-dark" id="work">
        <div className="section-shell">
          <div className="section-intro">
            <div>
              <p className="section-kicker section-kicker--light">02 · Selected work</p>
              <h2 className="section-heading section-heading--light">From messy systems<br />to <em>usable products.</em></h2>
            </div>
            <p>Three in-depth case studies, followed by live client, personal and education projects.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card project-card--${project.ink}`} key={project.slug} style={{ backgroundColor: project.color }}>
                <div className="project-content">
                  <div className="project-topline"><span>{project.number}</span><span>{project.eyebrow}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a className="project-link" href={`${base}?project=${project.slug}`}>Open case study <ArrowUpRight size={18} /></a>
                </div>
                <a className="project-media" href={`${base}?project=${project.slug}`} aria-label={`Open ${project.title} case study`}>
                  <img src={project.cover} alt={`${project.title} case-study preview`} loading="lazy" />
                </a>
              </article>
            ))}
          </div>
          <div className="live-work" id="live-work">
            <div className="live-work-heading">
              <p className="section-kicker section-kicker--light">Live work · Built beyond the case studies</p>
              <p>Products and learning experiences currently available to explore.</p>
            </div>
            <div className="live-work-grid">
              <article className="live-project live-project--quattrus">
                <div className="live-project-copy">
                  <span>Client project · Product design</span>
                  <h3>Quattrus</h3>
                  <p>Product work for a management platform that connects strategy, KPIs, OKRs and action plans in one operational ecosystem.</p>
                  <a href="https://www.quattrus.com/" target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={17} /></a>
                </div>
                <div className="quattrus-visual" aria-hidden="true">
                  <div><span>Strategy</span><i /></div>
                  <div><span>Indicators</span><i /></div>
                  <div><span>Action plans</span><i /></div>
                  <strong>Q</strong>
                </div>
              </article>

              <article className="live-project live-project--al3d">
                <div className="live-project-copy">
                  <span>Personal project · Product & development</span>
                  <h3>AL3D</h3>
                  <p>A fast 3D-print pricing tool that turns material, energy, time and margin into clear quotes—with a useful guest mode.</p>
                  <a href="https://al3d-sigma.vercel.app/" target="_blank" rel="noreferrer">Open product <ArrowUpRight size={17} /></a>
                </div>
                <div className="al3d-visual" aria-hidden="true">
                  <span>AL3D // QUICK</span>
                  <strong>Cost signal</strong>
                  <div><i />Material</div><div><i />Energy</div><div><i />Margin</div>
                </div>
              </article>

              <article className="live-project live-project--course">
                <img src={`${base}images/anderson-course-cover.jpg`} alt="Anderson Loureiro UX/UI Design recorded course cover" loading="lazy" width="1600" height="900" />
                <div className="course-overlay">
                  <span>Recorded course · UX/UI Design</span>
                  <h3>From practice<br />to the classroom.</h3>
                  <p>A complete recorded class created for designer and creator <a href="https://www.instagram.com/alanavetroni/" target="_blank" rel="noreferrer">Alana Vetroni</a>.</p>
                  <button type="button" onClick={openCourseAccess}><Lock size={16} /> Watch protected video</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise section-light" id="expertise">
        <div className="section-shell">
          <div className="section-intro section-intro--ink">
            <div>
              <p className="section-kicker">03 · Expertise</p>
              <h2 className="section-heading">Strategy, craft<br />and <em>evidence.</em></h2>
            </div>
            <p>One connected practice from framing the right problem to delivering a system that can evolve.</p>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group, index) => (
              <article key={group.title}>
                <span>0{index + 1}</span><h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="teaching-banner">
            <div><p className="section-kicker">Teaching is part of the practice</p><h3>Good design becomes stronger when it can be explained.</h3></div>
            <div className="teaching-metrics">
              <div><strong>92%</strong><span>NPS</span></div><div><strong>84%</strong><span>Participation</span></div><div><strong>58%</strong><span>Completion</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="journey section-dark" id="journey">
        <div className="section-shell journey-grid">
          <div className="journey-heading">
            <p className="section-kicker section-kicker--light">04 · Journey</p>
            <h2 className="section-heading section-heading--light">Built across<br /><em>real contexts.</em></h2>
            <p>E-commerce, ERP, investments, healthcare, education and applied research.</p>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article key={`${item.company}-${item.period}`}>
                <span className="timeline-index">0{index + 1}</span>
                <div>
                  <div className="timeline-title"><h3>{item.role}</h3><p>{item.period}</p></div>
                  <h4>{item.company}</h4><p className="timeline-place">{item.place}</p><p className="timeline-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="section-shell education-row">
          <article><span>Postgraduate program</span><h3>User Experience & Human-Computer Interaction</h3><p>PUC-Rio · Nov 2022 · GPA 9.5533</p></article>
          <article><span>Bachelor’s degree</span><h3>Mechanical Engineering</h3><p>Federal University of Ceará · Jul 2022</p></article>
        </div>
      </section>

      <ContactFooter />
      <dialog ref={courseDialogRef} className="course-dialog" aria-labelledby="course-dialog-title" onClick={(event) => event.target === event.currentTarget && closeCourseAccess()} onClose={() => { setCoursePassword(''); setCourseError('') }}>
        <div className="course-dialog-panel">
          <button className="course-dialog-close" type="button" onClick={closeCourseAccess} aria-label="Close course access"><X size={19} /></button>
          <p className="section-kicker">Protected project</p>
          <h2 id="course-dialog-title">Enter the course password.</h2>
          <p>This portfolio gate limits casual access before continuing to the complete video on Google Drive.</p>
          <form onSubmit={handleCourseAccess}>
            <label htmlFor="course-password">Password</label>
            <input id="course-password" type="password" value={coursePassword} onChange={(event) => { setCoursePassword(event.target.value); setCourseError('') }} autoComplete="off" aria-invalid={Boolean(courseError)} aria-describedby={courseError ? 'course-password-error' : undefined} autoFocus />
            {courseError && <p className="course-dialog-error" id="course-password-error" role="alert">{courseError}</p>}
            <button className="button button--accent" type="submit">Unlock video <ArrowUpRight size={16} /></button>
          </form>
        </div>
      </dialog>
    </main>
  )
}

function ContactFooter() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-rings" aria-hidden="true" />
      <div className="section-shell contact-inner">
        <p className="section-kicker">05 · Contact</p>
        <h2>Have a complex<br />product to <em>clarify?</em></h2>
        <p className="contact-copy">Let’s talk about the product, the evidence and the next useful step.</p>
        <a className="contact-button" href={whatsapp} target="_blank" rel="noreferrer">Message me on WhatsApp <MessageCircle size={22} /></a>
        <div className="footer-meta">
          <span>Anderson Loureiro · Senior Product Designer</span>
          <div>
            <a href="https://www.linkedin.com/in/anderson-loureiro/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
            <a href="https://www.behance.net/anderlou" target="_blank" rel="noreferrer" aria-label="Behance"><ExternalLink size={19} /></a>
          </div>
          <span>Fortaleza, Brazil · 2026</span>
        </div>
      </div>
    </footer>
  )
}

function CaseStudyPage({ data }: { data: CaseData }) {
  useEffect(() => {
    document.title = `${data.project.title} — Anderson Loureiro`
    window.scrollTo(0, 0)
  }, [data.project.title])

  return (
    <main className={`case-page case-page--${data.project.slug}`}>
      <header className="case-nav">
        <Brand />
        <a className="case-back" href={`${base}#work`}><ArrowLeft size={17} /> Back to selected work</a>
        <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a>
      </header>
      <section className="case-hero">
        <div className="case-hero-copy">
          <p className="kicker">{data.project.number} · {data.project.eyebrow}</p>
          <h1>{data.project.title}</h1><p>{data.intro}</p>{data.note && <small>{data.note}</small>}
        </div>
        <div className="case-meta">{data.meta.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </section>
      <div className="case-cover" style={{ backgroundColor: data.project.color }}><img src={data.project.cover} alt={`${data.project.title} project overview`} /></div>
      <section className="case-proof">{data.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
      <div className="case-body">
        {data.sections.map((section, index) => (
          <section className="case-section" key={section.title}>
            <div className="case-section-copy">
              <p className="section-kicker">{section.eyebrow}</p><h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>}
            </div>
            {section.image && <figure className="case-image"><img src={section.image} alt={section.imageAlt} loading="lazy" /></figure>}
          </section>
        ))}
      </div>
      <section className="case-next">
        <p className="section-kicker">Continue exploring</p><h2>See the source,<br />then let’s <em>talk.</em></h2>
        <div>
          <a className="button button--dark" href={data.sourceHref} target="_blank" rel="noreferrer">{data.sourceLabel} <ArrowUpRight size={17} /></a>
          <a className="button button--outline" href={whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp <MessageCircle size={17} /></a>
        </div>
      </section>
      <footer className="case-footer"><span>Anderson Loureiro · Product Designer</span><a href={`${base}#work`}>All selected work</a></footer>
    </main>
  )
}

function App() {
  const slug = new URLSearchParams(window.location.search).get('project')
  const caseData = slug ? cases[slug] : undefined
  return caseData ? <CaseStudyPage data={caseData} /> : <HomePage />
}

export default App
