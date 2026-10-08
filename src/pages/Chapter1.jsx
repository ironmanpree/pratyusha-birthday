import { motion } from "framer-motion";
import { nicknames } from "../data/nicknames";
import NicknameCard from "../components/NicknameCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Chapter1() {
  return (
    <section
      id="memories"
      className="relative min-h-screen w-full bg-gradient-romantic py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="uppercase tracking-[0.3em] text-sm text-primary-600 font-medium">
            Chapter One
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-charcoal mt-4">
            Meet Pratyusha
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-64 h-80 md:w-80 md:h-96 rounded-[var(--radius-xl)] overflow-hidden shadow-deep border-4 border-white"
        >
          <img
            src="/images/pratyusha-portrait.jpeg"
            alt="Pratyusha"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
        >
          {nicknames.map((nickname) => (
            <NicknameCard key={nickname.id} text={nickname.text} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}