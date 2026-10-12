import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Cloud, Database, GitBranch, ShieldCheck, Workflow } from 'lucide-react'

const HeroScene = lazy(() => import('./HeroScene'))

class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function InfrastructureFallback() {
  return <div className="topology-fallback" aria-hidden="true">
    <div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="orbital orbital-three" />
    <div className="platform-stack"><span/><span/><span/><div className="platform-core"><Workflow size={52} strokeWidth={1}/></div></div>
    <div className="fallback-node node-one"><Cloud size={25}/></div><div className="fallback-node node-two"><Database size={22}/></div><div className="fallback-node node-three"><ShieldCheck size={23}/></div><div className="fallback-node node-four"><GitBranch size={22}/></div>
  </div>
}

export default function EngineeringVisual() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [capable, setCapable] = useState(false)
  const [documentVisible, setDocumentVisible] = useState(true)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)')
    const update = () => {
      const device = navigator as Navigator & {deviceMemory?: number; connection?: {saveData?: boolean}}
      const limited = (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 2) || (device.deviceMemory !== undefined && device.deviceMemory <= 2) || device.connection?.saveData
      if (!media.matches || reduce || limited) { setCapable(false); return }
      try {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
        setCapable(media.matches && Boolean(context))
        context?.getExtension('WEBGL_lose_context')?.loseContext()
      } catch { setCapable(false) }
    }
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [reduce])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    if (ref.current) observer.observe(ref.current)
    const onVisibility = () => setDocumentVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  return <div ref={ref} className="engineering-visual" aria-label="Abstract illustration of connected cloud and platform infrastructure" role="img">
    <div className="scene-heading" aria-hidden="true"><span><i/>CONNECTED SYSTEMS</span><span>JAVA / CLOUD / INTEGRATIONS</span></div>
    <InfrastructureFallback />
    {capable && !reduce && <div className="webgl-layer" aria-hidden="true"><SceneBoundary><Suspense fallback={null}><HeroScene active={visible && documentVisible}/></Suspense></SceneBoundary></div>}
    <div className="scene-label scene-label-cloud" aria-hidden="true"><span>01</span>Cloud delivery<div>AWS CloudFront · S3</div></div>
    <div className="scene-label scene-label-platform" aria-hidden="true"><span>02</span>Platform integrations<div>Nuxeo · IBM Aspera</div></div>
    <div className="scene-label scene-label-pipeline" aria-hidden="true"><span>03</span>Secure pipelines<div>CI/CD · Quality gates</div></div>
    <div className="scene-footer" aria-hidden="true"><span className="scene-cross">+</span><span>A connected engineering perspective</span><span className="scene-cross">+</span></div>
  </div>
}
