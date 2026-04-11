import { motion } from 'framer-motion'
import { Heart, MapPin, Star, Trees } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '../types'
import { formatCurrency, slugToLabel } from '../lib/utils'

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="overflow-hidden rounded-[28px] border border-white/10 bg-[var(--panel)] shadow-xl shadow-black/10">
      <Link to={'/listing/' + property.id}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={property.photos[0]} alt={property.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">{property.featuredLabel}</span>
            <button className="rounded-full bg-black/30 p-2 text-white backdrop-blur" type="button"><Heart size={16} /></button>
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm text-[var(--muted)]"><MapPin size={15} /> {property.city}, Alaska</p>
            <Link to={'/listing/' + property.id} className="mt-1 block text-xl font-semibold text-[var(--text)]">{property.title}</Link>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-sm text-[var(--text)]"><Star size={15} className="fill-amber-400 text-amber-400" /> {property.rating}</div>
        </div>
        <p className="text-sm leading-6 text-[var(--muted)]">{property.summary}</p>
        <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
          <span className="chip">{slugToLabel(property.type)}</span>
          <span className="chip">{property.maxGuests} guests</span>
          <span className="chip">{property.bedrooms} bed</span>
          <span className="chip">{property.isLongTerm ? '6+ mo ready' : 'Nightly / weekly'}</span>
          {property.petFriendly ? <span className="chip">Pet friendly</span> : null}
          {property.amenities.slice(0, 1).map((amenity) => <span key={amenity} className="chip inline-flex items-center gap-1"><Trees size={12} /> {amenity}</span>)}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-[var(--text)]">{formatCurrency(property.isLongTerm ? property.monthlyRate || property.nightlyRate * 30 : property.nightlyRate)}</p>
            <p className="text-sm text-[var(--muted)]">/{property.isLongTerm ? 'month' : 'night'} • weekly {formatCurrency(property.weeklyRate || property.nightlyRate * 6)}</p>
          </div>
          <Link to={'/listing/' + property.id} className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:border-amber-300/40">View stay</Link>
        </div>
      </div>
    </motion.article>
  )
}
