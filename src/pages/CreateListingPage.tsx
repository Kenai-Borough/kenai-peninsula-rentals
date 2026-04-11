import { Check, ChevronLeft, ChevronRight, GripVertical, UploadCloud } from 'lucide-react'
import { useMemo, useState } from 'react'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import SEO from '../components/SEO'
import { useToast } from '../components/ToastProvider'
import { browseAmenities, communities } from '../data/rentals'
import { buildStructuredData, classNames } from '../lib/utils'

const steps = ['Property type', 'Space details', 'Amenities', 'Photos', 'Pricing', 'Availability', 'Policies']

const initialRates = [
  ['Summer (Jun–Aug)', '2.0x peak salmon season'],
  ['Shoulder (May, Sep)', '1.5x value season'],
  ['Winter (Nov–Mar)', '1.0x baseline'],
]

export default function CreateListingPage() {
  const [step, setStep] = useState(0)
  const [amenities, setAmenities] = useState<string[]>(['WiFi', 'Kitchen'])
  const [photos, setPhotos] = useState(['Cabin exterior', 'Living room', 'River dock', 'Aurora deck'])
  const { pushToast } = useToast()
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])

  function toggleAmenity(amenity: string) {
    setAmenities((current) => (current.includes(amenity) ? current.filter((entry) => entry !== amenity) : [...current, amenity]))
  }

  function movePhoto(index: number, direction: -1 | 1) {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= photos.length) return
    const next = [...photos]
    const item = next[index]
    next[index] = next[nextIndex]
    next[nextIndex] = item
    setPhotos(next)
  }

  function handleSubmit() {
    pushToast({ tone: 'success', title: 'Listing draft saved', message: 'Your 7-step host flow is ready for Supabase persistence and Stripe onboarding.' })
    setStep(0)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Create a Kenai rental listing" description="Launch a short-term or long-term Kenai Peninsula rental with pricing, availability, and safety details." structuredData={buildStructuredData()} />
      <div className="rounded-[36px] border border-white/10 bg-[var(--panel)] p-8 shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-500">7-step host wizard</p>
            <h1 className="mt-2 text-4xl font-semibold">Build a listing that feels local, polished, and booking-ready.</h1>
          </div>
          <div className="min-w-[240px]">
            <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]"><span>Progress</span><span>{Math.round(progress)}%</span></div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500" style={{ width: progress + '%' }} /></div>
          </div>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-7">{steps.map((label, index) => <div key={label} className={classNames('rounded-2xl border px-3 py-3 text-center text-sm', index === step ? 'border-amber-400/40 bg-amber-400/10 text-[var(--text)]' : index < step ? 'border-emerald-400/20 bg-emerald-400/10 text-[var(--text)]' : 'border-white/10 text-[var(--muted)]')}><p className="font-semibold">{index + 1}</p><p>{label}</p></div>)}</div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
          {step === 0 ? <div className="grid gap-4 md:grid-cols-2"><label className="field"><span>Property type</span><select><option>Cabin</option><option>House</option><option>Apartment</option><option>Condo</option><option>Lodge</option><option>Yurt</option><option>Glamping</option><option>RV spot</option></select></label><label className="field"><span>Community</span><select>{communities.map((community) => <option key={community}>{community}</option>)}</select></label><label className="field md:col-span-2"><span>Address</span><input placeholder="123 Peninsula Outlook Rd" /></label></div> : null}
          {step === 1 ? <div className="grid gap-4 md:grid-cols-4"><label className="field"><span>Bedrooms</span><input type="number" defaultValue={2} /></label><label className="field"><span>Bathrooms</span><input type="number" defaultValue={1} /></label><label className="field"><span>Capacity</span><input type="number" defaultValue={5} /></label><label className="field"><span>Sqft</span><input type="number" defaultValue={980} /></label></div> : null}
          {step === 2 ? <div><p className="text-sm text-[var(--muted)]">Select 30+ options covering fishing access, winter prep, wellness, accessibility, and family readiness.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{browseAmenities.slice(0, 30).map((amenity) => <label key={amenity} className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm"><input type="checkbox" checked={amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} /> {amenity}</label>)}</div></div> : null}
          {step === 3 ? <div><div className="rounded-[28px] border border-dashed border-white/15 px-6 py-10 text-center"><UploadCloud className="mx-auto text-amber-500" size={32} /><p className="mt-3 text-lg font-semibold">Drag, drop, caption, and reorder your photos</p><p className="mt-2 text-sm text-[var(--muted)]">Show exterior arrival, main living area, sleeping spaces, bathroom, and Alaska-specific amenity shots.</p></div><div className="mt-5 space-y-3">{photos.map((photo, index) => <div key={photo} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"><span className="inline-flex items-center gap-2"><GripVertical size={16} /> {index + 1}. {photo}</span><div className="flex gap-2"><button type="button" className="chip" onClick={() => movePhoto(index, -1)}>Up</button><button type="button" className="chip" onClick={() => movePhoto(index, 1)}>Down</button></div></div>)}</div></div> : null}
          {step === 4 ? <div className="space-y-6"><div className="grid gap-4 md:grid-cols-2"><label className="field"><span>Nightly rate</span><input defaultValue={225} /></label><label className="field"><span>Weekly rate</span><input defaultValue={1350} /></label><label className="field"><span>Monthly rate</span><input defaultValue={4200} /></label><label className="field"><span>Cleaning fee</span><input defaultValue={125} /></label><label className="field"><span>Minimum stay</span><input defaultValue={3} /></label><label className="field"><span>Max stay</span><input defaultValue={28} /></label></div><div className="grid gap-3 md:grid-cols-3">{initialRates.map(([season, detail]) => <div key={season} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold">{season}</p><p className="mt-2 text-sm text-[var(--muted)]">{detail}</p></div>)}</div></div> : null}
          {step === 5 ? <div className="space-y-5"><div className="grid gap-4 md:grid-cols-2"><label className="field"><span>Base availability</span><select><option>Open</option><option>Blocked for maintenance</option></select></label><label className="field"><span>Seasonal pricing rule</span><input placeholder="Summer salmon season +100%" /></label></div><AvailabilityCalendar propertyId="prop-1" title="Availability blocking preview" /></div> : null}
          {step === 6 ? <div className="grid gap-4 md:grid-cols-2"><label className="field"><span>Pet policy</span><select><option>Pets welcome with fee</option><option>No pets</option></select></label><label className="field"><span>Cancellation policy</span><select><option>Flexible 7-day</option><option>Moderate 14-day</option><option>Long-term lease policy</option></select></label><label className="field md:col-span-2"><span>House rules</span><textarea rows={5} defaultValue={'Quiet hours after 10pm' + '\n' + 'No fish cleaning inside' + '\n' + 'Keep outdoor food secured from wildlife'} /></label></div> : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-[var(--text)] disabled:opacity-50" type="button"><ChevronLeft size={16} /> Previous</button>
          {step < steps.length - 1 ? <button onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950" type="button">Next step <ChevronRight size={16} /></button> : <button onClick={handleSubmit} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950" type="button"><Check size={18} /> Save listing draft</button>}
        </div>
      </div>
    </div>
  )
}
