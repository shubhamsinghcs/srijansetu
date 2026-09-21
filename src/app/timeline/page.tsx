import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Timeline from "@/components/sections/Timeline";

export default function TimelinePage() {
  return (
    <main className="min-h-screen text-web-white overflow-x-hidden">
      <Navbar />
      <div className="pt-6 sm:pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-spidey-red/70 bg-spidey-red/10 px-3 py-2 font-accent text-xs sm:text-sm font-bold uppercase tracking-wider text-web-white hover:bg-spidey-red/20 hover:border-spidey-red transition-colors"
          >
            <span aria-hidden="true" className="mr-2">&larr;</span>
            Back to home
          </Link>
        </div>
        <Timeline />
      </div>
    </main>
  );
}