import { motion } from "framer-motion";

export default function GiftBox({ isOpening, onClick }) {
  return (
    <motion.div
      onClick={!isOpening ? onClick : undefined}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.8, delay: isOpening ? 1.1 : 0, ease: "easeInOut" }}
      className={`relative w-56 h-44 md:w-64 md:h-52 ${!isOpening ? "cursor-pointer" : ""}`}
      style={{ perspective: "1200px" }}
    >
      {/* Box base */}
      <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-b from-primary-500 to-primary-600 rounded-md shadow-deep" />

      {/* Box lid — flips open like the envelope flap */}
      <motion.div
        animate={{ rotateX: isOpening ? -110 : 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
        className="absolute top-6 w-full h-1/3 z-20"
      >
        <div className="w-full h-full bg-gradient-to-b from-primary-300 to-primary-500 rounded-md shadow-soft" />
      </motion.div>

      {/* Ribbon — vertical + horizontal straps */}
      <motion.div
        animate={{ x: isOpening ? -80 : 0, opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-secondary-500 z-30"
      />
      <motion.div
        animate={{ y: isOpening ? -50 : 0, opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4 bg-secondary-500 z-30"
      />

      {/* Bow on top */}
      <motion.div
        animate={{
          scale: isOpening ? 0 : 1,
          rotate: isOpening ? 45 : 0,
          opacity: isOpening ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 flex items-center"
      >
        <div className="w-6 h-6 rounded-full bg-secondary-500 -mr-1 shadow-soft" />
        <div className="w-4 h-4 rounded-full bg-secondary-700" />
        <div className="w-6 h-6 rounded-full bg-secondary-500 -ml-1 shadow-soft" />
      </motion.div>
    </motion.div>
  );
}