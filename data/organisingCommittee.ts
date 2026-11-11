export type CommitteeGroup =
  "Leadership" | "Faculty Coordinators" | "Position of Responsibility";

export interface CommitteeMember {
  name: string;
  role: string;
  batch?: string;
  image: string;
  group: CommitteeGroup;
}

const portrait = (number: number) => `/photos/committee-clean/${number}.jpg`;

export const committeeMembers: CommitteeMember[] = [
  {
    name: "Prof. Bhaskar Sardar",
    role: "President",
    image: portrait(25),
    group: "Leadership",
  },
  {
    name: "To be decided",
    role: "Vice President",
    image: "",
    group: "Leadership",
  },
  {
    name: "Prof. Parama Bhowmik",
    role: "Faculty Coordinator",
    image: portrait(22),
    group: "Faculty Coordinators",
  },
  {
    name: "Mr. Utpal Kumar Ray",
    role: "Faculty Coordinator",
    image: portrait(23),
    group: "Faculty Coordinators",
  },
  {
    name: "Dr. Munmun Bhattacharya",
    role: "Faculty Coordinator",
    image: portrait(21),
    group: "Faculty Coordinators",
  },
  {
    name: "Aritra Mondal",
    role: "General Secretary",
    batch: "UG4",
    image: portrait(1),
    group: "Position of Responsibility",
  },
  {
    name: "Kaustav Mondal",
    role: "Additional General Secretary",
    batch: "UG4",
    image: portrait(19),
    group: "Position of Responsibility",
  },
  {
    name: "Krish Agarwal",
    role: "Additional General Secretary",
    batch: "UG3",
    image: portrait(20),
    group: "Position of Responsibility",
  },
  {
    name: "Prama Ray",
    role: "Joint Secretary",
    batch: "UG4",
    image: portrait(16),
    group: "Position of Responsibility",
  },
  {
    name: "Ayan Ghosh",
    role: "Joint Secretary",
    batch: "UG4",
    image: portrait(15),
    group: "Position of Responsibility",
  },
  {
    name: "Soumyadeep Roy Chowdhury",
    role: "Joint Secretary",
    batch: "UG3",
    image: portrait(18),
    group: "Position of Responsibility",
  },
  {
    name: "Sauhardya Hazra",
    role: "Joint Secretary",
    batch: "UG3",
    image: portrait(17),
    group: "Position of Responsibility",
  },
  {
    name: "Anuska Nath",
    role: "Treasurer",
    batch: "UG4",
    image: portrait(13),
    group: "Position of Responsibility",
  },
  {
    name: "Ansh Kumar Singh",
    role: "Treasurer",
    batch: "UG4",
    image: portrait(12),
    group: "Position of Responsibility",
  },
  {
    name: "Tanishq Majumder",
    role: "Treasurer",
    batch: "UG3",
    image: portrait(14),
    group: "Position of Responsibility",
  },
  {
    name: "Trisanjit Das",
    role: "On Day Coordinator",
    batch: "UG4",
    image: portrait(9),
    group: "Position of Responsibility",
  },
  {
    name: "Sanglap Das",
    role: "On Day Coordinator",
    batch: "UG3",
    image: portrait(10),
    group: "Position of Responsibility",
  },
  {
    name: "Ankit Roy",
    role: "Logistics Coordinator",
    batch: "UG3",
    image: portrait(3),
    group: "Position of Responsibility",
  },
  {
    name: "Rajdeep Das",
    role: "Tech Lead",
    batch: "UG3",
    image: portrait(8),
    group: "Position of Responsibility",
  },
  {
    name: "Ayush Bhakta",
    role: "Design Lead",
    batch: "UG3",
    image: portrait(6),
    group: "Position of Responsibility",
  },
  {
    name: "Gunnumpudi Sree Keertan Dora",
    role: "Design Coordinator",
    batch: "UG3",
    image: portrait(7),
    group: "Position of Responsibility",
  },
  {
    name: "Mayukh Sinha",
    role: "Logistics Lead",
    batch: "UG4",
    image: portrait(2),
    group: "Position of Responsibility",
  },
  {
    name: "Md. Mirajul Seikh",
    role: "Logistics Coordinator",
    batch: "UG2",
    image: portrait(5),
    group: "Position of Responsibility",
  },
  {
    name: "Shlok Sinha",
    role: "On Day Coordinator",
    batch: "UG2",
    image: portrait(11),
    group: "Position of Responsibility",
  },
  {
    name: "Bitan Saha",
    role: "Logistics Coordinator",
    batch: "UG2",
    image: portrait(4),
    group: "Position of Responsibility",
  },
];

export const leadershipMembers = committeeMembers.filter(
  (member) => member.group !== "Position of Responsibility",
);
export const responsibilityMembers = committeeMembers.filter(
  (member) => member.group === "Position of Responsibility",
);
