import React, { useState } from "react";

export default function Carousel({ images = [], className = "" }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden rounded-lg border shadow bg-gray-50 dark:bg-gray-900">
        <img
          src={images[current].src}
          alt={images[current].alt || `Image ${current + 1}`}
          className="w-full h-80 object-cover transition-all duration-300"
        />
        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:bg-white dark:hover:bg-gray-700"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:bg-white dark:hover:bg-gray-700"
              aria-label="Next"
            >
              &#8594;
            </button>
          </>
        )}
        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-3 h-3 rounded-full border-2 ${idx === current ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 