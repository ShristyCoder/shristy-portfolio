import { motion, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function SectionTitle({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: ReactNode; description?: string }) {
  return <Reveal className="section-heading"><div className="section-kicker"><span>{index}</span><span className="kicker-line" />{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</Reveal>
}

export function MagneticLink({ children, className = '', href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${(event.clientX - box.left - box.width / 2) * 0.08}px`)
    ref.current.style.setProperty('--my', `${(event.clientY - box.top - box.height / 2) * 0.08}px`)
  }
  function reset() { ref.current?.style.setProperty('--mx', '0px'); ref.current?.style.setProperty('--my', '0px') }
  return <a ref={ref} href={href} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={reset} onBlur={reset} {...rest}>{children}</a>
}

export function TiltCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  function move(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--rx', `${(event.clientY - box.top - box.height / 2) / box.height * -3}deg`)
    ref.current.style.setProperty('--ry', `${(event.clientX - box.left - box.width / 2) / box.width * 3}deg`)
  }
  function reset() { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg') }
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={reset} style={style}>{children}</div>
}
