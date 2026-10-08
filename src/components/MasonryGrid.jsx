import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MasonryGrid({ images, onImageClick }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="columns-2 md:columns-3 gap-4 [column-fill:_balance]"
    >
      {images.map((src, index) => (
        <motion.div
          key={src}
          variants={itemVariants}
          onClick={() => onImageClick(index)}
          whileHover={{ scale: 1.02 }}
          className="mb-4 break-inside-avoid rounded-[var(--radius-md)] overflow-hidden shadow-soft cursor-pointer"
        >
          <img src={src} alt="" className="w-full h-auto block" />
        </motion.div>
      ))}
    </motion.div>
  );
}