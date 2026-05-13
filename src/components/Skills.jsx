import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skills } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Skills" title="Things I've Learned!" />
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([label, items]) => (
            <SkillBlock key={label} label={label} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ label, items }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-surface/30 p-6 sm:p-7"
    >
      <div className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-accent mb-4">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((s, i) => (
          <motion.span
            key={s}
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 * i }}
            className="px-3 py-1.5 text-sm rounded-lg border border-border bg-bg/40 hover:border-accent/40 hover:text-text text-muted transition-colors"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
