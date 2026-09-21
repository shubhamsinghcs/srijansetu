"use client";

import Image from "next/image";

/**
 * Full-viewport atmospheric college campus building background layer.
 * Positioned fixed behind the WebNetBackground spider-web layer.
 *
 * Stacking Order (top to bottom):
 * 1. Page Content (z-10)
 * 2. WebNetBackground (fixed z-0)
 * 3. CollegeBackdrop (fixed -z-10)
 * 4. Web-black page base (#0A0A0F)
 *
 * Stylized at 13% opacity with desaturation/grayscale and a deep dark
 * radial/vertical vignette overlay to ensure pristine foreground text contrast.
 */
export default function CollegeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. College Building Image Layer with Grayscale & Calibrated Opacity */}
      <div className="absolute inset-0 w-full h-full opacity-[0.13] filter grayscale contrast-125">
        <Image
          src="/images/backgrounds/college.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Deep Radial Edge Vignette Overlay: Keeps center subtle and edges deep black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.85) 70%, #0A0A0F 100%)",
        }}
      />

      {/* 3. Subtle Vertical Gradient: Deepens the bottom and top transitions */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0F]/80 via-transparent to-[#0A0A0F]/90"
      />
    </div>
  );
}
