import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["#ff5d8f", "#e8b84b", "#f6d78c", "#ffa8bf", "#6b2d5c"];

function generatePieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: Math.random() * 360,
    duration: 2.5 + Math.random() * 1.5,
    delay: Math.random() * 0.5,
    drift: Math.random() * 80 - 40,
  }));
}

export default function Confetti({ active }) {
  const pieces = useMemo(() => generatePieces(70), [active]);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ top: "-5%", left: `${p.left}%`, opacity: 1, rotate: 0 }}
              animate={{
                top: "110%",
                left: `${p.left + p.drift / 10}%`,
                rotate: p.rotate,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeIn",
              }}
              className="absolute w-2 h-3 rounded-sm"
              style={{ backgroundColor: p.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}