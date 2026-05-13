import { useMemo, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { experiences } from '../data';

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Experience" title="What I've worked on!">
          Stuff I've deployed in the real world.
        </SectionHeading>

        <div ref={containerRef} className="relative">
          {/* Dim track — the full line, always visible */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[17px] md:left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/35 via-fuchsia-400/15 to-transparent"
          />

          {/* Highlighted portion — grows from the top as the section scrolls; soft fade at the trailing edge so there's no hard "you are here" line */}
          <motion.div
            className="absolute left-[17px] md:left-[21px] top-3 w-px bg-gradient-to-b from-accent via-fuchsia-400 to-rose-400 pointer-events-none"
            style={{
              height: fillHeight,
              maskImage:
                'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
              boxShadow:
                '0 0 8px rgba(167, 139, 250, 0.75), 0 0 18px rgba(167, 139, 250, 0.35), 0 0 28px rgba(240, 171, 252, 0.18)',
            }}
          />

          <ul className="space-y-10 md:space-y-12">
            {experiences.map((exp, i) => (
              <ExperienceItem
                key={`${exp.company}-${i}`}
                exp={exp}
                index={i}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  const idleBorder = exp.idleBorder ?? exp.logoBg ?? '#ffffff';
  const activeBorder = exp.logoBg ?? '#ffffff';

  const circleVariants = useMemo(
    () => ({
      idle: {
        scale: 1,
        boxShadow: '0 0 0px 0px rgba(167,139,250,0)',
        borderColor: idleBorder,
      },
      active: {
        scale: 1.1,
        boxShadow:
          '0 0 12px 1px rgba(167,139,250,0.55), 0 0 22px rgba(240,171,252,0.22)',
        borderColor: activeBorder,
      },
    }),
    [idleBorder, activeBorder]
  );

  return (
    <motion.li
      initial={{ x: 24, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-12 md:pl-16"
    >
      <motion.span
        ref={ref}
        animate={inView ? 'active' : 'idle'}
        variants={circleVariants}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: exp.logoBg ?? '#ffffff',
          borderColor: idleBorder,
          borderWidth: exp.borderWidth ?? '2.5px',
          borderStyle: 'solid',
        }}
        className="absolute left-0 md:left-1 top-1 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
      >
        <img
          src={exp.logo}
          alt={`${exp.company} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
          draggable={false}
        />
      </motion.span>

      <div className="rounded-xl border border-border bg-surface/30 hover:bg-surface/60 hover:border-accent/30 transition-colors p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
          <div>
            <h3 className="font-display text-xl font-semibold">{exp.company}</h3>
            <p className="text-accent text-sm mt-1">{exp.role}</p>
          </div>
          <div className="font-mono text-xs text-muted md:text-right shrink-0">
            <div>{exp.period}</div>
            <div className="mt-0.5">{exp.location}</div>
          </div>
        </div>

        {exp.accent && (
          <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[0.7rem] font-mono bg-accent/10 text-accent border border-accent/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {exp.accent}
          </div>
        )}

        {exp.summary && (
          <p className="mt-4 text-muted text-[0.95rem] leading-relaxed">
            {exp.summary}
          </p>
        )}
      </div>
    </motion.li>
  );
}
