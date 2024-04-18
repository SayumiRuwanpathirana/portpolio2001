// SlideUp.tsx
// @ts-nocheck
import React, { useEffect, useRef, ReactNode } from "react";

// Use client pragma to mark this component as client-side
useClient();

interface Props {
  offset?: string;
  children?: ReactNode;
}

export default function SlideUp({ children, offset = "0px" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-slideUpCubiBezier");
          }
        });
      },
      { rootMargin: offset }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [offset, ref]);

  return (
    <div ref={ref} className="relative opacity-0">
      {children}
    </div>
  );
}
