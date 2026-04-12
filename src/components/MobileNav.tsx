import { Menu, Moon, ShieldCheck, Sun, TentTree, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { KenaiNetworkBadge } from './KenaiNetworkBadge'
import { useKenaiAuth } from '../contexts/KenaiAuthContext'
import { classNames } from '../lib/utils'
import { useTheme } from './ThemeProvider'

interface MobileNavProps {
  navLinks: Array<{ to: string; label: string }>
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const auth = useKenaiAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (drawerRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <button ref={triggerRef} onClick={toggleTheme} className="rounded-full border border-white/10 p-2 text-[var(--muted)]" aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full border border-white/10 p-2 text-[var(--text)]"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed inset-0 z-40 bg-slate-950/70 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden="true" />

      <div
        id="mobile-navigation"
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--surface)] px-5 py-5 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--forest)] text-white shadow-lg shadow-black/25"><TentTree size={22} /></span>
            <div><p className="text-lg font-semibold text-[var(--text)]">Kenai Peninsula Rentals</p><p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Cabins · lodges · long stays</p></div>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 p-2 text-[var(--text)]" aria-label="Close navigation drawer">
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 rounded-[28px] border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Account</p>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{auth.user?.email ?? 'Browsing as guest'}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{auth.user ? 'Manage your stays and host activity.' : 'Sign in to save favorite rentals and manage bookings.'}</p>
            </div>
            {auth.user ? <KenaiNetworkBadge /> : null}
          </div>
        </div>

        <nav className="mt-5 grid gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => classNames('rounded-2xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]', isActive ? 'bg-white/5 text-[var(--text)]' : '')}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/admin" className="rounded-2xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]">Admin</NavLink>
        </nav>

        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
          <Link to={auth.user ? '/account' : '/sign-in'} className="rounded-full border border-white/10 px-4 py-3 text-center text-sm font-semibold text-[var(--text)]">
            {auth.user ? 'Account' : 'Sign in'}
          </Link>
          {auth.user ? (
            <button onClick={() => void auth.signOut()} className="rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-[var(--text)]" type="button">
              Sign out
            </button>
          ) : null}
          <Link to="/create-listing" className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 text-center text-sm font-semibold text-slate-950">
            List your place
          </Link>
          <Link to="/admin" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-[var(--muted)] transition hover:text-[var(--text)]">
            <ShieldCheck size={16} /> Admin
          </Link>
        </div>
      </div>
    </div>
  )
}
