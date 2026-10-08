import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import { HiArrowRight, HiLocationMarker } from "react-icons/hi";
export default function DateCard({ dateItem, onNext, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card-elevated max-w-2xl w-full mx-auto"
    >
      {/* Image Carousel */}
      <div className="rounded-[var(--radius-md)] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          loop={dateItem.images.length > 1}
          className="w-full h-72 md:h-96"
        >
          {dateItem.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image.src}
                  alt={dateItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Text Content */}
      <div className="p-6 md:p-8">
        <span className="text-sm uppercase tracking-widest text-primary-500 font-medium">
          {dateItem.date}
        </span>

        <h3 className="font-display text-3xl text-charcoal mt-2">
          {dateItem.title}
        </h3>

        <div className="flex items-center gap-2 text-charcoal/60 mt-2">
          <HiLocationMarker className="text-primary-500" />
          <span>{dateItem.location}</span>
        </div>

        <p className="text-charcoal/80 leading-relaxed mt-4">
          {dateItem.memory}
        </p>

        {!isLast && (
          <button
            onClick={onNext}
            className="btn-primary mt-6 flex items-center gap-2"
          >
            Next Memory
            <HiArrowRight />
          </button>
        )}
      </div>
    </motion.div>
  );
}