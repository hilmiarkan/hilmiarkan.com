// Plays a Rive animation on top of a work's cover image.
// The still image underneath is already visible, so nothing jumps: this
// component only fades the animation in once it is ready to play.
import { useEffect, useState } from 'react';
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas-lite';
// The Rive engine is a WebAssembly file. "?url" asks the build to ship it with
// the site and give us its address, instead of fetching it from a public CDN.
import riveEngine from '@rive-app/canvas-lite/rive.wasm?url';
import './RiveCover.css';

RuntimeLoader.setWasmUrl(riveEngine);

export interface RiveCoverProps {
  file: string;
  artboard: string;
  stateMachine?: string;
  animation?: string;
}

export default function RiveCover(props: RiveCoverProps) {
  // State: may the animation start? Decided in the browser, after mount.
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // People who ask their system for less motion keep the still image, and
    // the animation file is never downloaded.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Wait until the browser has nothing more urgent to do, so loading the
    // animation never slows down the text and images of the page.
    const start = () => setAllowed(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return allowed ? <Player {...props} /> : null;
}

function Player({ file, artboard, stateMachine, animation }: RiveCoverProps) {
  const [ready, setReady] = useState(false);

  // useRive is a hook from the Rive library: it loads the file and returns a
  // canvas component that draws it.
  const { RiveComponent } = useRive({
    src: file,
    artboard,
    stateMachine,
    animations: animation,
    autoplay: true,
    // Fill the whole cover, cropping the edges if the shapes differ.
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    onLoad: () => setReady(true),
  });

  return (
    <div className="rive-cover" data-ready={ready}>
      <RiveComponent aria-hidden="true" />
    </div>
  );
}
