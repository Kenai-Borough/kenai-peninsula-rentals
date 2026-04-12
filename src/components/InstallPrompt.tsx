import { Download } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const shouldRender = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 1024 && !isStandalone() && !dismissed
  }, [dismissed])

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }

    const handleInstalled = () => {
      setDeferredPrompt(null)
      setDismissed(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  if (!deferredPrompt || !shouldRender) return null

  const handleInstall = async () => {
    if (!deferredPrompt) return
    const promptEvent = deferredPrompt
    await promptEvent.prompt()
    const choice = await promptEvent.userChoice
    if (choice.outcome !== 'accepted') setDismissed(true)
    setDeferredPrompt(null)
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] rounded-[28px] border border-white/10 bg-[var(--panel)]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur lg:hidden">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-[var(--accent)]/15 p-2 text-[var(--accent)]">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--text)]">Add to Home Screen</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Install Kenai Peninsula Rentals for quicker mobile booking, offline-ready assets, and direct access to your saved stays.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => setDismissed(true)} className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold">
              Not now
            </button>
            <button type="button" onClick={() => void handleInstall()} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950">
              Install app
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
