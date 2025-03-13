"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./ui.module.css";

interface StickyDynamicProps {
  children: ReactNode;
  reRender?: boolean;
}
export default function StickyDynamic({
  children,
  reRender = true,
}: StickyDynamicProps) {
  const originPositionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const originPosition = originPositionRef.current;
    const content = contentRef.current;

    if (!originPosition || !content) return;

    const rePosition = () => {
      const { top: originTop } = originPosition.getBoundingClientRect();
      const { height: contentHeight } = content.getBoundingClientRect();

      if (originTop < window.innerHeight - contentHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    rePosition();
  }, [reRender]);

  return (
    <>
      <div ref={originPositionRef}></div>
      <div ref={contentRef} className={isSticky ? style.sticky : ""}>
        {children}
      </div>
    </>
  );
}
