export interface TimelineItem {
  day: string;
  time: string;
  title: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    day: "Day 1",
    time: "09:00 AM - 11:00 AM",
    title: "Opening Ceremony & Keynote Address",
    description:
      "Kickoff briefing, problem statement unveilings, and introductory talks from leading industry experts and judges.",
  },
  {
    day: "Day 1",
    time: "11:30 AM",
    title: "Hackathon Begins & Idea Validation",
    description:
      "Teams assemble, select their tracks, and start brainstorming architectures and preliminary wireframes.",
  },
  {
    day: "Day 1",
    time: "06:00 PM - 08:30 PM",
    title: "Round 1 Mentorship & Code Review",
    description:
      "Domain specialists and senior engineers meet with each team to review system blueprints and address roadblocks.",
  },
  {
    day: "Day 2",
    time: "10:00 AM - 12:30 PM",
    title: "Midway Checkpoint & Demo Dry-Runs",
    description:
      "Progress evaluations and live prototype testing with the technical jury to provide feedback prior to final submissions.",
  },
  {
    day: "Day 2",
    time: "04:00 PM - 07:00 PM",
    title: "Final Pitches, Award Ceremony & Closing",
    description:
      "Top teams showcase their working solutions on stage, followed by announcement of winners and prize distribution.",
  },
];

export default timelineData;
