import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { projects } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Projects" title="Things I've built!">
          Stuff I've built for classes & experimental projects.
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const Card = p.link ? motion.a : motion.article;
            const linkProps = p.link
              ? { href: p.link, target: '_blank', rel: 'noreferrer' }
              : {};
            return (
              <Card
                key={p.name}
                {...linkProps}
                initial={{ y: 36, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative block rounded-2xl border border-border bg-surface/40 p-7 overflow-hidden hover:border-accent/40 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-fuchsia-400/0 group-hover:from-accent/[0.06] group-hover:to-fuchsia-400/[0.06] transition-colors pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold">
                      {p.name}
                    </h3>
                    {p.link ? <GithubIcon /> : <FolderIcon />}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[0.7rem] font-mono rounded-full bg-bg/60 border border-border text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-text">{p.description}</p>
                  <ul className="mt-4 space-y-2 text-muted text-[0.95rem] leading-relaxed">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FolderIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent group-hover:text-accent2 transition-colors"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5z" />
    </svg>
  );
}
