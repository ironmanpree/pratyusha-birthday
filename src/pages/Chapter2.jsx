import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents } from "../data/timeline";
import TimelineEvent from "../components/TimelineEvent";

export default function Chapter2() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full bg-cream py-24 px-6 overflow-hidden"
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
            Chapter Two
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-charcoal mt-4">
            Our Journey
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative w-full">
          {/* Background track line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-primary-100" />

          {/* Animated progress line, grows as you scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-primary-500 to-secondary-500"
          />

          <div className="flex flex-col gap-12 relative">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                align={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}