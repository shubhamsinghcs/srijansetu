import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Themes from "@/components/sections/Themes";
import ProblemStatements from "@/components/sections/ProblemStatements";
import Timeline from "@/components/sections/Timeline";
import Prizes from "@/components/sections/Prizes";
import Sponsors from "@/components/sections/Sponsors";
import Mentors from "@/components/sections/Mentors";
import Judges from "@/components/sections/Judges";
import TechTeam from "@/components/sections/Team";

export default function Home() {
  return (
    <main className="min-h-screen text-web-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Themes />
      <ProblemStatements />
      <Timeline preview />
      <Prizes />
      <Sponsors />
      <Judges />
      <Mentors />
      <TechTeam />
    </main>
  );
}
