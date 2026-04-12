import { AnimatePresence, motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function PhotoGallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <>
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--panel)] p-4 shadow-xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {photos.map((photo, index) => (
              <button key={photo + String(index)} onClick={() => setActive(index)} className="min-w-0 flex-[0_0_86%] overflow-hidden rounded-[28px] border border-white/10 md:flex-[0_0_48%] lg:flex-[0_0_42%]" type="button">
                <img src={photo} alt={title + ' photo ' + String(index + 1)} loading="lazy" width="1400" height="900" className="h-[320px] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={scrollPrev} className="rounded-full border border-white/10 p-2 text-[var(--text)]" type="button" aria-label="Show previous photo"><ChevronLeft size={18} /></button>
          <button onClick={scrollNext} className="rounded-full border border-white/10 p-2 text-[var(--text)]" type="button" aria-label="Show next photo"><ChevronRight size={18} /></button>
        </div>
      </div>
      <AnimatePresence>
        {active !== null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-slate-950/92 p-6 backdrop-blur" onClick={() => setActive(null)}>
            <button className="absolute right-6 top-6 rounded-full border border-white/15 p-2 text-white" type="button" onClick={() => setActive(null)} aria-label="Close photo gallery"><X size={22} /></button>
            <div className="flex h-full items-center justify-center">
              <motion.img key={active} initial={{ scale: 0.96, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} src={photos[active]} alt={title} loading="lazy" width="1600" height="1067" className="max-h-full max-w-6xl rounded-[32px] object-contain shadow-2xl" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
