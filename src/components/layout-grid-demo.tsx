import React from "react";
import { LayoutGrid, type Card } from "./ui/layout-grid";

type LayoutGridDemoImage = {
  id: string;
  src: string;
  optimizedSrc?: string;
  alt: string;
  title: string;
  category?: string;
};

export function LayoutGridDemo({
  images,
}: {
  images: LayoutGridDemoImage[];
}) {
  // Show more images (up to 12) with consistent small sizing
  const cards: Card[] = images.slice(0, 12).map((img, idx) => {
    // Occasional 2-column span for visual interest
    const className =
      idx === 0 || idx === 5 || idx === 10
        ? "md:col-span-2"
        : "md:col-span-1";

    return {
      id: idx + 1,
      title: img.title,
      thumbnail: img.optimizedSrc || img.src,
      fallbackSrc: img.src,
      className,
      content: (
        <div className="w-full">
          <p className="font-bold md:text-3xl text-xl text-luxury-text-inverse">
            {img.title}
          </p>
          {img.category && (
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-luxury-text-inverse/60 font-semibold">
              {img.category}
            </p>
          )}
          <p className="mt-8 text-base text-luxury-text-inverse/60 max-w-2xl">
            {img.alt}
          </p>
        </div>
      ),
    };
  });

  return <LayoutGrid cards={cards} />;
}
