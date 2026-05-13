import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { education } from '../data';

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Education" title="Where I learn!" />
        <motion.article
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-border bg-surface/40 p-8 sm:p-10 overflow-hidden"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent via-fuchsia-400 to-rose-400"
          />

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold">
                {education.school}
              </h3>
              <p className="text-muted text-sm mt-1">
                {education.schoolDetail}
              </p>
              <p className="mt-4 text-text">{education.degree}</p>
            </div>
            <div className="text-sm font-mono text-muted md:text-right shrink-0">
              <div>{education.location}</div>
              <div className="mt-1">Expected · {education.graduation}</div>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-[0.7rem] font-mono uppercase tracking-[0.2em] text-muted mb-3">
              Relevant Coursework
            </div>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ y: 12, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="px-3 py-1.5 text-sm rounded-full border border-border bg-bg/40 text-muted hover:text-text hover:border-accent/40 transition-colors"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
