import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { useToast } from '../components/ToastProvider'
import { signIn } from '../lib/supabase'
import { buildStructuredData } from '../lib/utils'
import type { UserRole } from '../types'

export default function LoginPage() {
  const [email, setEmail] = useState('traveler@example.com')
  const [password, setPassword] = useState('demo-password')
  const [role, setRole] = useState<UserRole>('guest')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { pushToast } = useToast()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password, role)
    setLoading(false)
    if (error) {
      pushToast({ tone: 'error', title: 'Sign-in failed', message: error.message })
      return
    }
    pushToast({ tone: 'success', title: 'Signed in', message: 'Demo mode works without Supabase credentials too.' })
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <SEO title="Sign in" description="Sign in to manage Kenai Peninsula Rentals trips and hosting." structuredData={buildStructuredData()} />
      <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-[var(--panel)] p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Use demo credentials or your Supabase account.</p>
        <label className="field mt-5"><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="field mt-4"><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        <label className="field mt-4"><span>Role preview</span><select value={role} onChange={(event) => setRole(event.target.value as UserRole)}><option value="guest">Guest</option><option value="host">Host</option><option value="admin">Admin</option></select></label>
        <button disabled={loading} className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 px-5 py-3 font-semibold text-slate-950">{loading ? 'Signing in...' : 'Continue to dashboard'}</button>
        <p className="mt-5 text-sm text-[var(--muted)]">Need an account? <Link to="/signup" className="font-semibold text-emerald-600">Create one</Link></p>
      </form>
    </div>
  )
}
