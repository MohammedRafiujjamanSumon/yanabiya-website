import { useEffect } from 'react'
import { Crown } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

type Member = {
  name: string
  role: string
  image: string
}

/* Board members — names + portraits sourced from yanabiyagroup.com/cm.php. */
const BOARD: Member[] = [
  { name: 'Mohammed Rashid Al Hashimi',         role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m4.jpg'  },
  { name: 'Sultan Rashid Mohammed Al Hashimi',  role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m5.jpg'  },
  { name: 'Salim Saif Ahmed Al-suleimani',      role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m12.jpg' },
  { name: 'Badar Humaid Salim Al-Shaqsi',       role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m14.jpg' },
  { name: 'Haitham Musabah Said Al Saidi',      role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m15.jpg' },
  { name: 'Mohammed Nasser Muhannan Al Bakri',  role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m19.jpg' },
  { name: 'Abdul Rahman Rashid Mohammed Al Hashemi', role: 'Board of Member', image: 'https://www.yanabiyagroup.com/img/slider/m18.jpg' },
]

export default function Board() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/20 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/12 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="Tier 01 · Global Board & Advisory"
        title={<>Our <span className="italic text-brand-accentDark">Board of Members.</span></>}
        subtitle="The board members providing governance, strategic oversight, and long-term direction for Yanabiya Group."
        centered
      />

      <section className="relative">
        <div className="container-x py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {BOARD.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <div className="group rounded-2xl overflow-hidden
                                bg-brand-50 border border-brand-deep/15
                                shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                                transition-all duration-500
                                hover:-translate-y-1 hover:border-brand-accent
                                hover:shadow-[0_18px_36px_-14px_rgba(15,58,35,0.25)]
                                h-full flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-100">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full
                                    bg-brand-accent/85 backdrop-blur
                                    px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]
                                    text-brand-deep">
                      <Crown size={10} /> B of M
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col justify-center text-center">
                    <h3 className="font-serif text-[14px] md:text-[15px] text-brand-deep leading-tight">
                      {m.name}
                    </h3>
                    <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-brand-accentDark">
                      {m.role}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
