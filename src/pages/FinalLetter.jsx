import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";
import LetterPaper from "../components/LetterPaper";

export default function FinalLetter() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => setShowLetter(true), 1600);
    return () => clearTimeout(timer);
  }, [opened]);

  const scrollToNext = () => {
    const next = document.getElementById("future");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen w-full bg-charcoal flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <audio ref={audioRef} src="/audio/piano.mp3" loop />

      <AnimatePresence mode="wait">
        {!showLetter && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="font-display text-2xl md:text-3xl text-cream text-center">
              For Pratyusha ❤️
            </p>

            <Envelope isOpening={opened} onClick={handleOpen} />

            {!opened && (
              <p className="text-cream/60 tracking-widest uppercase text-sm">
                Open when you're ready
              </p>
            )}
          </motion.div>
        )}

        {showLetter && (
          <motion.div
            key="letter-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-12 w-full"
          >
            <LetterPaper onTypingComplete={() => setShowButton(true)} />

            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                onClick={scrollToNext}
                className="btn-primary"
              >
                Continue Our Journey ❤️
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}