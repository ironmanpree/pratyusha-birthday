import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stars from "../components/Stars";

const lines = [
  "Hi Pratyusha ❤️",
  "This isn't just another birthday website.",
  "This is our story.",
];

export default function Intro() {
  const [step, setStep] = useState(0);
  const [voicePlaying, setVoicePlaying] = useState(false);

  const audioRef = useRef(null);
  const voiceRef = useRef(null);

  const handleBegin = () => {
    // Start background music quietly
    if (audioRef.current) {
      audioRef.current.volume = 0.12;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // Start voice note
    if (voiceRef.current) {
      voiceRef.current.volume = 1;
      voiceRef.current.currentTime = 0;

      voiceRef.current
        .play()
        .then(() => setVoicePlaying(true))
        .catch(() => {});
    }

    setStep(1);
  };

  useEffect(() => {
    if (step === 0 || step > lines.length) return;

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 2800);

    return () => clearTimeout(timer);
  }, [step]);

  const handleVoiceEnded = () => {
    setVoicePlaying(false);

    // Increase background music after voice note finishes
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full bg-charcoal overflow-hidden flex items-center justify-center"
    >
      <Stars count={150} />

      {/* Background Music */}
      <audio
        id="background-music"
        ref={audioRef}
        src="/audio/background-music.mpeg"
        loop
        preload="auto"
      />

      {/* Personal Voice Note */}
      <audio
        ref={voiceRef}
        src="/audio/intro-voice.ogg"
        onEnded={handleVoiceEnded}
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {/* START SCREEN */}
        {step === 0 && (
          <motion.button
            key="begin-overlay"
            onClick={handleBegin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-cream text-lg tracking-widest border border-cream/40 rounded-full px-8 py-3 hover:bg-white/10 transition-colors duration-300"
          >
            Click anywhere to begin
          </motion.button>
        )}

        {/* INTRO TEXT */}
        {step >= 1 && step <= lines.length && (
          <motion.p
            key={`line-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10 text-cream text-3xl md:text-5xl font-display text-center px-6 max-w-3xl"
          >
            {lines[step - 1]}
          </motion.p>
        )}

        {/* BEGIN JOURNEY */}
        {step > lines.length && (
          <motion.button
            key="begin-journey"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 btn-primary text-lg"
          >
            Begin Journey
          </motion.button>
        )}
      </AnimatePresence>

      {/* Voice Note Indicator */}
      <AnimatePresence>
        {voicePlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="glass px-5 py-3 rounded-full flex items-center gap-3 text-cream">
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-lg"
              >
                🎙️
              </motion.span>

              <span className="text-sm tracking-wide">
                A little message for you...
              </span>

              <motion.div
                className="flex gap-1 items-end"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <span className="w-1 h-2 bg-cream rounded-full" />
                <span className="w-1 h-4 bg-cream rounded-full" />
                <span className="w-1 h-3 bg-cream rounded-full" />
                <span className="w-1 h-5 bg-cream rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}