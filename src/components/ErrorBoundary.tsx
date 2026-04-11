import { AlertTriangle } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('KPR UI crash', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-[var(--panel)] p-10 shadow-2xl">
            <AlertTriangle className="mx-auto mb-4 text-amber-400" size={42} />
            <h1 className="text-3xl font-semibold text-[var(--text)]">Something drifted off course</h1>
            <p className="mt-3 text-[var(--muted)]">Refresh the page to reload the marketplace. If this keeps happening, review the latest deployment build.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
