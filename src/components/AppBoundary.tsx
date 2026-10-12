import { Component, type ReactNode } from 'react'
import { profile } from '../data/resume'

export default class AppBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false}
  static getDerivedStateFromError() { return {failed: true} }
  render() {
    if (!this.state.failed) return this.props.children
    return <main className="app-recovery"><p className="section-kicker">SOFTWARE ENGINEER</p><h1>{profile.name}</h1><p>The portfolio couldn’t load. You can still connect or download the resume.</p><div className="hero-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Email Shristy</a><a className="button button-secondary" href={`${import.meta.env.BASE_URL}resume.pdf`} download>Download Resume</a><button className="button button-secondary" onClick={()=>window.location.reload()}>Reload portfolio</button></div></main>
  }
}
