import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { letterLines } from "../data/letter";

export default function LetterPaper({ onTypingComplete }) {
  const fullText = letterLines.join("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scaleY: 0.6 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      style={{ transformOrigin: "top center" }}
      className="paper-texture relative w-[90%] max-w-xl bg-[#fffdf8] rounded-sm shadow-deep px-8 py-10 md:px-12 md:py-14 -rotate-1"
    >
      <TypeAnimation
        sequence={[fullText, 400, () => onTypingComplete()]}
        wrapper="pre"
        speed={50}
        cursor={true}
        repeat={0}
        className="font-handwritten text-xl md:text-2xl text-charcoal/90 whitespace-pre-wrap leading-relaxed block"
      />
    </motion.div>
  );
}