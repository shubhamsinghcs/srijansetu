# Srijan Setu 2026 — Data Architecture & Content Guide

Welcome to the data management system for the **Srijan Setu** hackathon website! All event details, sponsors, team members, mentors, judges, partners, timeline schedules, and hackathon themes are managed through standard JSON files located in this directory.

This allows any organizer or editor to update the website without writing code or touching React components.

---

## Directory Overview

```text
/data (at project root)
├── sponsors.json                 # Hackathon sponsors & tiered corporate partners
├── team.json                     # Core organizing & tech team operatives
├── mentors.json                  # Mentors guiding participants
├── judges.json                   # Jury panel evaluating final hackathon pitches
├── community-partners.json       # Student communities & developer groups
├── innovation-partners.json      # Innovation councils & tech incubators
├── media-platform-partners.json  # Hackathon platforms (Devfolio) & media outlets
├── corporate-partners.json       # Enterprise & corporate tier partners
├── timeline.json                 # Day 1 & Day 2 hackathon agenda & milestone schedule
└── themes.json                   # Hackathon challenge tracks / themes
```

---

## 1. How to Add a Sponsor (`sponsors.json`)

Open `sponsors.json` and add an object to the array:

```json
{
  "id": "sponsor-006",
  "name": "New Company Name",
  "logo": "/images/sponsors/company-name.svg",
  "website": "https://company.example.com",
  "tier": "Title Partner",
  "description": "Short description of the company and their hackathon partnership.",
  "featured": true,
  "order": 6
}
```

- **Required fields**: `id`, `name`, `logo`, `tier`, `order`
- **Optional fields**: `website`, `description`, `featured`
- **Image location**: Place logos in `/public/images/sponsors/`. Supported formats: `.webp`, `.png`, `.svg`.

---

## 2. How to Add a Team Member (`team.json`)

Open `team.json` and add an object:

```json
{
  "id": "OP-07",
  "name": "Full Name",
  "role": "Frontend Lead",
  "image": "/images/team/member-name.webp",
  "bio": "A one-sentence punchy quote or bio describing their role.",
  "socials": {
    "linkedin": "https://linkedin.com/in/username",
    "github": "https://github.com/username",
    "x": "https://x.com/username"
  },
  "order": 7
}
```

- **Required fields**: `id`, `name`, `role`, `order`
- **Optional fields**: `image`, `bio`, `socials` (`linkedin`, `github`, `instagram`, `x`, `website`)
- **Note**: Social icons are conditionally rendered only when the URL is provided.
- **Image location**: Place photos in `/public/images/team/`.

---

## 3. How to Add a Mentor (`mentors.json`)

Open `mentors.json` and add an entry:

```json
{
  "id": "mentor-007",
  "name": "Mentor Name",
  "designation": "Staff AI Engineer",
  "company": "Tech Corp",
  "image": "/images/mentors/mentor-name.webp",
  "bio": "Mentoring squads on machine learning deployment and scalable backend models.",
  "socials": {
    "linkedin": "https://linkedin.com/in/mentor-profile"
  },
  "order": 7
}
```

- **Required fields**: `id`, `name`, `designation`, `company`, `order`
- **Optional fields**: `image`, `bio`, `socials` (`linkedin`, `github`, `x`, `website`)
- **Image location**: Place headshots in `/public/images/mentors/`.

---

## 4. How to Add a Judge (`judges.json`)

Open `judges.json` and add an entry:

```json
{
  "id": "judge-004",
  "name": "Judge Name",
  "designation": "VP of Engineering / Venture Partner",
  "company": "Enterprise Capital",
  "image": "/images/judges/judge-name.webp",
  "bio": "Evaluating product architecture, technical depth, and scalability.",
  "socials": {
    "linkedin": "https://linkedin.com/in/judge-profile"
  },
  "order": 4
}
```

- **Required fields**: `id`, `name`, `designation`, `company`, `order`
- **Optional fields**: `image`, `bio`, `socials`
- **Image location**: Place judge photos in `/public/images/judges/`.

---

## 5. How to Add a Partner

Choose the appropriate partner category file:
- **Community Partners**: `community-partners.json`
- **Innovation Partners**: `innovation-partners.json`
- **Media & Platform Partners**: `media-platform-partners.json`
- **Corporate Partners**: `corporate-partners.json`

Entry format:

```json
{
  "id": "community-006",
  "name": "New Developer Club",
  "logo": "/images/partners/new-club.png",
  "website": "https://club.org",
  "description": "Student developer collective promoting hackathon participation.",
  "featured": false,
  "order": 6
}
```

- **Required fields**: `id`, `name`, `logo`, `order`
- **Optional fields**: `website`, `description`, `featured`
- **Image location**: Place partner logos in `/public/images/partners/`.

---

## 6. How to Add a Timeline Event (`timeline.json`)

Open `timeline.json` and add an event:

```json
{
  "id": "timeline-011",
  "day": "Day 2",
  "date": "11 October 2026",
  "time": "11:30 AM",
  "title": "Hackathon Networking & High Tea",
  "description": "Casual networking session connecting builders, recruiters, and investors.",
  "location": "Lounge Area",
  "status": "upcoming",
  "order": 11
}
```

- **Required fields**: `id`, `time`, `title`, `description`, `order`
- **Optional fields**: `day`, `date`, `location`, `status` (`completed`, `active`, `upcoming`)
- **Ordering**: The website automatically sorts timeline events based on the numeric `"order"` field.

---

## 7. How to Add or Change a Theme / Track (`themes.json`)

Open `themes.json` and edit or add a track:

```json
{
  "id": "cyber-security",
  "name": "Cyber Security & Privacy",
  "shortName": "Cyber Security",
  "description": "Zero trust identity, encrypted telemetry, and automated security architectures.",
  "icon": "ShieldCheck",
  "order": 7,
  "active": true
}
```

- **Required fields**: `id`, `name`, `shortName`, `description`, `icon`, `order`, `active`
- **Icons**: Use pure string icon names (e.g., `Sprout`, `HeartPulse`, `ShoppingCart`, `Landmark`, `GraduationCap`, `Sparkles`, `ShieldCheck`).

---

## Crucial Rules for Editing JSON Files

1. **Always use double quotes (`"`)** for keys and string values (do not use single quotes `'`).
2. **Never leave trailing commas** after the last property or after the last array item.
3. **Keep IDs unique** across the same file (e.g., `sponsor-001`, `sponsor-002`).
4. **Ensure `order` numbers are integers** (1, 2, 3...) — this determines display sequence.
5. **No empty placeholders**: If a link or bio is not available, omit the property rather than writing `""` or `"null"`.
