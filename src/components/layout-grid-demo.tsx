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
  const cards: Card[] = images.slice(0, 12).map((img, idx) => {
    return {
      id: idx + 1,
      title: img.title,
      thumbnail: img.optimizedSrc || img.src,
      fallbackSrc: img.src,
      className: "",
      content: (
        <div className="w-full">
          <p className="font-headline font-bold text-(length:--text-h4) md:text-(length:--text-h3) text-luxury-text-inverse leading-(--line-height-tight)">
            {img.title}
          </p>
          {img.category && (
            <p className="mt-8 font-body text-(length:--text-label) uppercase tracking-widest text-luxury-text-inverse/60 font-semibold">
              {img.category}
            </p>
          )}
          <p className="mt-8 font-body text-(length:--text-body) text-luxury-text-inverse/60 max-w-2xl leading-(--line-height-normal)">
            {img.alt}
          </p>
        </div>
      ),
    };
  });

  return <LayoutGrid cards={cards} />;
}
