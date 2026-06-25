import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Menu,
  X,
} from 'lucide-react'
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85'

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

const PORTRAIT_IMAGE =
  'https://framerusercontent.com/images/xT3Z1dkKHIP1hMdQ0I7lau96g.png'

const projects = [
  {
    number: '01',
    title: 'Azo Sistemas',
    description:
      'A business management platform for general retail and the specialized fashion sector, designed to make daily operations clearer and more effective for small businesses.',
    image:
      'https://framerusercontent.com/images/Si2u9swrNHptF3AJ0kSBhVKtM.png',
    tags: ['Information architecture', 'Research', 'UX/UI Design'],
    href: 'https://www.behance.net/gallery/218491911/Azo-Sistemas-Web-App',
    linkLabel: 'View case study',
  },
  {
    number: '02',
    title: 'UMMO App',
    description:
      'A case study exploring how gamification can improve retention and completion rates across online learning experiences.',
    image:
      'https://framerusercontent.com/images/SUUCeezKM84koTda0V8OyehmSo.png',
    tags: ['Research', 'UX/UI Design', 'Discovery'],
    href: 'https://www.behance.net/gallery/195294943/UXUI-Estudo-de-caso-Ummo',
    linkLabel: 'View case study',
  },
  {
    number: '03',
    title: 'Carteira Advisor',
    description:
      'A B2B wealth-management product that helps investment firms and advisors give clients a clearer view of earnings, dividends and portfolio performance.',
    image:
      'https://framerusercontent.com/images/zgqBzcW2nLEnOfb7XWGBIkhvc.png',
    tags: ['UX/UI Design', 'Rebranding', 'Landing page'],
    href: 'https://www.carteiraadvisor.com/',
    linkLabel: 'Product website',
  },
]

const skills = [
  'UX Design',
  'UI Design',
  'Product Design',
  'Consulting',
  'Design Systems',
  'Front-End Development',
  'Design Sprint',
  'Interaction Design',
  'User Testing',
  'Usability Testing',
  'UX Research',
  'Leadership',
  'Mentoring',
  'No-Code',
]

const experience = [
  {
    role: 'Mid-Level Product Designer',
    company: 'Labsit',
    place: 'São Paulo, Brazil · Remote',
    period: 'Apr 2023 — Present',
    description:
      'Designing and rebranding responsive web and mobile products for B2B and B2C clients. Working closely with front-end teams on flows, prototypes, features and component systems.',
  },
  {
    role: 'Product Design Instructor',
    company: 'Juventude Digital',
    place: 'Fortaleza, Brazil · Remote',
    period: 'Oct 2023 — Apr 2025',
    description:
      'Led courses and workshops in Figma, UX/UI design, prototyping and 3D no-code interfaces. Achieved a 92% NPS and the highest participation rate in the 2023 cycle.',
  },
  {
    role: 'Mid-Level Product Designer',
    company: 'Kiuin',
    place: 'Fortaleza, Brazil · Remote',
    period: 'Nov 2022 — Mar 2024',
    description:
      'Partnered with ICC Biolabs to improve the patient journey through market research, product requirements, MVP definition and high-fidelity responsive prototypes.',
  },
  {
    role: 'Mid-Level Product Designer',
    company: 'Rodobank',
    place: 'Fortaleza, Brazil · Hybrid',
    period: 'Jun 2022 — Mar 2023',
    description:
      'Created responsive product flows and interfaces while collaborating with engineering on new features and reusable components for web and mobile platforms.',
  },
  {
    role: 'Product Design Researcher',
    company: 'PIBI 2020 · CEMP',
    place: 'Fortaleza, Brazil · Remote',
    period: 'Feb 2020 — Jan 2021',
    description:
      'Early product-design research experience focused on understanding needs, structuring digital journeys and translating findings into usable interfaces.',
  },
]

const SPOTLIGHT_R = 260

type CursorPosition = {
  x: number
  y: number
}

type RevealLayerProps = {
  image: string
  cursorX: number
  cursorY: number
}

type SectionRevealProps = {
  children: ReactNode
  className?: string
}

function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const [, setCanvasVersion] = useState(0)

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current

      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setCanvasVersion((version) => version + 1)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const reveal = revealRef.current

    if (!canvas || !reveal) return

    const context = canvas.getContext('2d')

    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    )

    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)')
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')

    context.fillStyle = gradient
    context.beginPath()
    context.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2)
    context.fill()

    const maskImage = `url(${canvas.toDataURL()})`
    reveal.style.maskImage = maskImage
    reveal.style.webkitMaskImage = maskImage
  })

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${image}")`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
    </>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Back to top">
      <svg
        width="26"
        height="26"
        viewBox="0 0 256 256"
        fill="#ffffff"
        aria-hidden="true"
      >
        <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
      </svg>
      <span className="font-playfair text-xl italic text-white sm:text-2xl">
        Anderson
      </span>
    </a>
  )
}

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    ['About', '#about'],
    ['Work', '#work'],
    ['Expertise', '#expertise'],
    ['Journey', '#journey'],
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between border-b p-4 transition-all duration-500 sm:p-5 ${
          scrolled
            ? 'border-white/10 bg-black/75 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Logo />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-2 shadow-2xl shadow-black/10 backdrop-blur-xl md:flex">
          {links.map(([label, href], index) => (
            <a
              key={label}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-white text-gray-900'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:scale-[1.02] hover:bg-[#f4eee5] md:block"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-xl md:hidden"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X size={20} strokeWidth={1.8} />
          ) : (
            <Menu size={21} strokeWidth={1.8} />
          )}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[90] flex flex-col justify-end bg-[#0a0a0a]/95 p-6 pb-10 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mb-auto mt-24 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          Navigation
        </div>
        {links.map(([label, href], index) => (
          <a
            key={label}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="flex items-end justify-between border-t border-white/15 py-4 text-4xl font-medium text-white"
          >
            <span>{label}</span>
            <span className="mb-1 text-xs text-white/40">0{index + 1}</span>
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-8 flex items-center justify-between rounded-full bg-[#e8702a] px-6 py-4 font-semibold text-white"
        >
          Let&apos;s talk <ArrowUpRight size={18} />
        </a>
      </div>
    </>
  )
}

function PortfolioHero() {
  const mouse = useRef<CursorPosition>({ x: -999, y: -999 })
  const smooth = useRef<CursorPosition>({ x: -999, y: -999 })
  const rafRef = useRef<number>()
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: -999,
    y: -999,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1

      setCursorPos({
        x: smooth.current.x,
        y: smooth.current.y,
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)

      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <section
      id="top"
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
        aria-hidden="true"
      />

      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
        <p
          className="hero-anim hero-fade mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-xs"
          style={{ animationDelay: '0.15s' }}
        >
          Product Designer · Fortaleza, Brazil
        </p>
        <h1 className="leading-[0.91] text-white">
          <span
            className="hero-anim hero-reveal font-playfair block text-5xl font-normal italic sm:text-7xl md:text-8xl lg:text-[7rem]"
            style={{
              letterSpacing: '-0.05em',
              animationDelay: '0.25s',
            }}
          >
            Anderson Loureiro
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl lg:text-[7rem]"
            style={{
              letterSpacing: '-0.08em',
              animationDelay: '0.42s',
            }}
          >
            Product Designer
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[280px] sm:block md:left-14"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm leading-relaxed text-white/75">
          Five years shaping digital products through research, systems
          thinking and expressive, implementable interfaces.
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-8 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-16 sm:left-auto sm:right-10 sm:max-w-[285px] sm:gap-5 md:right-14"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs leading-relaxed text-white/75 sm:text-sm">
          I create user-centered experiences for innovative products, bringing
          clarity to complex journeys through design thinking.
        </p>
        <a
          href="#work"
          className="group flex items-center gap-3 rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
        >
          Explore selected work
          <ArrowDown
            size={16}
            className="transition-transform group-hover:translate-y-0.5"
          />
        </a>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#eeeae2] px-5 py-24 text-[#111] sm:px-10 sm:py-32 md:px-14"
    >
      <div className="contour-lines absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionReveal className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="section-label text-black/50">01 · About</p>
            <div className="mt-8 overflow-hidden rounded-[2rem] bg-black">
              <img
                src={PORTRAIT_IMAGE}
                alt="Anderson Loureiro, Product Designer"
                className="aspect-[4/3] h-full w-full object-cover object-center opacity-90 grayscale-[15%] transition duration-700 hover:scale-[1.025] hover:grayscale-0"
              />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-black/20 pt-4 text-xs font-medium uppercase tracking-[0.15em] text-black/55">
              <span>Fortaleza · Brazil</span>
              <span>Available remotely</span>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h2 className="max-w-4xl text-[clamp(2.8rem,6vw,6.7rem)] font-medium leading-[0.94] tracking-[-0.065em]">
              Complex products become{' '}
              <span className="font-playfair font-normal italic text-[#c65520]">
                clear experiences
              </span>{' '}
              when every layer has purpose.
            </h2>

            <div className="mt-14 grid gap-8 border-t border-black/20 pt-8 sm:grid-cols-2">
              <p className="max-w-md text-base leading-relaxed text-black/65">
                I&apos;m a Product Designer focused on creating distinctive,
                disruptive and modern digital products that are both pleasing
                to use and realistic to implement.
              </p>
              <p className="max-w-md text-base leading-relaxed text-black/65">
                Currently at Labsit and pursuing a postgraduate degree in User
                Experience and Human-Computer Interaction at PUC-Rio.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-20 grid grid-cols-2 border-y border-black/20 md:grid-cols-4">
          {[
            ['5+', 'Years of experience'],
            ['03', 'Featured case studies'],
            ['92%', 'Course NPS'],
            ['02', 'Markets · national & global'],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`py-8 md:py-10 ${
                index % 2 ? 'border-l border-black/20 pl-5 sm:pl-8' : ''
              } ${index > 1 ? 'border-t border-black/20 md:border-t-0' : ''} ${
                index === 2 ? 'md:border-l md:pl-8' : ''
              }`}
            >
              <div className="font-playfair text-4xl italic sm:text-5xl">
                {value}
              </div>
              <div className="mt-2 max-w-[150px] text-xs font-medium uppercase leading-relaxed tracking-[0.12em] text-black/50">
                {label}
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-10 sm:py-32 md:px-14"
    >
      <div className="orange-glow absolute -right-40 top-0 h-[600px] w-[600px]" />
      <div className="relative mx-auto max-w-[1500px]">
        <SectionReveal className="mb-16 flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div>
            <p className="section-label text-white/40">02 · Selected work</p>
            <h2 className="mt-6 text-5xl font-medium leading-none tracking-[-0.06em] sm:text-7xl md:text-8xl">
              Built from
              <br />
              <span className="font-playfair font-normal italic text-[#e8702a]">
                insight to interface.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Product strategy, research and interface design for retail,
            education and financial technology.
          </p>
        </SectionReveal>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <SectionReveal key={project.title}>
              <article className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] lg:grid-cols-[1.15fr_0.85fr]">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`relative flex min-h-[330px] items-center justify-center overflow-hidden bg-[#181818] p-7 sm:min-h-[460px] sm:p-12 ${
                    index % 2 ? 'lg:order-2' : ''
                  }`}
                  aria-label={`${project.linkLabel}: ${project.title}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(232,112,42,0.18),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <img
                    src={project.image}
                    alt={`${project.title} product preview`}
                    loading="lazy"
                    className="relative z-10 max-h-[390px] w-full object-contain drop-shadow-2xl transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:rotate-6 group-hover:opacity-100">
                    <ArrowUpRight size={19} />
                  </div>
                </a>

                <div
                  className={`flex min-h-[390px] flex-col justify-between p-7 sm:p-10 lg:p-14 ${
                    index % 2 ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="mb-14 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                      <span>Case study</span>
                      <span>{project.number}</span>
                    </div>
                    <h3 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-12">
                    <div className="mb-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 px-3.5 py-2 text-xs text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#f08a4e] transition-colors hover:text-white"
                    >
                      {project.linkLabel} <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="bg-[#eeeae2] px-5 py-24 text-[#111] sm:px-10 sm:py-32 md:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionReveal className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="section-label text-black/50">03 · Expertise</p>
            <h2 className="mt-7 text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-7xl">
              A broad
              <br />
              <span className="font-playfair font-normal italic text-[#c65520]">
                design toolkit.
              </span>
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-black/55">
              From discovery to delivery, I move between strategy, interaction
              and visual systems to make products coherent end to end.
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-3">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className={`skill-pill rounded-full border border-black/20 px-5 py-3 text-base font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[#c65520] hover:bg-[#c65520] hover:text-white sm:px-7 sm:py-4 sm:text-xl ${
                  index === 2 || index === 4 || index === 10
                    ? 'font-playfair italic'
                    : ''
                }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-24 grid overflow-hidden rounded-[2rem] bg-[#e8702a] text-black md:grid-cols-[1fr_1.2fr]">
          <div className="flex min-h-[320px] flex-col justify-between p-8 sm:p-12">
            <Award size={34} strokeWidth={1.4} />
            <div>
              <div className="font-playfair text-7xl italic sm:text-8xl">92%</div>
              <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed">
                NPS in the excellence zone for the Introduction to UI Design
                with Figma course.
              </p>
            </div>
          </div>
          <div className="grid border-t border-black/20 sm:grid-cols-2 md:border-l md:border-t-0">
            <div className="flex min-h-[220px] flex-col justify-end p-8 sm:p-10">
              <div className="font-playfair text-6xl italic">84%</div>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Highest participation rate in the final 2023 course cycle.
              </p>
            </div>
            <div className="flex min-h-[220px] flex-col justify-end border-t border-black/20 p-8 sm:border-l sm:border-t-0 sm:p-10">
              <div className="font-playfair text-6xl italic">58%</div>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Highest completion rate in the same learning cycle.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function JourneySection() {
  return (
    <section
      id="journey"
      className="bg-[#0a0a0a] px-5 py-24 text-white sm:px-10 sm:py-32 md:px-14"
    >
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <SectionReveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-label text-white/40">04 · Journey</p>
          <h2 className="mt-7 text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-7xl">
            Experience,
            <br />
            <span className="font-playfair font-normal italic text-[#e8702a]">
              layer by layer.
            </span>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/50">
            A trajectory across product teams, education, healthcare,
            financial services and applied design research.
          </p>
        </SectionReveal>

        <div>
          {experience.map((item, index) => (
            <SectionReveal key={`${item.company}-${item.period}`}>
              <article className="grid gap-6 border-t border-white/15 py-9 sm:grid-cols-[90px_1fr] sm:py-11">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/30">
                  0{index + 1}
                </div>
                <div>
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 font-playfair text-xl italic text-[#ef884c]">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-left text-xs leading-relaxed text-white/40 md:text-right">
                      <div>{item.period}</div>
                      <div>{item.place}</div>
                    </div>
                  </div>
                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1500px] border-t border-white/15 pt-16">
        <SectionReveal className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 sm:p-10">
            <GraduationCap
              size={31}
              strokeWidth={1.4}
              className="text-[#e8702a]"
            />
            <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Postgraduate degree · In progress
            </p>
            <h3 className="mt-4 max-w-lg text-3xl font-medium tracking-[-0.04em]">
              UX, User Experience & Human-Computer Interaction
            </h3>
            <p className="mt-3 font-playfair text-xl italic text-white/55">
              PUC-Rio
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 sm:p-10">
            <BriefcaseBusiness
              size={31}
              strokeWidth={1.4}
              className="text-[#e8702a]"
            />
            <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Higher education · 2017—2022
            </p>
            <h3 className="mt-4 max-w-lg text-3xl font-medium tracking-[-0.04em]">
              Design foundation and interdisciplinary practice
            </h3>
            <p className="mt-3 font-playfair text-xl italic text-white/55">
              Federal University of Ceará
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#e8702a] px-5 pb-8 pt-24 text-black sm:px-10 sm:pt-32 md:px-14"
    >
      <div className="footer-orbit absolute -right-[20vw] -top-[25vw] size-[70vw] min-h-[600px] min-w-[600px] rounded-full border border-black/15" />
      <div className="footer-orbit absolute -right-[10vw] -top-[15vw] size-[50vw] min-h-[420px] min-w-[420px] rounded-full border border-black/15" />

      <div className="relative mx-auto max-w-[1500px]">
        <SectionReveal>
          <p className="section-label text-black/55">05 · Contact</p>
          <h2 className="mt-8 max-w-6xl text-[clamp(4rem,11vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
            Bring your idea
            <br />
            <span className="font-playfair font-normal italic">to life.</span>
          </h2>

          <div className="mt-16 flex flex-col justify-between gap-10 border-t border-black/25 pt-8 sm:flex-row sm:items-end">
            <div>
              <p className="max-w-md text-sm leading-relaxed text-black/65">
                Have a product challenge, a new idea or simply want to exchange
                perspectives about design? Let&apos;s start a conversation.
              </p>
              <a
                href="https://www.linkedin.com/in/anderson-loureiro/"
                target="_blank"
                rel="noreferrer"
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Get in touch
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/anderson-loureiro/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-12 place-items-center rounded-full border border-black/25 transition-colors hover:bg-black hover:text-white"
              >
                <Linkedin size={19} />
              </a>
              <a
                href="https://www.behance.net/anderlou"
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
                className="grid size-12 place-items-center rounded-full border border-black/25 transition-colors hover:bg-black hover:text-white"
              >
                <ExternalLink size={19} />
              </a>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-24 flex flex-col gap-3 border-t border-black/25 pt-6 text-xs font-medium uppercase tracking-[0.12em] text-black/55 sm:flex-row sm:items-center sm:justify-between">
          <span>Anderson Loureiro · Product Designer</span>
          <span>Fortaleza, Brazil · 2026</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <main
      className="min-h-screen bg-black tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navigation />
      <PortfolioHero />
      <AboutSection />
      <WorkSection />
      <ExpertiseSection />
      <JourneySection />
      <ContactSection />
    </main>
  )
}

export default App
