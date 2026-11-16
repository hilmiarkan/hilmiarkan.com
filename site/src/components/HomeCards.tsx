// The two floating cards on the home page: the avatar and the name card.
// Each can be dragged, thrown, and springs back when pulled past its limit.
//
// This is a React component because it needs to react to the pointer many
// times per second. Astro renders it to HTML at build time (so the cards are
// visible immediately) and React takes over in the browser ("hydration").
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './HomeCards.css';

// How far a card may travel from where it starts, in pixels.
const MAX_TRAVEL = { x: 400, y: 300 };

// The glow trails the pointer slightly instead of sticking to it.
const GLOW_SPRING = { stiffness: 170, damping: 26 };

interface Limits {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface DragCardProps {
  className: string;
  children: ReactNode;
}

function DragCard({ className, children }: DragCardProps) {
  // A ref is a handle to the real DOM element, for measuring it.
  const card = useRef<HTMLDivElement>(null);

  // Motion values hold numbers that change every frame. Unlike state, changing
  // them does not re-render the component, which keeps dragging smooth.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useSpring(0, GLOW_SPRING);
  const glowY = useSpring(0, GLOW_SPRING);

  // State: the drag limits. They depend on the screen size, so they are
  // measured in the browser after the first render and again on resize.
  const [limits, setLimits] = useState<Limits>({
    left: -MAX_TRAVEL.x,
    right: MAX_TRAVEL.x,
    top: -MAX_TRAVEL.y,
    bottom: MAX_TRAVEL.y,
  });

  useEffect(() => {
    function measure() {
      const element = card.current;
      const area = element?.closest('[data-drag-area]');
      if (!element || !area) return;
      const box = element.getBoundingClientRect();
      const bounds = area.getBoundingClientRect();
      // Where the card rests, ignoring how far it has been dragged so far.
      const restLeft = box.left - x.get();
      const restTop = box.top - y.get();
      // Never further than MAX_TRAVEL, and never outside the visible area.
      setLimits({
        left: -Math.min(MAX_TRAVEL.x, Math.max(0, restLeft - bounds.left)),
        right: Math.min(MAX_TRAVEL.x, Math.max(0, bounds.right - (restLeft + box.width))),
        top: -Math.min(MAX_TRAVEL.y, Math.max(0, restTop - bounds.top)),
        bottom: Math.min(MAX_TRAVEL.y, Math.max(0, bounds.bottom - (restTop + box.height))),
      });
    }
    measure();
    window.addEventListener('resize', measure);
    // Cleanup: runs when the component is removed from the page.
    return () => window.removeEventListener('resize', measure);
  }, [x, y]);

  // Move the glow to the pointer, measured from the card's top-left corner.
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - box.left);
    glowY.set(event.clientY - box.top);
  }

  return (
    <motion.div
      ref={card}
      className={`drag-card ${className}`}
      style={{ x, y }}
      drag
      dragConstraints={limits}
      dragElastic={0.5}
      onPointerMove={followPointer}
    >
      <motion.span className="drag-card-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      {children}
    </motion.div>
  );
}

interface HomeCardsProps {
  name: string;
  role: string;
  avatar: string;
}

export default function HomeCards({ name, role, avatar }: HomeCardsProps) {
  return (
    <div className="home-cards">
      <DragCard className="avatar-card">
        <img src={avatar} alt="" width={82} height={82} decoding="async" draggable={false} />
        <span className="avatar-fold" aria-hidden="true">
          <svg viewBox="0 0 256 256" width="18" height="19" fill="currentColor">
            <circle cx="128" cy="128" r="16" />
            <circle cx="64" cy="128" r="16" />
            <circle cx="192" cy="128" r="16" />
          </svg>
        </span>
      </DragCard>

      <DragCard className="name-card">
        <h1>{name}</h1>
        <p>{role}</p>
      </DragCard>
    </div>
  );
}
