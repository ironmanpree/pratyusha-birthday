import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function NicknameCard({ text }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.06, rotate: -1 }}
      whileTap={{ scale: 0.97 }}
      className="card-glass bg-white/70 flex items-center justify-center text-center px-6 py-8 cursor-default"
    >
      <p className="font-display text-xl md:text-2xl text-primary-700">
        {text}
      </p>
    </motion.div>
  );
}