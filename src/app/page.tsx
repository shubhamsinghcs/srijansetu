import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Themes from "@/components/sections/Themes";
import Timeline from "@/components/sections/Timeline";
import Prizes from "@/components/sections/Prizes";
import Judges from "@/components/sections/Judges";
import Mentors from "@/components/sections/Mentors";
import Sponsors from "@/components/sections/Sponsors";
import TechTeam from "@/components/sections/Team";
import EventResources from "@/components/sections/EventResources";

export default function Home() {
  return (
    <main className="min-h-screen text-web-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Themes />
      <Timeline preview />
      <Prizes />
      <Judges />
      <Mentors />
      <Sponsors />
      <TechTeam />
      <EventResources />
    </main>
  );
}
