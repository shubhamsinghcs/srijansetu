import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <span className="font-accent text-7xl sm:text-9xl font-black text-spidey-red tracking-wider drop-shadow-[0_4px_30px_rgba(230,36,41,0.6)]">
          404
        </span>
        <div className="absolute inset-0 bg-spidey-red/20 blur-3xl -z-10 rounded-full" />
      </div>

      <h1 className="font-display text-2xl sm:text-4xl text-web-white uppercase tracking-wider mb-4">
        Page Not Found
      </h1>

      <p className="font-body text-white/70 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
        The coordinate you are trying to reach doesn&apos;t exist in this universe. Head back to the main portal.
      </p>

      <Link
        href="/"
        className="pill-badge pill-badge-red px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
      >
        Return to Home
      </Link>
    </div>
  );
}
