interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
  hollow?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  tag,
  hollow = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`relative text-center mb-12 sm:mb-16 ${className}`}>
      {/* Danger-Sense Radial Pulse Glow */}
      <div className="danger-sense-glow" aria-hidden="true" />

      {/* Optional Tactical Tag */}
      {tag && (
        <div className="relative z-10 mb-2">
          <span className="font-body text-label font-bold uppercase tracking-[0.22em] text-spidey-red bg-spidey-red/10 border border-spidey-red/30 px-3 py-1 rounded-full">
            {tag}
          </span>
        </div>
      )}

      {/* Main Heading with Hollow Red Text-Stroke & Wide Letter-Spacing */}
      <h2
        className={`relative z-10 text-display-lg leading-tight ${
          hollow ? "hollow-heading-red" : "section-heading"
        }`}
      >
        {title}
      </h2>

      {/* Red Web-Accent Bar with Center Nexus */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-4 mb-3">
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-spidey-red" />
        <div className="w-2 h-2 rotate-45 bg-spidey-red shadow-[0_0_8px_#E32636]" />
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-spidey-red" />
      </div>

      {/* Subtitle with High-Contrast Readability Constraint */}
      {subtitle && (
        <p className="relative z-10 text-white/75 text-body-base sm:text-body-lg max-w-2xl mx-auto px-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
