import { prizes, totalPrizePool, PrizeItem } from "@/data/prizes";
import Card from "@/components/ui/Card";

export default function Prizes() {
  const winner = prizes.find((p) => p.place === "Winner");
  const firstRunnerUp = prizes.find((p) => p.place === "1st Runner Up");
  const secondRunnerUp = prizes.find((p) => p.place === "2nd Runner Up");

  const renderPrizeCard = (
    prize: PrizeItem | undefined,
    isWinner: boolean = false,
    trophyColor: string = "text-yellow-400"
  ) => {
    if (!prize) return null;

    return (
      <Card
        variant={isWinner ? "featured" : "default"}
        className={`text-center transition-transform duration-300 ${
          isWinner
            ? "border-spidey-red shadow-[0_0_35px_rgba(227,38,54,0.45)] lg:-translate-y-4 py-8 px-5 sm:px-8 z-10"
            : "border-white/10 hover:border-spidey-red/60 py-6 px-5 sm:px-7"
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Trophy Icon */}
          <div
            className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 ${
              isWinner
                ? "bg-spidey-red/20 border-2 border-spidey-red shadow-[0_0_20px_rgba(227,38,54,0.6)]"
                : "bg-white/5 border border-white/15"
            }`}
          >
            <svg
              className={`w-7 h-7 sm:w-10 sm:h-10 ${trophyColor}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
          </div>

          {/* Place Tag */}
          <span
            className={`mb-3 ${
              isWinner
                ? "pill-badge pill-badge-red"
                : "pill-badge pill-badge-neutral"
            }`}
          >
            {prize.place}
          </span>

          {/* Label */}
          <h3 className="font-body text-base sm:text-lg font-bold text-web-white">
            {prize.label}
          </h3>

          {/* Amount */}
          <div
            className={`font-accent font-black tracking-wider my-3 sm:my-4 ${
              isWinner
                ? "text-2xl sm:text-3xl md:text-4xl text-spidey-red drop-shadow-[0_2px_15px_rgba(227,38,54,0.5)]"
                : "text-xl sm:text-2xl md:text-3xl text-web-white"
            }`}
          >
            {prize.amount}
          </div>

          {/* Subtle note */}
          <p className="font-body text-xs text-web-gray mt-1 sm:mt-2 uppercase tracking-wider font-normal">
            Cash Prize + Goodies & Perks
          </p>
        </div>
      </Card>
    );
  };

  return (
    <section
      id="prizes"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="section-heading text-display-lg leading-tight">
          PRIZES
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Reap the rewards of innovation with substantial cash bounties, trophies, and partner perks.
        </p>
      </div>

      {/* Large Headline Number: Total Prize Pool */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="font-accent text-label font-bold uppercase tracking-[0.22em] text-white/70">
          TOTAL PRIZE POOL
        </span>
        <div className="font-accent font-black text-3xl sm:text-5xl md:text-6xl text-spidey-red tracking-wider drop-shadow-[0_4px_30px_rgba(230,36,41,0.7)] mt-2">
          {totalPrizePool}
        </div>
      </div>

      {/* Three Prize Cards (Podium Layout: Winner Centered & Largest) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center max-w-5xl mx-auto">
        {/* 1st Runner Up (Left on Desktop, 2nd on Mobile) */}
        <div className="order-2 lg:order-1">
          {renderPrizeCard(firstRunnerUp, false, "text-gray-300")}
        </div>

        {/* Winner (Centered, Largest & Featured, 1st on Mobile) */}
        <div className="order-1 lg:order-2">
          {renderPrizeCard(winner, true, "text-yellow-400")}
        </div>

        {/* 2nd Runner Up (Right on Desktop, 3rd on Mobile) */}
        <div className="order-3 lg:order-3">
          {renderPrizeCard(secondRunnerUp, false, "text-amber-600")}
        </div>
      </div>
    </section>
  );
}
