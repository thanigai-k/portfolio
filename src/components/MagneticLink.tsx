import React, { useRef, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  offsetHoverMax?: number;
  offsetHoverMin?: number;
  href: string;
}

const STRENGTH = 0.2;
export const MagneticLink: React.FC<MagneticButtonProps> = ({
  children,
  href,
  offsetHoverMax = 0.7,
  offsetHoverMin = 0.5,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const hoverRef = useRef(false);

  // if mobile dont do anything
  if (typeof window === "undefined") return <a href={href}>{children}</a>;

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const hoverArea = hoverRef.current ? offsetHoverMax : offsetHoverMin;

      const elCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const x = e.clientX - elCenter.x;
      const y = e.clientY - elCenter.y;
      const dist = Math.sqrt(x * x + y * y);

      if (dist < rect.width * hoverArea) {
        hoverRef.current = true;
        el.style.transform = `translate(${x * STRENGTH}px, ${
          y * STRENGTH
        }px) rotate(${x * 0.05}deg)`;
        el.style.transition = "transform 0.1s ease-out";
      } else if (hoverRef.current) {
        hoverRef.current = false;
        el.style.transform = "translate(0, 0) rotate(0)";
        el.style.transition = "transform 0.4s ease";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [offsetHoverMax, offsetHoverMin]);

  return (
    <a
      ref={buttonRef}
      href={href}
      className="inline-block transition-transform will-change-transform "
    >
      {children}
    </a>
  );
};
