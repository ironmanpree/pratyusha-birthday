import { motion } from "framer-motion";
import { lifeDreams } from "../data/futureDreams";
import WorldMapPins from "../components/WorldMapPins";
import DreamCard from "../components/DreamCard";

export default function OurFuture() {
  return (
    <section
      id="future"
      className="relative min-h-screen w-full bg-gradient-sunset py-24 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="uppercase tracking-[0.3em] text-sm text-cream/80 font-medium">
            Our Future
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-cream mt-4">
            Everywhere, Together
          </h2>
        </motion.div>

        <div className="w-full">
          <WorldMapPins />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {lifeDreams.map((dream, index) => (
            <DreamCard key={dream.id} dream={dream} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}