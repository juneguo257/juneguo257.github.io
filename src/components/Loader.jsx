import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

const TILE = 54;
const GAP = 8;
const STRIDE = TILE + GAP;
const VIEWPORT_W = 200;
const VIEWPORT_H = 80;

const xFor = (idx) => VIEWPORT_W / 2 - idx * STRIDE - TILE / 2;

// Cursor anchor points (top-left of the 18×18 svg, in viewport coords)
const CURSOR_OFFSCREEN = { x: 135, y: 96 }; // below the viewport, "off January"
const CURSOR_START = { x: 118, y: 55 }; // landed on January's bottom-right quadrant
const CURSOR_SWIPE_END = { x: 22, y: 42 }; // leftward + slight upward lift (phone-style swipe)
const CURSOR_OVER_JUN = { x: 96, y: 32 }; // tip lands near JUN tile center (100, 40)

// CSS-style cubic-bezier ease for GSAP. Returns a function `progress -> eased`
// that GSAP can accept as its `ease` param.
function bezier(p1x, p1y, p2x, p2y) {
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 10; i++) {
      const xt =
        3 * (1 - t) * (1 - t) * t * p1x +
        3 * (1 - t) * t * t * p2x +
        t * t * t;
      const dxt =
        3 * (1 - t) * (1 - t) * p1x +
        6 * (1 - t) * t * (p2x - p1x) +
        3 * t * t * (1 - p2x);
      if (Math.abs(dxt) < 1e-6) break;
      t -= (xt - x) / dxt;
      t = Math.max(0, Math.min(1, t));
    }
    return (
      3 * (1 - t) * (1 - t) * t * p1y +
      3 * (1 - t) * t * t * p2y +
      t * t * t
    );
  };
}

// Bezier curves — tuned so the eases connect smoothly when phases overlap; long
// stretched tails on the swipe/reverse so the carousel decelerates into AUG and
// the reverse picks up before motion ever fully stops.
const EASE_SETTLE = bezier(0.22, 1.2, 0.3, 1); // soft overshoot landing
const EASE_SWIPE = bezier(0.18, 1, 0.22, 1); // stretched fling, gentler start
const EASE_REVERSE = bezier(0.45, 0, 0.15, 1); // smoother S into JUN
const EASE_PRESS = bezier(0.5, 0, 0.6, 0.3); // soft accelerate into press
const EASE_RELEASE = bezier(0.22, 1.4, 0.3, 1); // long settle after pop
const EASE_RING = bezier(0.16, 1, 0.22, 1); // stretched expanding pulse
const EASE_FADE = bezier(0.6, 0, 0.2, 1); // smooth in-out

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let tl;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.set(stripRef.current, { x: xFor(0) });
    gsap.set(cursorRef.current, {
      x: CURSOR_OFFSCREEN.x,
      y: CURSOR_OFFSCREEN.y,
      opacity: 1,
      scale: 1,
    });
    gsap.set(ringRef.current, { scale: 0.88, opacity: 0 });

    const finish = () => {
      if (!cancelled) onComplete?.();
    };

    if (reduced) {
      gsap.set(stripRef.current, { x: xFor(5) });
      gsap.set(cursorRef.current, {
        x: CURSOR_OVER_JUN.x,
        y: CURSOR_OVER_JUN.y,
      });
      setLanded(true);
      tl = gsap.timeline({ onComplete: finish });
      tl.to({}, { duration: 0.25 });
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: EASE_FADE,
      });
    } else {
      tl = gsap.timeline({ onComplete: finish });

      // Cursor slides in from below the viewport onto January's bottom-right quadrant
      tl.to(cursorRef.current, {
        x: CURSOR_START.x,
        y: CURSOR_START.y,
        duration: 0.38,
        ease: EASE_SETTLE,
      });

      // Tiny JAN beat (~4 frames) — just enough to register the starting state
      tl.to({}, { duration: 0.06 });

      // Forward swipe — cursor & strip both move LEFT, heading past JUN toward AUG.
      tl.to(cursorRef.current, {
        x: CURSOR_SWIPE_END.x,
        y: CURSOR_SWIPE_END.y,
        duration: 0.5,
        ease: EASE_SWIPE,
      });
      tl.to(
        stripRef.current,
        { x: xFor(7), duration: 0.5, ease: EASE_SWIPE },
        '<'
      );

      // Reverse — starts BEFORE the forward fully completes so the strip never
      // actually parks at AUG; it just decelerates near it and the reverse picks
      // up the motion, smoothly carrying it back to JUN.
      tl.to(
        cursorRef.current,
        {
          x: CURSOR_OVER_JUN.x,
          y: CURSOR_OVER_JUN.y,
          duration: 0.42,
          ease: EASE_REVERSE,
          overwrite: 'auto',
        },
        '-=0.1'
      );
      tl.to(
        stripRef.current,
        {
          x: xFor(5),
          duration: 0.42,
          ease: EASE_REVERSE,
          overwrite: 'auto',
        },
        '<'
      );

      // Click — no pre-click pause; the tap rides straight off the reverse decel
      tl.to(cursorRef.current, {
        scale: 0.82,
        duration: 0.07,
        ease: EASE_PRESS,
      });
      tl.call(() => setLanded(true));
      tl.set(ringRef.current, { opacity: 1, scale: 0.92 });
      tl.to(
        ringRef.current,
        { scale: 1.55, opacity: 0, duration: 0.5, ease: EASE_RING },
        '<'
      );
      tl.to(
        cursorRef.current,
        { scale: 1, duration: 0.22, ease: EASE_RELEASE },
        '<0.05'
      );

      // Short hold so JUN reads
      tl.to({}, { duration: 0.08 }, '>-0.1');

      // Fade out overlay
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: EASE_FADE,
      });
    }

    return () => {
      cancelled = true;
      tl?.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const tileTop = (VIEWPORT_H - TILE) / 2;
  const ringSize = TILE + 18;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div
        className="relative rounded-2xl border border-border bg-surface/70 backdrop-blur-sm overflow-hidden"
        style={{ width: VIEWPORT_W, height: VIEWPORT_H }}
      >
        {/* Masked layer holds the strip only — cursor stays crisp at edges */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div
            ref={stripRef}
            className="absolute flex items-center"
            style={{
              top: tileTop,
              left: 0,
              gap: `${GAP}px`,
              willChange: 'transform',
            }}
          >
            {MONTHS.map((m, i) => (
              <MonthTile key={m} month={m} active={i === 5 && landed} />
            ))}
          </div>
        </div>

        {/* Click ring (centered on viewport, where JUN lands) */}
        <div
          ref={ringRef}
          className="absolute pointer-events-none rounded-xl border-2 border-accent"
          style={{
            top: (VIEWPORT_H - ringSize) / 2,
            left: (VIEWPORT_W - ringSize) / 2,
            width: ringSize,
            height: ringSize,
            willChange: 'transform, opacity',
          }}
        />

        {/* Cursor (GSAP sets x/y as absolute coords inside the viewport) */}
        <div
          ref={cursorRef}
          className="absolute z-30 pointer-events-none"
          style={{ top: 0, left: 0, willChange: 'transform' }}
        >
          <CursorIcon />
        </div>
      </div>
    </div>
  );
}

function MonthTile({ month, active }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-stretch rounded-lg overflow-hidden"
      style={{
        width: TILE,
        height: TILE,
        background: active
          ? 'linear-gradient(135deg, #c4b5fd 0%, #f0abfc 50%, #fda4af 100%)'
          : '#ffffff',
        boxShadow: active ? '0 0 18px rgba(167,139,250,0.6)' : 'none',
        transition: 'background 0.22s ease, box-shadow 0.22s ease',
      }}
    >
      <div
        className="relative flex items-center justify-center gap-[5px] pt-[3px] pb-[2px]"
        style={{ background: active ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.14)' }}
      >
        <span className="block w-[3px] h-[7px] bg-black rounded-full" />
        <span className="block w-[3px] h-[7px] bg-black rounded-full" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span
          className="font-display font-bold text-black"
          style={{ fontSize: 14, letterSpacing: '-0.02em' }}
        >
          {month}
        </span>
      </div>
    </div>
  );
}

function CursorIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="block"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}
    >
      <path
        d="M5 3 L5 20 L9.5 16 L12.4 21.2 L14.7 20.2 L11.8 15 L18 15 Z"
        fill="white"
        stroke="black"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
