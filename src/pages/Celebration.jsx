import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Candle from "../components/Candle";
import Confetti from "../components/Confetti";
import Fireworks from "../components/Fireworks";

const CANDLE_COUNT = 5;
const birthdayText = "Happy Birthday Pratyusha!";

const letterVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

export default function Celebration() {
  const [litCandles, setLitCandles] = useState(
    Array(CANDLE_COUNT).fill(true)
  );
  const [celebrate, setCelebrate] = useState(false);

  const allBlown = litCandles.every((lit) => !lit);

  const handleBlow = (index) => {
    setLitCandles((prev) =>
      prev.map((lit, i) => (i === index ? false : lit))
    );
  };

  useEffect(() => {
    if (!allBlown) return;
    const timer = setTimeout(() => setCelebrate(true), 600);
    return () => clearTimeout(timer);
  }, [allBlown]);

  return (
    <section
      id="celebration"
      className="relative min-h-screen w-full bg-gradient-night flex flex-col items-center justify-center gap-16 px-6 py-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <span className="uppercase tracking-[0.3em] text-sm text-secondary-300 font-medium">
          Make a Wish
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-cream mt-4">
          Blow Out the Candles
        </h2>
      </motion.div>

      {/* Candles row */}
      <div className="flex gap-6">
        {litCandles.map((isLit, index) => (
          <Candle key={index} isLit={isLit} onBlow={() => handleBlow(index)} />
        ))}
      </div>

      {/* The cake */}
      <div className="flex flex-col items-center">
        <div className="w-56 h-14 rounded-t-[40%] bg-primary-300 shadow-deep" />
        <div className="w-64 h-16 bg-primary-500 shadow-deep" />
        <div className="w-72 h-16 bg-primary-600 rounded-b-lg shadow-deep" />
      </div>

      {!allBlown && (
        <p className="text-cream/60 text-sm tracking-wide">
          Click each flame to blow it out
        </p>
      )}

      {celebrate && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.04 }}
          className="flex flex-wrap justify-center max-w-3xl"
        >
          {birthdayText.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-display text-4xl md:text-6xl text-secondary-300 inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      )}

      <Confetti active={celebrate} />
      <Fireworks active={celebrate} />
    </section>
  );
}