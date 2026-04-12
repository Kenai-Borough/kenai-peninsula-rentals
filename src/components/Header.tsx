
import { Moon, ShieldCheck, Sun, TentTree } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { KenaiNetworkBadge } from './KenaiNetworkBadge'
import { useKenaiAuth } from '../contexts/KenaiAuthContext'
import { classNames } from '../lib/utils'
import { useTheme } from './ThemeProvider'
import MobileNav from './MobileNav'

const navLinks = [
  { to: '/browse', label: 'Browse' },
  { to: '/long-term', label: 'Long-term' },
  { to: '/host-guide', label: 'Host guide' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/safety', label: 'Safety' },
]

export default function Header() {
  const auth = useKenaiAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"><Link to="/" className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--forest)] text-white shadow-lg shadow-black/25"><TentTree size={22} /></span><div><p className="text-lg font-semibold text-[var(--text)]">Kenai Peninsula Rentals</p><p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Cabins · lodges · long stays</p></div></Link><nav className="hidden items-center gap-5 lg:flex">{navLinks.map(function (link) { return <NavLink key={link.to} to={link.to} className={function (props) { return classNames('text-sm font-medium transition hover:text-[var(--text)]', props.isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]') }}>{link.label}</NavLink> })}</nav><div className="hidden items-center gap-3 lg:flex"><button onClick={toggleTheme} className="rounded-full border border-white/10 p-2 text-[var(--muted)] transition hover:border-amber-300/40 hover:text-[var(--text)]" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>{auth.user ? <KenaiNetworkBadge /> : null}<Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"><ShieldCheck size={16} /> Admin</Link>{auth.user ? <><Link to="/account" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]">Account</Link><button onClick={function () { void auth.signOut() }} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[var(--text)]">Sign out</button></> : <Link to="/sign-in" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]">Sign in</Link>}<Link to="/create-listing" className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20">List your place</Link></div><MobileNav navLinks={navLinks} /></div></header>
  )
}
