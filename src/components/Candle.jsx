import { motion, AnimatePresence } from "framer-motion";

export default function Candle({ isLit, onBlow }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame + smoke */}
      <div className="relative h-10 flex items-end justify-center">
        <AnimatePresence>
          {isLit ? (
            <motion.button
              key="flame"
              onClick={onBlow}
              exit={{ opacity: 0, scale: 0.3, y: -10 }}
              transition={{ duration: 0.4 }}
              aria-label="Blow out candle"
              className="cursor-pointer"
            >
              <motion.span
                animate={{
                  scaleY: [1, 1.15, 0.95, 1],
                  scaleX: [1, 0.9, 1.05, 1],
                }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="block w-3 h-5 rounded-full bg-gradient-to-t from-secondary-500 via-secondary-300 to-white origin-bottom"
                style={{
                  boxShadow: "0 0 12px 4px rgba(232,184,75,0.6)",
                }}
              />
            </motion.button>
          ) : (
            <motion.span
              key="smoke"
              initial={{ opacity: 0.6, y: 0 }}
              animate={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="block w-2 h-2 rounded-full bg-white/40 blur-sm"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Wick + candle stick */}
      <div className="w-2 h-10 bg-cream rounded-sm shadow-soft" />
    </div>
  );
}