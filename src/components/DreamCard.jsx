import { motion } from "framer-motion";
import { HiGlobeAlt, HiHome, HiUserGroup, HiHeart } from "react-icons/hi";

const iconMap = {
  HiGlobeAlt: HiGlobeAlt,
  HiHome: HiHome,
  HiUserGroup: HiUserGroup,
  HiHeart: HiHeart,
};

export default function DreamCard({ dream, index }) {
  const Icon = iconMap[dream.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="card-elevated flex flex-col items-center text-center gap-3"
    >
      <span className="text-3xl text-primary-500">
        <Icon />
      </span>
      <h3 className="font-display text-xl text-charcoal">{dream.title}</h3>
      <p className="text-charcoal/70 text-sm leading-relaxed">
        {dream.description}
      </p>
    </motion.div>
  );
}