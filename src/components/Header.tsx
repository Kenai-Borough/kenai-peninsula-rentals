import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, ShieldCheck, Sun, TentTree, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getCurrentUser, signOut } from '../lib/supabase'
import { classNames } from '../lib/utils'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/long-term', label: 'Long-term' },
  { to: '/host-guide', label: 'Host guide' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/safety', label: 'Safety' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    getCurrentUser().then((user) => setEmail(user?.email ?? null))
  }, [])

  async function handleSignOut() {
    await signOut()
    setEmail(null)
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--forest)] text-white shadow-lg shadow-black/25">
            <TentTree size={22} />
          </span>
          <div>
            <p className="text-lg font-semibold text-[var(--text)]">Kenai Peninsula Rentals</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Cabins · lodges · long stays</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => classNames('text-sm font-medium transition hover:text-[var(--text)]', isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={toggleTheme} className="rounded-full border border-white/10 p-2 text-[var(--muted)] transition hover:border-amber-300/40 hover:text-[var(--text)]">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]">
            <ShieldCheck size={16} /> Admin
          </Link>
          {email ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]">Dashboard</Link>
              <button onClick={handleSignOut} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[var(--text)]">Sign out</button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]">Sign in</Link>
          )}
          <Link to="/create-listing" className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20">List your place</Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={toggleTheme} className="rounded-full border border-white/10 p-2 text-[var(--muted)]">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setOpen((current) => !current)} className="rounded-full border border-white/10 p-2 text-[var(--text)]">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]">
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/admin" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]">Admin</NavLink>
              <NavLink to={email ? '/dashboard' : '/login'} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]">
                {email ? 'Dashboard' : 'Sign in'}
              </NavLink>
              <NavLink to="/create-listing" onClick={() => setOpen(false)} className="rounded-2xl bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-4 py-3 text-center font-semibold text-slate-950">
                List your place
              </NavLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
