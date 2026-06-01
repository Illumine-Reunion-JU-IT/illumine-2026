import { Event, EventCategory } from '@/types/event';

export const events: Event[] = [
  {
    id: 'evt-1',
    slug: 'inauguration',
    title: 'Inauguration Ceremony',
    category: 'other',
    shortDescription: 'The official start of Illumine 2026 with a grand opening ceremony.',
    description: 'Welcome to Illumine 2026! The inaugural event will commence with lighting the lamp, faculty speeches, and introductory remarks celebrating the Silver Jubilee of the Department of Information Technology at Jadavpur University.',
    image: '/svg/Card.svg',
    rules: [
      'All attendees are requested to be seated by 9:45 a.m.',
      'Maintain decorum during official addresses.',
    ],
    coordinators: [
      { name:'Organising Committee' },
    ],
    featured: true,
    eventDate: 'December 22, 2026 - 10:00 AM',
  },
  {
    id: 'evt-2',
    slug: 'inaugural-speech',
    title: 'Inaugural Speech',
    category: 'academic',
    shortDescription: 'An inspiring address to kick off the Silver Jubilee festivities.',
    description: 'Distinguished alumni, esteemed faculty members, and guests will share their insights on 25 years of IT excellence at Jadavpur University, charting the path forward for upcoming generations.',
    image: '/svg/Card.svg',
    rules: [],
    coordinators: [
      {name:'Organising Committee'},
    ],
    featured: false,
    eventDate: 'December 22, 2026 - 10:30 AM',
  },
  {
    id: 'evt-3',
    slug: 'football-match',
    title: 'Alumni vs Students Football Match',
    category: 'sports',
    shortDescription: 'An adrenaline-fueled clash on the field for the championship.',
    description: 'Watch the legends of the past take on the stars of the present in a high-intensity football showdown at the main campus ground. Prepare for a display of skill, legacy, and department pride.',
    image: '/svg/Card.svg',
    // rules: [
    //   'Standard 9-a-side rules apply.',
    //   'Rolling substitutions are allowed.',
    //   'Match duration: 25 minutes per half.',
    // ],
    coordinators: [
      { name: 'Organising Committee'}
    ],
    registrationLink: 'https://docs.google.com/forms/d/e/football',
    featured: true,
    eventDate: 'December 22, 2026 - 11:30 AM',
  },
  {
    id: 'evt-4',
    slug: 'lunch',
    title: 'Grand Reunion Feast',
    category: 'other',
    shortDescription: 'A well-deserved break with a grand feast for all attendees.',
    description: 'A special lunch buffet curated for all registered alumni, students, and faculty. Reconnect over delicious food and relive memories of your campus days.',
    image: '/svg/Card.svg',
    rules: [
      'Valid food coupon / RSVP registration card required at entry.',
    ],
    coordinators: [
      {  name: 'Organising Committee' },
    ],
    featured: false,
    eventDate: 'December 22, 2026 - 1:00 PM',
  },
  {
    id: 'evt-5',
    slug: 'cricket-match',
    title: 'Reunion T20 Cricket Match',
    category: 'sports',
    shortDescription: 'A thrilling cricket showdown between rival batches.',
    description: 'An exciting 10-over cricket clash between the alumni XI and the student XI. Come support your batch in this classic campus cricket rivalry.',
    image: '/svg/Card.svg',
    // rules: [
    //   '10 overs per innings.',
    //   'Maximum 2 overs per bowler.',
    //   'Standard local tournament rules apply.',
    // ],
    coordinators: [
      { name: 'Sourav Datta', phone: '+91 76543 21098' },
    ],
    // registrationLink: 'https://docs.google.com/forms/d/e/cricket',
    featured: false,
    eventDate: 'December 22, 2026 - 3:00 PM',
  },
  {
    id: 'evt-6',
    slug: 'student-performance',
    title: 'Student Cultural Show',
    category: 'cultural',
    shortDescription: 'Showcasing the incredible talent of our students on stage.',
    description: 'A vibrant showcase of dance, music, drama, and digital arts organized by the current batches of the Jadavpur University IT Department.',
    image: '/svg/Card.svg',
    rules: [
      'Performers must report backstage 30 minutes prior.',
      'Props must be pre-approved.',
    ],
    coordinators: [
      {  name: 'Organising Committee' },
    ],
    featured: false,
    eventDate: 'December 22, 2026 - 5:00 PM',
  },
  {
    id: 'evt-7',
    slug: 'senior-performance',
    title: 'Senior Batch Nostalgia Act',
    category: 'cultural',
    shortDescription: 'A special performance by the senior batches to remember.',
    description: 'Alumni and senior students take the stage for musical medleys, storytelling, and comedic sketches recalling classroom memories, professors, and lab disasters.',
    image: '/svg/Card.svg',
    rules: [],
    coordinators: [
      {  name: 'Organising Committee' },
    ],
    featured: true,
    eventDate: 'December 22, 2026 - 6:30 PM',
  },
  {
    id: 'evt-8',
    slug: 'band-performance',
    title: 'Live Rock Band Performance',
    category: 'cultural',
    shortDescription: 'Live music to electrify the evening atmosphere.',
    description: 'Get ready for an electric performance by a leading fusion rock band, performing hits that will bridge the generation gap and light up the crowd.',
    image: '/svg/Card.svg',
    rules: [],
    coordinators: [
      { name: 'Organising Committee'},
    ],
    featured: true,
    eventDate: 'December 22, 2026 - 7:30 PM',
  },
  {
    id: 'evt-9',
    slug: 'dj-night',
    title: 'Neon Beats DJ Night',
    category: 'cultural',
    shortDescription: 'An electrifying DJ set to dance the night away.',
    description: 'Conclude the celebration on the dance floor under neon lasers as our guest DJ spins the top tracks. Glow sticks will be provided!',
    image: '/svg/Card.svg',
    rules: [
      'Reunion entry band is mandatory.',
      'Follow ground safety instructions.',
    ],
    coordinators: [
      {  name: 'Organising Committee' },
    ],
    featured: true,
    eventDate: 'December 22, 2026 - 9:00 PM',
  },
  {
    id: 'evt-10',
    slug: 'closing-ceremony',
    title: 'Closing Ceremony & Vote of Thanks',
    category: 'other',
    shortDescription: 'The grand finale and vote of thanks for Illumine 2026.',
    description: 'We conclude the 25th anniversary reunion with appreciation notes, token presentations, group photos, and closing remarks detailing the path to the next Illumine.',
    image: '/svg/Card.svg',
    rules: [],
    coordinators: [
      { name: 'Organising Committee' },
    ],
    featured: false,
    eventDate: 'December 22, 2026 - 10:00 PM',
  },
];

export function getEvents(): Event[] {
  return events;
}

export function getFeaturedEvents(): Event[] {
  return events.filter(event => event.featured);
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter(event => event.category === category);
}
