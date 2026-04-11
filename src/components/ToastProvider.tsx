import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { createContext, useContext, useMemo, useState } from 'react'

type ToastTone = 'success' | 'error'

interface Toast {
  id: number
  title: string
  message?: string
  tone: ToastTone
}

const ToastContext = createContext<{ pushToast: (toast: Omit<Toast, 'id'>) => void }>({
  pushToast: () => undefined,
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const value = useMemo(() => ({
    pushToast: (toast: Omit<Toast, 'id'>) => {
      const id = Date.now()
      setToasts((current) => [...current, { ...toast, id }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((entry) => entry.id !== id))
      }, 3600)
    },
  }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[100] space-y-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="pointer-events-auto flex max-w-sm gap-3 rounded-2xl border border-white/10 bg-[var(--panel)] px-4 py-3 shadow-2xl"
            >
              {toast.tone === 'success' ? <CheckCircle2 className="mt-0.5 text-emerald-400" size={20} /> : <XCircle className="mt-0.5 text-rose-400" size={20} />}
              <div>
                <p className="font-semibold text-[var(--text)]">{toast.title}</p>
                {toast.message ? <p className="text-sm text-[var(--muted)]">{toast.message}</p> : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
