import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('home')
  const key = ids.join(',')
  useEffect(() => {
    const sections = key.split(',').map(id => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const threshold = Math.min(window.innerHeight * 0.35, 260)
        let current = 'home'
        for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section.id
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contact'
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [key])
  return active
}
