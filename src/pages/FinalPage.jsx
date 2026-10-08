import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GiftBox from "../components/GiftBox";
import { finalWords } from "../data/finalWords";

export default function FinalPage() {
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [wordStep, setWordStep] = useState(0);
  const [blackout, setBlackout] = useState(false);

  const playerRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
  };

  // Show video after the gift opens
  useEffect(() => {
    if (!opened) return;

    const timer = setTimeout(() => setShowVideo(true), 1900);

    return () => clearTimeout(timer);
  }, [opened]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!showVideo) return;

    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    document.body.appendChild(script);

    function createPlayer() {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "pWrkwIXAFDs",
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (
              window.YT &&
              event.data === window.YT.PlayerState.ENDED
            ) {
              setVideoEnded(true);
            }
          },
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVideo]);

  // Start nickname sequence after video ends
  useEffect(() => {
    if (!videoEnded) return;

    const timer = setTimeout(() => setWordStep(1), 800);

    return () => clearTimeout(timer);
  }, [videoEnded]);

  // Show each final word one after another
  useEffect(() => {
    if (wordStep === 0 || wordStep > finalWords.length) return;

    const timer = setTimeout(() => {
      setWordStep((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [wordStep]);

  // Fade completely to black at the end
  useEffect(() => {
    if (wordStep <= finalWords.length) return;

    const timer = setTimeout(() => setBlackout(true), 1500);

    return () => clearTimeout(timer);
  }, [wordStep]);

  return (
    <section
      id="final"
      className="relative min-h-screen w-full bg-charcoal flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {/* GIFT BOX */}
        {!showVideo && (
          <motion.div
            key="box-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="font-display text-2xl md:text-3xl text-cream text-center">
              One More Thing For You
            </p>

            <GiftBox
              isOpening={opened}
              onClick={handleOpen}
            />

            {!opened && (
              <p className="text-cream/60 tracking-widest uppercase text-sm">
                Click to open
              </p>
            )}
          </motion.div>
        )}

        {/* YOUTUBE VIDEO */}
        {showVideo && !videoEnded && (
  <motion.div
    key="video-stage"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="w-[90%] max-w-3xl rounded-[var(--radius-lg)] overflow-hidden shadow-deep bg-black"
  >
    <iframe
      className="w-full aspect-video"
      src="https://www.youtube.com/embed/pWrkwIXAFDs"
      title="Pratyusha Birthday"
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen
    />
  </motion.div>
)}

        {/* FINAL WORDS */}
        {videoEnded && wordStep > 0 && (
          <motion.div
            key="words-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center px-6"
          >
            <AnimatePresence mode="wait">
              {wordStep <= finalWords.length && (
                <motion.p
                  key={`word-${wordStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="font-display text-3xl md:text-5xl text-cream text-center"
                >
                  {finalWords[wordStep - 1]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL BLACKOUT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: blackout ? 1 : 0 }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="fixed inset-0 bg-black pointer-events-none z-[200]"
        style={{
          pointerEvents: blackout ? "auto" : "none",
        }}
      />
    </section>
  );
}