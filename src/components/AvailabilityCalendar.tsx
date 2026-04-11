import { addMonths, format, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getMonthAvailability } from '../lib/utils'

export default function AvailabilityCalendar({ propertyId, title = 'Availability calendar' }: { propertyId: string; title?: string }) {
  const [month, setMonth] = useState(new Date())
  const days = useMemo(() => getMonthAvailability(propertyId, month), [month, propertyId])

  return (
    <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3>
          <p className="text-sm text-[var(--muted)]">Booked and blocked dates sync with host controls and seasonal overrides.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMonth((current) => subMonths(current, 1))} className="rounded-full border border-white/10 p-2 text-[var(--text)]" type="button"><ChevronLeft size={16} /></button>
          <button onClick={() => setMonth((current) => addMonths(current, 1))} className="rounded-full border border-white/10 p-2 text-[var(--text)]" type="button"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-400" /> Available</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-400" /> Booked</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-400" /> Host blocked</span>
      </div>
      <p className="mb-3 text-sm text-[var(--muted)]">{format(month, 'MMMM yyyy')}</p>
      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day.date.toISOString()} className={'rounded-2xl border px-2 py-3 text-center text-sm ' + (day.status === 'available' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-50' : day.status === 'booked' ? 'border-rose-400/20 bg-rose-400/10 text-rose-50' : 'border-amber-400/20 bg-amber-400/10 text-amber-50')}>
            <p className="font-semibold">{format(day.date, 'd')}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">{day.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
