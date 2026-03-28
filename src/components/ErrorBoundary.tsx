import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  name?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(`[${this.props.name ?? 'ErrorBoundary'}]`, error.message, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#5eead4', fontSize: '0.85rem' }}>
          <strong>{this.props.name}</strong>: {this.state.error?.message}
        </div>
      )
    }
    return this.props.children
  }
}
