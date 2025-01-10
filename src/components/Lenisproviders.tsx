"use client";

import { ReactNode, useEffect } from "react";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProviders({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    } as LenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}