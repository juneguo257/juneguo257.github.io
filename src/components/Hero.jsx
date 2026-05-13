import { motion } from 'framer-motion';
import { personal } from '../data';

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg" />
      <Blob className="top-[-15%] left-[-10%] bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10" />
      <Blob
        className="top-[35%] right-[-12%] bg-gradient-to-br from-cyan-500/20 to-violet-500/10"
        delay={3}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 w-full">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-3 text-[0.7rem] font-mono uppercase tracking-[0.25em] text-muted mb-6"
          >
            <span className="h-px w-8 bg-muted/60" />
            CS @ Penn · Class of 2027
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight"
          >
            <span className="block text-muted text-2xl sm:text-3xl md:text-4xl font-medium mb-3">
              Hi, I'm
            </span>
            <span className="gradient-text">{personal.name}</span>
            <span className="text-accent cursor-blink ml-1">_</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg sm:text-xl text-muted max-w-2xl leading-relaxed"
          >
            CS @ Penn, systems concentration. Loves teaching and building cool things! Part of{' '}
            <TaglineLink href="https://www.cis.upenn.edu/~cis120/current/">
              CIS 1200
            </TaglineLink>
            {' & '}
            <TaglineLink href="https://pennlabs.org/">Penn Labs</TaglineLink>.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Pill icon={<LocationIcon />} text={personal.location} />
            <Pill
              href={`mailto:${personal.email}`}
              icon={<MailIcon />}
              text={personal.email}
            />
            <Pill
              href={personal.github}
              icon={<GithubIcon />}
              text={personal.githubHandle}
              external
            />
            <Pill
              href={personal.linkedin}
              icon={<LinkedinIcon />}
              text={personal.linkedinHandle}
              external
            />
          </motion.div>

          <motion.a
            variants={item}
            href="#experience"
            className="mt-14 inline-flex items-center gap-2 text-muted hover:text-text text-sm font-mono group"
          >
            <span>scroll</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Blob({ className = '', delay = 0 }) {
  return (
    <div
      className={`absolute w-[40rem] h-[40rem] rounded-full blob blur-3xl pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function TaglineLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-text underline decoration-accent/40 decoration-2 underline-offset-[3px] hover:text-accent hover:decoration-accent transition-colors"
    >
      {children}
    </a>
  );
}

function Pill({ icon, text, href, external }) {
  const cls =
    'inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 text-sm text-muted hover:text-text transition-all';
  const inner = (
    <>
      <span className="text-accent">{icon}</span>
      <span>{text}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}
export function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5z" />
    </svg>
  );
}
export function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}
