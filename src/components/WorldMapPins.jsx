import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { travelDreams } from "../data/futureDreams";

gsap.registerPlugin(ScrollTrigger);

export default function WorldMapPins() {
  const containerRef = useRef(null);

  useEffect(() => {
    const paths = containerRef.current.querySelectorAll(".connector-line");

    paths.forEach((path) => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[2/1] rounded-[var(--radius-xl)] overflow-hidden bg-charcoal"
    >
      {/* Dot-grid texture representing the map */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* SVG layer for connecting lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {travelDreams.map((dream) => (
          <path
            key={dream.id}
            className="connector-line"
            d={`M 50 50 Q ${(50 + parseFloat(dream.left)) / 2} ${
              (50 + parseFloat(dream.top)) / 2 - 10
            }, ${parseFloat(dream.left)} ${parseFloat(dream.top)}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.3"
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5d8f" />
            <stop offset="100%" stopColor="#e8b84b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center "home" point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="block w-3 h-3 rounded-full bg-white shadow-glow" />
      </div>

      {/* Pins */}
      {travelDreams.map((dream, index) => (
        <motion.div
          key={dream.id}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
          style={{ top: dream.top, left: dream.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-3 h-3 rounded-full bg-primary-500 shadow-glow"
          />
          <span className="text-xs text-cream/90 whitespace-nowrap">
            {dream.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}