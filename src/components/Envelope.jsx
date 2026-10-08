import { motion } from "framer-motion";

export default function Envelope({ isOpening, onClick }) {
  return (
    <motion.div
      onClick={!isOpening ? onClick : undefined}
      animate={{
        scale: isOpening ? 1.05 : 1,
        opacity: isOpening ? 0 : 1,
      }}
      transition={{ duration: 1, delay: isOpening ? 0.6 : 0, ease: "easeInOut" }}
      className={`relative w-72 h-48 md:w-96 md:h-64 ${!isOpening ? "cursor-pointer" : ""}`}
      style={{ perspective: "1000px" }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6ec] to-[#f3e6d3] rounded-md shadow-deep border border-black/5" />

      {/* Envelope flap — this is the part that flips open */}
      <motion.div
        animate={{ rotateX: isOpening ? 180 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
        className="absolute top-0 left-0 right-0 h-1/2 z-20"
      >
        <div
          className="w-full h-full bg-gradient-to-b from-[#f3e6d3] to-[#e0cba8]"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />
      </motion.div>

      {/* Wax seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-600 shadow-soft flex items-center justify-center z-30">
        <span className="text-white text-xl">❤</span>
      </div>
    </motion.div>
  );
}