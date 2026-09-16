export interface TimelineItem {
  day: string;
  time: string;
  title: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    day: "Day 1",
    time: "08:00 AM",
    title: "Registration Starts",
    description:
      "Check-in, badge collection, team verification, and workstation setup at the venue.",
  },
  {
    day: "Day 1",
    time: "09:20 AM",
    title: "Opening Ceremony",
    description:
      "Official welcome, keynote addresses, track introductions, and rules briefing.",
  },
  {
    day: "Day 1",
    time: "10:20 AM",
    title: "The Hackathon Begins",
    description:
      "The 24-hour sprint officially kicks off. Teams begin architecting, designing, and coding prototypes.",
  },
  {
    day: "Day 1",
    time: "01:00 PM",
    title: "Lunch Break",
    description:
      "Refuel, recharge, and connect with fellow developers and organizers.",
  },
  {
    day: "Day 1",
    time: "03:30 PM",
    title: "Feedback Session",
    description:
      "Mentors visit team tables to evaluate progress, unblock technical issues, and provide strategic direction.",
  },
  {
    day: "Day 1",
    time: "06:00 PM",
    title: "Progress Report",
    description:
      "Milestone evaluation checking core feature implementation and technical milestones.",
  },
  {
    day: "Day 1",
    time: "09:00 PM - 10:00 PM",
    title: "Dinner",
    description:
      "Dinner break to recharge before heading into the intensive overnight sprint.",
  },
  {
    day: "Day 1",
    time: "10:30 PM",
    title: "Fun Activity",
    description:
      "Engaging games, team trivia, and energizing activities to keep spirits and momentum high.",
  },
  {
    day: "Day 2",
    time: "04:30 AM",
    title: "Mentor Evaluation",
    description:
      "Early morning technical checkpoint and code review to prep teams for final pitch polish.",
  },
  {
    day: "Day 2",
    time: "08:00 AM",
    title: "Top Announcements, Pitching, Prize Distribution & Closing Ceremony",
    description:
      "Announcement of top finalist teams, live stage demonstrations, jury deliberations, prize distributions, and concluding celebrations.",
  },
];

export default timelineData;
