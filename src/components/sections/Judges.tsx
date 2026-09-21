"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { judges } from "@/data";
import type { Judge } from "@/types/event";
import Card from "@/components/ui/Card";

export default function Judges() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (judges.length === 0) {
    return (
      <section
        id="judges"
        className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="section-heading text-display-lg leading-tight">JUDGES</h2>
          <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        </div>
        <p className="text-center text-web-gray font-body">Judge details coming soon.</p>
      </section>
    );
  }

  return (
    <section
      id="judges"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="section-heading text-display-lg leading-tight">JUDGES</h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Meet the experts evaluating originality, execution, scalability, and real-world impact.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {judges.map((judge: Judge) => {
          const imageKey = judge.id || judge.name;
          const socialLinks = Object.entries(judge.socials || {}).filter(
            ([, url]) => Boolean(url)
          ) as [string, string][];

          return (
            <Card
              key={imageKey}
              variant="default"
              className="text-center items-center p-5 sm:p-8 hover:border-spidey-red/70 transition-all duration-300 group shadow-sm hover:shadow-[0_0_25px_rgba(227,38,54,0.25)]"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5 overflow-hidden border-2 border-spidey-red/60 group-hover:border-spidey-red shadow-[0_0_15px_rgba(227,38,54,0.3)] transition-colors bg-[#171822] flex items-center justify-center">
                {judge.image && !imageErrors[imageKey] ? (
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    className="object-cover"
                    onError={() =>
                      setImageErrors((previous) => ({ ...previous, [imageKey]: true }))
                    }
                  />
                ) : (
                  <span className="font-accent text-2xl sm:text-3xl font-bold text-spidey-red">
                    {judge.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </span>
                )}
              </div>

              <h3 className="font-body text-heading-sm sm:text-heading-md font-bold text-web-white group-hover:text-spidey-red transition-colors">
                {judge.name}
              </h3>
              <p className="font-accent text-sm font-semibold text-spidey-red mt-1">
                {judge.designation}
              </p>
              <p className="font-accent text-xs uppercase tracking-widest text-web-gray mt-1">
                {judge.company}
              </p>

              {socialLinks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    {socialLinks.map(([platform, url]) => (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-accent text-xs font-bold uppercase tracking-wider text-web-gray hover:text-spidey-red transition-colors"
                      >
                        {platform}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}