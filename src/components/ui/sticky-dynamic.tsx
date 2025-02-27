"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./ui.module.css";

interface StickyDynamicProps {
  children: ReactNode;
  resizeTargetSelector: string;
}
export default function StickyDynamic({
  children,
  resizeTargetSelector,
}: StickyDynamicProps) {
  const originPositionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const originPosition = originPositionRef.current;
    const content = contentRef.current;
    if (!originPosition || !content) return;

    const resizeTarget = document.querySelector(
      resizeTargetSelector
    ) as HTMLElement;
    if (!resizeTarget) return;

    const rePosition = () => {
      const { top } = originPosition.getBoundingClientRect();
      const contentHeight = content.clientHeight;

      if (top + contentHeight < window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    rePosition();

    const resizeObserver = new ResizeObserver(rePosition);

    resizeObserver.observe(resizeTarget);
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeTargetSelector]);

  return (
    <>
      <div ref={originPositionRef}></div>
      <div ref={contentRef} className={isSticky ? style.sticky : ""}>
        {children}
      </div>
    </>
  );
}
