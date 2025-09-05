import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target); // only reveal once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        // NOTE: might need to fix it... come up with a better way to ensure it fill up the container
        "w-full h-full",
        `transition-all duration-700 ease-out`,
        className
        // visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}
