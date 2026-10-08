import { useEffect, useRef } from "react";
import gsap from "gsap";

const colors = ["#ff5d8f", "#e8b84b", "#f6d78c", "#ffa8bf"];
const PARTICLE_COUNT = 24;

export default function FireworksBurst({ x, y, onComplete }) {
  const particlesRef = useRef([]);

  useEffect(() => {
    particlesRef.current.forEach((particle, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const distance = 60 + Math.random() * 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      gsap.set(particle, { x: 0, y: 0, opacity: 1, scale: 1 });

      gsap.to(particle, {
        x: dx,
        y: dy,
        opacity: 0,
        scale: 0.3,
        duration: 1.1,
        ease: "power2.out",
      });
    });

    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute" style={{ top: `${y}%`, left: `${x}%` }}>
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}