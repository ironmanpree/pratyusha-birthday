import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

export default function TimelineEvent({ event, align }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative flex ${
        align === "left" ? "md:justify-end" : "md:justify-start"
      } justify-start`}
    >
      {/* The dot on the central line */}
      <span className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary-500 border-4 border-cream z-10" />

      <div className="w-full md:w-[45%] pl-12 md:pl-0">
        <div
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
          className="card-elevated cursor-pointer select-none"
        >
          <span className="text-sm uppercase tracking-widest text-primary-500 font-medium">
            {event.date}
          </span>

          <div className="flex items-center justify-between mt-2">
            <h3 className="font-display text-2xl text-charcoal">
              {event.title}
            </h3>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-primary-500 text-xl"
            >
              <HiChevronDown />
            </motion.span>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-charcoal/70 mt-4 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}