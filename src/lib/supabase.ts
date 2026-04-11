import { createClient, type User } from '@supabase/supabase-js'
import { hostProfiles } from '../data/mockData'
import type { UserRole } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const storageKey = 'kpr-demo-user'

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = hasSupabaseConfig ? createClient(supabaseUrl!, supabaseAnonKey!) : null

type DemoUser = { id: string; email: string; user_metadata: { full_name?: string; role?: UserRole } }

function getStoredUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return null
  try {
    return JSON.parse(raw) as DemoUser
  } catch {
    return null
  }
}

function persistUser(user: DemoUser | null) {
  if (typeof window === 'undefined') return
  if (!user) {
    window.localStorage.removeItem(storageKey)
    return
  }
  window.localStorage.setItem(storageKey, JSON.stringify(user))
}

export async function signUp(email: string, password: string, fullName?: string, role: UserRole = 'guest') {
  if (supabase) {
    return supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role } } })
  }
  const demoUser = { id: 'demo-' + role, email, user_metadata: { full_name: fullName, role } }
  persistUser(demoUser)
  return { data: { user: demoUser as unknown as User }, error: null }
}

export async function signIn(email: string, password: string, role: UserRole = 'guest') {
  if (supabase) {
    return supabase.auth.signInWithPassword({ email, password })
  }
  const matchedProfile = hostProfiles.find((profile) => profile.email === email) ?? hostProfiles.find((profile) => profile.role === role) ?? hostProfiles[4]
  const demoUser = { id: matchedProfile.id, email, user_metadata: { full_name: matchedProfile.fullName, role: matchedProfile.role } }
  persistUser(demoUser)
  return { data: { user: demoUser as unknown as User }, error: null }
}

export async function signOut() {
  if (supabase) {
    return supabase.auth.signOut()
  }
  persistUser(null)
  return { error: null }
}

export async function getCurrentUser() {
  if (supabase) {
    const { data } = await supabase.auth.getUser()
    return data.user
  }
  return getStoredUser() as unknown as User | null
}

export async function resetPassword(email: string) {
  if (supabase) {
    return supabase.auth.resetPasswordForEmail(email)
  }
  return { data: { email }, error: null }
}
