import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Lightbox({ images, activeIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (activeIndex === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center px-4"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-3xl z-10"
          aria-label="Close"
        >
          <HiX />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 text-white text-4xl z-10"
          aria-label="Previous image"
        >
          <HiChevronLeft />
        </button>

        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt=""
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-full max-h-[85vh] rounded-[var(--radius-md)] shadow-deep"
        />

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 text-white text-4xl z-10"
          aria-label="Next image"
        >
          <HiChevronRight />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}