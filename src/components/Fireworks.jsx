import { useState, useEffect, useCallback } from "react";
import FireworksBurst from "./FireworksBurst";

export default function Fireworks({ active }) {
  const [bursts, setBursts] = useState([]);

  const removeBurst = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  useEffect(() => {
    if (!active) return;

    const positions = [
      { x: 25, y: 30 },
      { x: 70, y: 25 },
      { x: 50, y: 45 },
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => {
        setBursts((prev) => [
          ...prev,
          { id: Date.now() + i, x: pos.x, y: pos.y },
        ]);
      }, i * 350);
    });
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {bursts.map((burst) => (
        <FireworksBurst
          key={burst.id}
          x={burst.x}
          y={burst.y}
          onComplete={() => removeBurst(burst.id)}
        />
      ))}
    </div>
  );
}