// Side Projects: a grid of cards. A card that has a full-length image opens
// it in an overlay styled as a browser window.
import { useEffect, useRef, useState } from 'react';
import './SideProjects.css';

export interface Project {
  id: string;
  title: string;
  date: string;
  column: number;
  video?: string;
  thumb?: string;
  full?: { src: string; width: number; height: number };
}

const COLUMNS = [1, 2, 3, 4];

export default function SideProjects({ projects }: { projects: Project[] }) {
  // State: the id of the project whose overlay is open, or null for none.
  // Changing it re-renders the component, which shows or hides the overlay.
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((project) => project.id === openId) ?? null;

  // Remembers which card opened the overlay, to give it focus back on close.
  const opener = useRef<HTMLElement | null>(null);

  function show(project: Project, card: HTMLElement) {
    opener.current = card;
    setOpenId(project.id);
  }

  function close() {
    setOpenId(null);
    opener.current?.focus();
  }

  return (
    <>
      <div className="projects appear">
        {COLUMNS.map((column) => (
          <div className="projects-column" key={column}>
            {projects
              .filter((project) => project.column === column)
              .map((project) => (
                <Card key={project.id} project={project} onOpen={show} />
              ))}
          </div>
        ))}
      </div>

      <Overlay project={open} onClose={close} />
    </>
  );
}

interface CardProps {
  project: Project;
  onOpen: (project: Project, card: HTMLElement) => void;
}

function Card({ project, onOpen }: CardProps) {
  // A looping video sits on its own, with the caption underneath.
  if (project.video) {
    return (
      <figure className="video-card">
        <video src={project.video} autoPlay loop muted playsInline preload="metadata" />
        <figcaption>
          <span className="card-title">{project.title}</span>
          <span className="card-date">{project.date}</span>
        </figcaption>
      </figure>
    );
  }

  const content = (
    <>
      <img src={project.thumb} alt="" loading="lazy" decoding="async" />
      <span className="card-caption">
        <span className="card-title">{project.title}</span>
        <span className="card-date">{project.date}</span>
      </span>
    </>
  );

  // Only a card with something to show is a button.
  if (!project.full) return <div className="card">{content}</div>;

  return (
    <button type="button" className="card" onClick={(event) => onOpen(project, event.currentTarget)}>
      {content}
    </button>
  );
}

interface OverlayProps {
  project: Project | null;
  onClose: () => void;
}

function Overlay({ project, onClose }: OverlayProps) {
  // Keep showing the last project while the overlay fades out.
  const [shown, setShown] = useState<Project | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  // While open: Escape closes, and focus moves into the overlay.
  useEffect(() => {
    if (!project) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  const visible = project ?? shown;

  return (
    <div
      className="overlay"
      data-open={project ? 'true' : 'false'}
      aria-hidden={!project}
      // inert: while closed, nothing inside can be focused or clicked.
      inert={!project}
      onClick={onClose}
    >
      {visible?.full && (
        <div
          className="window"
          role="dialog"
          aria-modal="true"
          aria-label={visible.title}
          // A click inside the window must not reach the backdrop and close it.
          onClick={(event) => event.stopPropagation()}
          // Once the closing fade has finished, the window can be removed.
          onAnimationEnd={(event) => {
            if (!project && event.animationName === 'window-out') setShown(null);
          }}
        >
          <button type="button" className="window-bar" ref={closeButton} onClick={onClose} aria-label="Close">
            <img src="/images/browser-toolbar.svg" alt="" />
          </button>
          <div className="window-page">
            <img src={visible.full.src} width={visible.full.width} height={visible.full.height} alt={`${visible.title} design`} />
          </div>
        </div>
      )}
    </div>
  );
}
