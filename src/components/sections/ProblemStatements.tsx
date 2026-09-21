"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { problemStatements } from "@/data/problemStatements";
import Card from "@/components/ui/Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemStatements() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const domainGridRef = useRef<HTMLDivElement>(null);

  const featuredProblems = problemStatements.filter((item) => item.isFeatured);
  const domainProblems = problemStatements.filter((item) => !item.isFeatured);

  // GSAP ScrollTrigger stagger card entrances (once: true)
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (featuredGridRef.current) {
        gsap.from(featuredGridRef.current.children, {
          scrollTrigger: {
            trigger: featuredGridRef.current,
            start: "top 85%",
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      if (domainGridRef.current) {
        gsap.from(domainGridRef.current.children, {
          scrollTrigger: {
            trigger: domainGridRef.current,
            start: "top 85%",
            once: true,
          },
          y: 25,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem-statements"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="section-heading text-display-lg leading-tight">
          PROBLEM STATEMENTS
        </h2>
        <div className="w-24 h-1 bg-spidey-red mx-auto mt-4 mb-4 rounded-full" />
        <p className="text-white/75 font-body text-body-base sm:text-body-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Tackle real-world challenges curated by industry leaders and visionary mentors to engineer lasting solutions.
        </p>
      </div>

      {/* Two Featured Problem Statement Cards (Staggered Grid) */}
      <div ref={featuredGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
        {featuredProblems.map((problem) => (
          <motion.div
            key={problem.id}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Card variant="featured" className="h-full justify-between">
              <div>
                {/* Badges / Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="pill-badge pill-badge-blue">
                    {problem.domain}
                  </span>
                  <span className="pill-badge pill-badge-red">
                    {problem.sponsorTag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-body text-display-md font-bold text-web-white leading-snug">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="mt-3.5 card-desc max-w-prose">
                  {problem.description}
                </p>
              </div>

              {/* Action Link (Hick's Law: Exactly one clear action per card) */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={problem.briefUrl}
                  className="inline-flex items-center gap-2 font-accent text-caption-xs sm:text-caption-sm font-bold uppercase tracking-wider text-spidey-red hover:text-web-white transition-colors group"
                >
                  <span>VIEW FULL BRIEF</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Domain Cards Header */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
          <h3 className="font-accent text-heading-sm sm:text-heading-md font-bold uppercase tracking-wider text-web-white">
            EXPLORE ALL DOMAINS
          </h3>
          <span className="font-accent text-caption-xs font-bold uppercase tracking-widest text-web-gray">
            {domainProblems.length} Domains Available
          </span>
        </div>

        {/* Responsive Grid of Domain Cards with Framer Motion hover & GSAP Stagger */}
        <div ref={domainGridRef} className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {domainProblems.map((domain) => (
            <motion.div
              key={domain.id}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[400px] flex flex-col"
            >
              <Card variant="domain" className="h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-caption-xs font-bold uppercase tracking-widest text-spidey-red">
                      {domain.domain}
                    </span>
                    <span className="font-accent text-[10px] uppercase font-bold text-web-gray/80 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {domain.id.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-body font-bold text-body-base sm:text-heading-sm text-web-white leading-snug">
                    {domain.title}
                  </h4>
                  <p className="card-desc mt-2 line-clamp-2">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
                  <Link
                    href={domain.briefUrl}
                    className="font-accent text-caption-xs font-bold uppercase tracking-wider text-web-gray hover:text-spidey-red transition-colors inline-flex items-center gap-1"
                  >
                    <span>Learn more</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
