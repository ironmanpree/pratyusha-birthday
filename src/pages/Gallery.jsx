import { useState } from "react";
import { motion } from "framer-motion";
import { galleryCategories } from "../data/gallery";
import MasonryGrid from "../components/MasonryGrid";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0].id);
  const [activeIndex, setActiveIndex] = useState(null);

  const currentImages =
    galleryCategories.find((cat) => cat.id === activeCategory)?.images || [];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full bg-cream py-24 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="uppercase tracking-[0.3em] text-sm text-primary-600 font-medium">
            Our Memories
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-charcoal mt-4">
            The Gallery
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={
                activeCategory === cat.id
                  ? "btn-primary text-sm"
                  : "btn-secondary text-sm"
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full">
          <MasonryGrid
            key={activeCategory}
            images={currentImages}
            onImageClick={(index) => setActiveIndex(index)}
          />
        </div>
      </div>

      <Lightbox
        images={currentImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}