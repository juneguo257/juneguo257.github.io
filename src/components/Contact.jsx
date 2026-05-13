import { motion } from 'framer-motion';
import { personal } from '../data';
import { GithubIcon, LinkedinIcon } from './Hero';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 border-t border-border/60"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 text-[0.7rem] font-mono uppercase tracking-[0.25em] text-accent mb-6">
            <span className="h-px w-8 bg-accent/60" />
            Contact
            <span className="h-px w-8 bg-accent/60" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Getting in <span className="gradient-text">touch</span>.
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Always open to solving interesting problems or learning about cool things. Feel free to reach out and say hi!
          </p>

          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent/40 bg-accent/10 text-text font-medium hover:bg-accent/20 hover:border-accent transition-colors"
          >
            {personal.email}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <SocialPill
              href={personal.github}
              icon={<GithubIcon />}
              text={personal.githubHandle}
            />
            <SocialPill
              href={personal.linkedin}
              icon={<LinkedinIcon />}
              text={personal.linkedinHandle}
            />
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center text-xs font-mono text-muted">
            <span>{personal.location}</span>
            <span className="hidden sm:inline">·</span>
            <span>© {new Date().getFullYear()} {personal.name}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialPill({ href, icon, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-surface/40 hover:bg-surface/80 hover:border-accent/40 text-sm text-muted hover:text-text transition-all"
    >
      <span className="text-accent">{icon}</span>
      <span>{text}</span>
    </a>
  );
}
