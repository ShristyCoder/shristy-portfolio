import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig, useScroll } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Award, Check, ChevronDown, Code2, Copy, Database, Download, GitBranch, GraduationCap, Layers3, Linkedin, Mail, MapPin, Menu, Network, ShieldCheck, Sparkles, Terminal, X, type LucideIcon } from 'lucide-react'
import { profile, skillGroups, experience, caseStudies, careerJourney, certifications, education, type CaseStudy } from './data/resume'
import EngineeringVisual from './components/EngineeringVisual'
import { MagneticLink, Reveal, SectionTitle, TiltCard } from './components/Primitives'
import { useActiveSection } from './hooks/useActiveSection'

const navigation = [{id:'about',label:'About'}, {id:'work',label:'Work'}, {id:'expertise',label:'Expertise'}, {id:'experience',label:'Experience'}]
const sectionIds = ['home', 'about', 'work', 'expertise', 'experience', 'journey', 'credentials', 'education', 'contact']
const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`
const skillIcons: Record<string, LucideIcon> = {backend:Code2,cloud:Database,delivery:GitBranch,validation:Layers3,quality:ShieldCheck,'ai-tools':Sparkles}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); button.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#home" onClick={()=>setMenuOpen(false)}><span className="brand-mark">s<span>p</span><i/></span>{' '}<span className="brand-name">shristy<span> / portfolio</span></span><span className="sr-only"> — {profile.name}, back to top</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(item=><a key={item.id} className={active===item.id?'active':''} aria-current={active===item.id?'location':undefined} href={`#${item.id}`}>{item.label}</a>)}</nav>
        <a href="#contact" className="header-contact">Let’s connect<ArrowUpRight size={15}/></a>
        <button ref={button} className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen?'Close navigation':'Open navigation'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...navigation,{id:'credentials',label:'Credentials'},{id:'contact',label:'Contact'}].map(item=><a key={item.id} href={`#${item.id}`} aria-current={active===item.id?'location':undefined} onClick={()=>setMenuOpen(false)}>{item.label}<ArrowUpRight size={18}/></a>)}</nav>}
      <motion.div className="scroll-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/>
    </header>
  </>
}

function Hero() {
  return <section id="home" className="hero section-shell">
    <div className="hero-grid" aria-hidden="true"/>
    <div className="hero-content">
      <div className="hero-eyebrow"><span className="eyebrow-dot"/>{profile.title}<span className="eyebrow-separator">/</span>{profile.yearsLabel} of experience</div>
      <h1><span>Shristy</span><span className="name-accent">Priyadarshini<span className="name-period">.</span></span></h1>
      <p className="hero-role">{profile.specialization}.<br/><span>Enterprise integrations.<br/>Secure asset delivery.</span></p>
      <p className="hero-positioning">{profile.positioning}</p>
      <div className="hero-actions"><MagneticLink href="#work" className="button button-primary">Explore My Work<ArrowUpRight size={18}/></MagneticLink><MagneticLink href="#experience" className="button button-secondary">View Experience<ArrowRight size={17}/></MagneticLink></div>
      <div className="hero-links"><a href={resumeUrl} download="Shristy-Priyadarshini-Resume.pdf"><Download size={15}/>Download Resume</a>{profile.linkedin&&<a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={15}/>LinkedIn<ArrowUpRight size={13}/></a>}</div>
    </div>
    <EngineeringVisual/>
    <div className="hero-bottom"><div className="hero-location"><MapPin size={14}/>{profile.location}<span/> {profile.relocation}</div><a href="#about" className="scroll-cue">SCROLL TO EXPLORE<span><ArrowDown size={17}/></span></a></div>
  </section>
}

function About() {
  return <section id="about" className="section-shell about-section">
    <SectionTitle index="01" eyebrow="THE ENGINEERING PERSPECTIVE" title={<>A backend mindset.<br/><span>A systems perspective.</span></>}/>
    <div className="about-layout"><Reveal className="about-intro"><p>{profile.summary}</p><div className="about-facts"><div><strong>5+</strong><span>Years of experience</span></div><div><strong>Java</strong><span>Backend foundation</span></div><div><strong>Cloud</strong><span>Enabled delivery</span></div></div></Reveal>
      <Reveal className="principles"><div><Code2/><h3>Build the foundation</h3><p>Java, Spring Boot, REST APIs, and enterprise data access.</p></div><div><Network/><h3>Connect the systems</h3><p>Enterprise connectors, file transfers, and secure Nuxeo asset delivery.</p></div><div><ShieldCheck/><h3>Deliver with confidence</h3><p>Automated testing, security remediation, and validated connector releases.</p></div></Reveal>
    </div>
  </section>
}

function WorkDiagram({index}: {index:number}) {
  const variant=index%4
  return <div className={`work-diagram diagram-${variant}`} aria-hidden="true"><svg viewBox="0 0 500 150" fill="none"><defs><linearGradient id={`line-${index}`}><stop stopColor="#70e4ea"/><stop offset="1" stopColor="#9290f8"/></linearGradient></defs><g stroke={`url(#line-${index})`} strokeWidth="1">
    {variant===0&&<><path d="M65 75h90l30-30h130l30 30h90M155 75l30 30h130l30-30" opacity=".45"/><rect x="60" y="56" width="38" height="38" rx="9" fill="#101e2d"/><rect x="224" y="49" width="52" height="52" rx="12" fill="#10222c"/><rect x="400" y="56" width="38" height="38" rx="9" fill="#131e31"/><path d="m244 67 8 8-8 8M73 68h12m-12 7h12m-12 7h7M412 68h12m-12 7h12m-12 7h7"/><circle cx="169" cy="61" r="3" fill="#76dfed"/><circle cx="335" cy="65" r="3" fill="#a898f5"/></>}
    {variant===1&&<><path d="M95 75h112m86 0h112M250 32v14M250 104v14" opacity=".45"/><path d="m250 42 34 13v25c0 17-34 29-34 29s-34-12-34-29V55Z" fill="#0c2230"/><path d="m238 75 9 9 16-19" strokeWidth="2"/><circle cx="90" cy="75" r="13"/><circle cx="410" cy="75" r="13"/><circle cx="167" cy="75" r="3" fill="#76dfed"/><circle cx="334" cy="75" r="3" fill="#a898f5"/></>}
    {variant===2&&<><path d="M115 45h75l30 30h64m-169 30h75l30-30M285 75h96" opacity=".45"/><rect x="95" y="31" width="28" height="28" rx="6" fill="#10222c"/><rect x="95" y="91" width="28" height="28" rx="6" fill="#10222c"/><rect x="233" y="58" width="35" height="35" rx="8" fill="#11222e"/><rect x="379" y="54" width="42" height="42" rx="10" fill="#151c33"/><path d="m391 75 6 6 13-14" strokeWidth="2"/><path d="M108 39v12m-6-6h12M108 99v12m-6-6h12"/></>}
    {variant===3&&<><path d="M91 74h320" strokeDasharray="4 6" opacity=".35"/>{[100,200,300,400].map((x,i)=><g key={x}><circle cx={x} cy="75" r="18" fill="#101e2d"/><path d={`m${x-6} 75 4 4 8-9`}/>{i<3&&<circle cx={x+50} cy="75" r="2.5" fill="#76dfed"/>}</g>)}</>}
  </g></svg></div>
}

function CaseCard({item,index}: {item:CaseStudy;index:number}) {
  return <Reveal><TiltCard className="case-card"><div className="case-topline"><span>{item.number} / {item.category}</span><ArrowUpRight size={18}/></div><WorkDiagram index={index}/><div className="case-content"><span className="case-company">{item.company}</span><h3>{item.title}</h3><p className="case-summary">{item.summary}</p><div className="tech-tags">{item.technologies.map(tech=><span key={tech}>{tech}</span>)}</div><div className="case-impact"><span className="impact-mark"/><p>{item.result}</p></div><details className="case-details"><summary>Inside the engineering<ChevronDown size={17}/></summary><div className="case-details-body"><h4>Challenge</h4><p>{item.challenge}</p><h4>Engineering approach</h4><p>{item.approach}</p></div></details></div></TiltCard></Reveal>
}

function Work() {
  const [showAll, setShowAll] = useState(false)
  return <section id="work" className="section-shell work-section">
    <div className="section-heading-row"><SectionTitle index="02" eyebrow="SELECTED PROFESSIONAL WORK" title={<>Engineering that<br/><span>holds up in practice.</span></>} description="A closer look at the systems, integrations, and delivery challenges I’ve worked on."/><span className="section-side-note"><Terminal size={16}/> FROM THE CODEBASE TO THE RELEASE</span></div>
    <div className="case-grid" id="engineering-work-grid">{caseStudies.slice(0,showAll?caseStudies.length:4).map((item,index)=><CaseCard key={item.id} item={item} index={index}/>)}</div>
    <button className="button button-secondary work-expand" aria-expanded={showAll} aria-controls="engineering-work-grid" onClick={()=>setShowAll(!showAll)}>{showAll?'Show fewer case studies':'Explore all engineering work'}<ChevronDown className={showAll?'rotate':''} size={17}/></button>
  </section>
}

const skillFilters=[{id:'all',label:'All layers'},{id:'build',label:'Backend',groups:['backend']},{id:'ship',label:'Delivery',groups:['cloud','delivery','validation']},{id:'tools',label:'Quality & AI',groups:['quality','ai-tools']}]
function Expertise() {
  const [filter, setFilter] = useState('all')
  const selected=skillFilters.find(item=>item.id===filter)
  const shown=skillGroups.filter(group=>filter==='all'||selected?.groups?.includes(group.id))
  return <section id="expertise" className="section-shell expertise-section"><div className="section-heading-row"><SectionTitle index="03" eyebrow="TECHNICAL EXPERTISE" title={<>The tools behind<br/><span>the systems.</span></>} description="From Java services to cloud delivery, quality gates, and enterprise integrations."/><div className="skill-filters" role="group" aria-label="Filter technical expertise">{skillFilters.map(item=><button key={item.id} aria-pressed={item.id===filter} onClick={()=>setFilter(item.id)}>{item.label}</button>)}</div></div><div className="skill-grid" id="skills-results">{shown.map(group=>{const Icon=skillIcons[group.id]??Code2;return <div className={`skill-card skill-${group.id}`} key={group.id}><div className="skill-card-heading"><Icon size={21}/><span className="skill-node"/></div><h3>{group.title}</h3><div className="skill-items">{group.items.map(skill=><span key={skill}>{skill}</span>)}</div></div>})}</div><p className="sr-only" role="status">{shown.length} expertise categories displayed.</p></section>
}

function Experience() {
  return <section id="experience" className="section-shell experience-section"><SectionTitle index="04" eyebrow="PROFESSIONAL EXPERIENCE" title={<>Built through experience.<br/><span>Refined through delivery.</span></>}/><div className="experience-timeline">{experience.map((item,index)=><Reveal key={item.id} className="experience-entry"><div className="experience-date"><span className={`timeline-dot ${index===0?'current':''}`}/><span>{item.dates}</span>{index===0&&<span className="current-role">CURRENT ROLE</span>}</div><div className="experience-card"><div className="experience-card-top"><div><span className="experience-domain">{item.companyDomain&&<>{item.companyDomain} <span> / </span> </>}{item.location}</span><h3>{item.company}</h3><p className="experience-role">{item.role}</p>{item.roleDomain&&<p className="experience-role-domain">{item.roleDomain}</p>}</div><span className="company-monogram" aria-hidden="true">{index===0?'H':index===1?'A':'DXC'}</span></div><p className="experience-lead">{item.bullets[0]}</p><details className="experience-details"><summary>{item.bullets.length>1?'Explore responsibilities & impact':'Explore technologies'}<ChevronDown size={18}/></summary><div className="experience-details-body">{item.bullets.length>1&&<ul>{item.bullets.slice(1).map(bullet=><li key={bullet}>{bullet}</li>)}</ul>}<div className="tech-tags">{item.technologies.map(tech=><span key={tech}>{tech}</span>)}</div></div></details></div></Reveal>)}</div></section>
}

function Journey() {
  return <section id="journey" className="section-shell journey-section"><SectionTitle index="05" eyebrow="CAREER JOURNEY" title={<>From application services<br/><span>to enterprise integrations.</span></>}/><div className="journey-track">{careerJourney.map((stage,index)=><Reveal key={stage.company} className="journey-stage" delay={index*0.07}><div className="journey-marker"><span>{String(index+1).padStart(2,'0')}</span><ArrowRight size={17}/></div><p className="journey-dates">{stage.dates}</p><h3>{stage.company}</h3><p className="journey-role">{stage.role}</p><p className="journey-focus">{stage.focus}</p></Reveal>)}</div></section>
}

function Credentials() {
  return <><section id="credentials" className="section-shell credentials-section"><SectionTitle index="06" eyebrow="CERTIFICATIONS" title={<>A foundation of<br/><span>continuous learning.</span></>}/><div className="certification-grid">{certifications.map(cert=><Reveal key={cert}><div className="certification-card"><span className="certification-icon"><Award size={23}/></span><div><span className="certification-source">CERTIFICATION</span><h3>{cert}</h3></div><Check size={15} className="certification-check" aria-hidden="true"/></div></Reveal>)}</div></section><section id="education" className="section-shell education-section"><Reveal className="education-card"><div className="education-icon"><GraduationCap size={32}/></div><div><div className="section-kicker">07 <span className="kicker-line"/>EDUCATION</div><h2>{education.degree}</h2><p>{education.university}</p></div><div className="education-result"><span>{education.year}</span><strong><span>CGPA</span>{education.cgpa}</strong></div></Reveal></section></>
}

function Contact() {
  const [status, setStatus] = useState('')
  const timer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(()=>()=>clearTimeout(timer.current),[])
  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(profile.email)
      else {
        const area=document.createElement('textarea');area.value=profile.email;area.style.position='fixed';area.style.opacity='0';document.body.append(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied)throw new Error('Copy unavailable')
      }
      setStatus('Email copied')
    } catch { setStatus('Copy unavailable. Use the email link.') }
    clearTimeout(timer.current);timer.current=setTimeout(()=>setStatus(''),3500)
  }
  return <section id="contact" className="section-shell contact-section"><div className="contact-glow" aria-hidden="true"/><Reveal><div className="section-kicker">08 <span className="kicker-line"/>LET’S CONNECT</div><h2>Good engineering<br/>starts with a <span>conversation.</span></h2><p>Hiring for Java backend or enterprise integration work?<br/>Let’s talk about the systems you’re building.</p><div className="contact-actions"><MagneticLink className="button button-primary" href={`mailto:${profile.email}`}>Start a conversation<ArrowUpRight size={18}/></MagneticLink>{profile.linkedin&&<MagneticLink className="button button-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/>{'Connect on LinkedIn'}<ArrowUpRight size={16}/></MagneticLink>}</div><div className="email-row"><a href={`mailto:${profile.email}`}><Mail size={16}/>{profile.email}</a><button onClick={copyEmail} className="copy-email" aria-label="Copy email address">{status==='Email copied'?<Check size={16}/>:<Copy size={16}/>}</button></div><span className="copy-status" role="status" aria-live="polite">{status}</span><div className="contact-location"><MapPin size={15}/>{profile.location}<span/> {profile.relocation}</div></Reveal></section>
}

function Footer() {
  return <footer className="site-footer section-shell"><a className="footer-brand" href="#home">Shristy Priyadarshini<span>.</span></a><p>© {new Date().getFullYear()} · Software Engineer</p><a href={resumeUrl} download="Shristy-Priyadarshini-Resume.pdf">Download Resume<Download size={15}/></a><a href="#home" className="back-to-top" aria-label="Back to top"><ArrowUpRight size={18}/></a></footer>
}

export default function App() {
  return <MotionConfig reducedMotion="user"><Header/><main id="main"><Hero/><About/><Work/><Expertise/><Experience/><Journey/><Credentials/><Contact/></main><Footer/></MotionConfig>
}
