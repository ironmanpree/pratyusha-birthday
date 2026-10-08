import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dates } from "../data/dates";
import DateCard from "../components/DateCard";

export default function Chapter3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCoorgIntro, setShowCoorgIntro] = useState(false);
  const [showCoorgDay2, setShowCoorgDay2] = useState(false);
  const [showLonavalaIntro, setShowLonavalaIntro] = useState(false);

  const handleNext = () => {
    // After Girlfriend's Day → introduce Coorg
    if (currentIndex === 9) {
      setShowCoorgIntro(true);
      return;
    }

    // After Coorg Day 1 → show Day 2 transition
    if (currentIndex === 10) {
      setShowCoorgDay2(true);
      return;
    }

    // After Coorg Day 2 → introduce Lonavala
    if (currentIndex === 11) {
      setShowLonavalaIntro(true);
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, dates.length - 1));
  };

  const enterCoorg = () => {
    setShowCoorgIntro(false);
    setCurrentIndex(10);
  };

  const enterCoorgDay2 = () => {
    setShowCoorgDay2(false);
    setCurrentIndex(11);
  };

  const enterLonavala = () => {
    setShowLonavalaIntro(false);
    setCurrentIndex(12);
  };

  return (
    <section
      id="dates"
      className="relative min-h-screen w-full bg-gradient-romantic py-24 px-6 overflow-hidden flex flex-col items-center gap-16"
    >
      {/* Section Heading */}
      <div className="text-center">
        <span className="uppercase tracking-[0.3em] text-sm text-primary-600 font-medium">
          Chapter Three
        </span>

        <h2 className="font-display text-4xl md:text-6xl text-charcoal mt-4">
          Our Dates
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {/* ================================
            COORG INTRO
        ================================= */}
        {showCoorgIntro ? (
          <motion.div
            key="coorg-intro"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-2xl min-h-[480px] flex flex-col items-center justify-center text-center rounded-[var(--radius-lg)] bg-charcoal px-8 py-16 shadow-deep relative overflow-hidden"
          >
            {/* Ambient glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-72 h-72 rounded-full bg-primary-500/20 blur-3xl"
            />

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="uppercase tracking-[0.35em] text-xs md:text-sm text-secondary-300"
              >
                A New Chapter
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-display text-5xl md:text-7xl text-cream mt-5"
              >
                Our First Adventure
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-primary-300 text-2xl md:text-3xl mt-5 font-display"
              >
                Coorg 🌿
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-cream/70 mt-6 max-w-md mx-auto leading-relaxed"
              >
                2 August 2026
                <br />
                <span className="text-cream mt-2 inline-block">
                  our first trip together babeh ❤️
                </span>
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                onClick={enterCoorg}
                className="btn-primary mt-10"
              >
                Enter Our First Trip →
              </motion.button>
            </div>
          </motion.div>
        ) : showCoorgDay2 ? (
          /* ================================
             COORG DAY 2 TRANSITION
          ================================= */
          <motion.div
            key="coorg-day2"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-2xl min-h-[420px] flex flex-col items-center justify-center text-center rounded-[var(--radius-lg)] bg-charcoal px-8 py-16 shadow-deep relative overflow-hidden"
          >
            {/* Ambient gradient */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-secondary-500/10"
            />

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="uppercase tracking-[0.35em] text-xs md:text-sm text-secondary-300"
              >
                The Next Day 🌿
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-display text-4xl md:text-6xl text-cream mt-5"
              >
                And Then Came Day Two
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-cream/75 mt-6 max-w-lg mx-auto leading-relaxed text-lg"
              >
                "Every small thing we do is a memory baby."
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-primary-300 mt-4 font-display text-2xl"
              >
                3 August 2026
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                onClick={enterCoorgDay2}
                className="btn-primary mt-10"
              >
                Continue the Adventure →
              </motion.button>
            </div>
          </motion.div>
        ) : showLonavalaIntro ? (
          /* ================================
             LONAVALA INTRO
          ================================= */
          <motion.div
            key="lonavala-intro"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-2xl min-h-[460px] flex flex-col items-center justify-center text-center rounded-[var(--radius-lg)] bg-charcoal px-8 py-16 shadow-deep relative overflow-hidden"
          >
            {/* Ambient glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-72 h-72 rounded-full bg-primary-500/20 blur-3xl"
            />

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="uppercase tracking-[0.35em] text-xs md:text-sm text-secondary-300"
              >
                Another Adventure
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-display text-5xl md:text-7xl text-cream mt-5"
              >
                Lonavala
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-primary-300 text-2xl md:text-3xl mt-5 font-display"
              >
                25 September 2026 🌿
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-cream/75 mt-6 max-w-md mx-auto leading-relaxed"
              >
                second trip like in just 8months babe muah ❤️
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                onClick={enterLonavala}
                className="btn-primary mt-10"
              >
                Enter Our Second Trip →
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* ================================
             NORMAL DATE CARD
          ================================= */
          <DateCard
            key={dates[currentIndex].id}
            dateItem={dates[currentIndex]}
            onNext={handleNext}
            isLast={currentIndex === dates.length - 1}
          />
        )}
      </AnimatePresence>
    </section>
  );
}