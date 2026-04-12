import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { useToast } from '../components/ToastProvider'
import { signUp } from '../lib/supabase'
import { emailService } from '../lib/email'
import { emailTemplates } from '../lib/email-templates'
import { buildStructuredData } from '../lib/utils'
import type { UserRole } from '../types'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole>('guest')
  const navigate = useNavigate()
  const { pushToast } = useToast()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const { error } = await signUp(email, password, fullName, role)
    if (error) {
      pushToast({ tone: 'error', title: 'Sign-up failed', message: error.message })
      return
    }
    const welcome = emailTemplates.welcomeEmail({ recipientName: fullName || 'there', dashboardUrl: `${window.location.origin}/dashboard` })
    const result = await emailService.send({ to: email, ...welcome, metadata: { notificationType: 'welcome-email', userRole: role } })
    pushToast({ tone: 'success', title: 'Account created', message: result.queued ? 'Your account is ready. Email delivery may be delayed.' : 'Check your inbox for your branded welcome email.' })
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <SEO title="Create account" description="Create a guest or host account on Kenai Peninsula Rentals." structuredData={buildStructuredData()} />
      <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-[var(--panel)] p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <label className="field mt-5"><span>Full name</span><input value={fullName} onChange={(event) => setFullName(event.target.value)} /></label>
        <label className="field mt-4"><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="field mt-4"><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} /></label>
        <label className="field mt-4"><span>Account type</span><select value={role} onChange={(event) => setRole(event.target.value as UserRole)}><option value="guest">Guest</option><option value="host">Host</option></select></label>
        <button className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 px-5 py-3 font-semibold text-slate-950">Create account</button>
        <p className="mt-3 text-xs text-slate-400">By creating an account, you agree to our <Link to="/terms" className="text-sky-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-sky-400 hover:underline">Privacy Policy</Link>.</p>
        <p className="mt-5 text-sm text-[var(--muted)]">Already joined? <Link to="/login" className="font-semibold text-emerald-600">Sign in</Link></p>
      </form>
    </div>
  )
}
