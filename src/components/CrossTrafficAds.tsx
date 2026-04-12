import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Building2, Compass, Trees } from 'lucide-react'

const promos = [
  { icon: Building2, title: "Love It Here? Buy Property", description: "When a getaway turns permanent, jump into direct-sale homes and local realty tools.", href: "https://kenaiboroughrealty.com", cta: "Explore property", panelClass: "from-cyan-500/15 to-slate-950/0", accentClass: "bg-cyan-400" },
  { icon: Trees, title: "Find Your Dream Land", description: "Scout acreage, waterfront parcels, and cabin sites while you are already exploring.", href: "https://kenailandsales.com", cta: "Browse land", panelClass: "from-emerald-500/15 to-slate-950/0", accentClass: "bg-emerald-400" },
  { icon: Compass, title: "Explore Local Activities", description: "Plan fishing days, community events, and local adventures around your stay.", href: "https://kenaiborough.com", cta: "See local guide", panelClass: "from-teal-500/15 to-slate-950/0", accentClass: "bg-teal-400" },
  { icon: Briefcase, title: "Browse the Classifieds", description: "Need seasonal gear, local services, or job postings while you are in town?", href: "https://kenailistings.com", cta: "Open classifieds", panelClass: "from-lime-500/15 to-slate-950/0", accentClass: "bg-lime-400" },
] as const

export function CrossTrafficAds() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Kenai Peninsula network</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text)]">Keep your search moving across the Kenai ecosystem.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">Helpful next steps from sister sites across the peninsula—property, rentals, vehicles, classifieds, and local guides that fit the moment naturally.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promos.map((promo, index) => {
            const Icon = promo.icon
            return (
              <motion.a
                key={promo.href}
                href={promo.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className={"relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[var(--surface-strong)]/70 p-6 shadow-lg transition" + ' bg-gradient-to-br ' + promo.panelClass}
              >
                <span className={'absolute inset-y-4 left-0 w-1 rounded-full ' + promo.accentClass} />
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-slate-900 dark:bg-white/5 dark:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{promo.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{promo.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-105">
                  {promo.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
