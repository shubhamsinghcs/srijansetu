interface WebDividerProps {
  className?: string;
}

export default function WebDivider({ className = "" }: WebDividerProps) {
  return (
    <div
      className={`relative w-full max-w-6xl mx-auto px-4 py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background ambient red glow for the divider */}
      <div className="absolute w-48 h-8 bg-spidey-red/20 rounded-full blur-xl pointer-events-none" />

      <svg
        className="w-full h-8 sm:h-10 text-spidey-red"
        viewBox="0 0 1000 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Left main filament */}
        <path
          d="M0 20 L250 20 L290 14 L340 24 L390 17 L440 22 L480 18 L500 20"
          stroke="#E32636"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />

        {/* Right main filament */}
        <path
          d="M500 20 L520 18 L560 23 L610 16 L660 23 L710 15 L750 20 L1000 20"
          stroke="#E32636"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />

        {/* Cracked web branches - Left side */}
        <path
          d="M250 20 L275 8 L310 16"
          stroke="#E32636"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M340 24 L365 34 L395 28"
          stroke="#E32636"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M440 22 L465 10 L485 18"
          stroke="#E32636"
          strokeWidth="0.9"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />

        {/* Cracked web branches - Right side */}
        <path
          d="M560 23 L585 32 L615 24"
          stroke="#E32636"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M660 23 L685 11 L715 17"
          stroke="#E32636"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M750 20 L775 28 L810 20"
          stroke="#E32636"
          strokeWidth="0.9"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />

        {/* Center Spider-Nexus Node */}
        <circle cx="500" cy="20" r="4" fill="#E32636" />
        <circle cx="500" cy="20" r="7" stroke="#E32636" strokeWidth="1" strokeOpacity="0.7" />

        {/* Web node joints */}
        <circle cx="290" cy="14" r="2" fill="#E32636" fillOpacity="0.7" />
        <circle cx="390" cy="17" r="2" fill="#E32636" fillOpacity="0.7" />
        <circle cx="610" cy="16" r="2" fill="#E32636" fillOpacity="0.7" />
        <circle cx="710" cy="15" r="2" fill="#E32636" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
