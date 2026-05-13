import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-3 text-[0.7rem] font-mono uppercase tracking-[0.25em] text-accent mb-4">
        <span className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">{children}</p>
      )}
    </motion.div>
  );
}
