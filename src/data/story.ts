export const storyTimeline = [
  {
    title: "First Spark",
    description:
      "Started building small hobby electronics and robotics projects at home — soldering circuits, wiring motors, and learning how things move.",
    interaction: "Childhood · where it began",
    scene: "spark",
  },
  {
    year: "2016",
    title: "First Competition Win",
    description:
      "Won first prize in a robotics competition at Rani Public School during the youth festival, and completed a formal ROBOTICS academic quality enhancement programme.",
    interaction: "First prize · youth festival",
    scene: "competition",
  },
  {
    year: "2018",
    title: "Mars Rover · Team RUDRA",
    description:
      "Joined SRM University for BTech in Mechatronics & Robotics and the software team of the SRM Mars Rover Team RUDRA, building a fully autonomous rover.",
    interaction: "Autonomy under the open sky",
    scene: "rover",
  },
  {
    year: "2019",
    title: "University Rover Challenge",
    description:
      "Secured 11th position at the University Rover Challenge in Utah, USA — competing among the best autonomous rover teams in the world.",
    interaction: "Top-15 in the world",
    scene: "challenge",
  },
  {
    year: "2021",
    title: "Learning to See",
    description:
      "Built computer-vision research projects — birds-eye-view occupancy mapping on KITTI, overhead-camera robot localization, and vision-based inspection.",
    interaction: "Teaching machines to perceive",
    scene: "vision",
  },
  {
    year: "2022",
    title: "From Lab to Production",
    description:
      "Designed a marker-free connected AGV as a capstone, then joined Novus Hi-Tech as a Graduate Engineer Trainee — earning a Star Trainee Certificate of Excellence.",
    interaction: "Into industry",
    scene: "agv",
  },
  {
    year: "2023",
    title: "Production ADAS",
    description:
      "As a Research Engineer, took NHR03 from design to production, filed 2 patents as first inventor, and represented Novus at INCABIN Europe and Bharat Mobility — while pursuing an MTech in AI & ML at BITS Pilani.",
    interaction: "Shipping safety at scale",
    scene: "adas",
  },
  {
    year: "Today",
    title: "Senior Research Engineer",
    description:
      "Building Novus Copilot — affordable retrofit ADAS that fuses real-time perception, telematics, and multi-camera vision to protect lives on the road.",
    interaction: "Intelligence that protects lives",
    scene: "copilot",
  },
];

/** Modern portfolio palette */
export const palette = {
  canvas: "#F3EFE6",
  surface: "#FDFBF7",
  surfaceMuted: "#EBE5DA",
  ink: "#1C1917",
  inkMuted: "#78716C",
  violet: "#C25E2E",
  violetSoft: "#FDF0E8",
  violetGlow: "#E07A45",
  cyan: "#1D5C4A",
  cyanSoft: "#E4F0EC",
  coral: "#D97706",
  coralSoft: "#FEF3C7",
  border: "#D6CFC3",
  charcoal: "#141210",
  roverBody: "#1C1917",
  roverAccent: "#C25E2E",
};

export const PAGE_MILESTONES = storyTimeline.map((item, i) => ({
  progress: 0.08 + (i / (storyTimeline.length - 1)) * 0.72,
  item,
}));

export const TRANSFORM_START = 0.84;

/** Screen-space path (vw/vh %) — rover travels over content top → bottom */
export function getScreenPosition(t: number) {
  const points = [
    { t: 0, x: 72, y: 18 },
    { t: 0.15, x: 78, y: 28 },
    { t: 0.3, x: 65, y: 40 },
    { t: 0.45, x: 80, y: 52 },
    { t: 0.6, x: 58, y: 64 },
    { t: 0.72, x: 72, y: 76 },
    { t: 0.84, x: 52, y: 86 },
    { t: 1, x: 60, y: 92 },
  ];

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (t >= a.t && t <= b.t) {
      const local = (t - a.t) / (b.t - a.t);
      const ease = local * local * (3 - 2 * local);
      return {
        x: a.x + (b.x - a.x) * ease,
        y: a.y + (b.y - a.y) * ease,
        angle: Math.atan2(b.y - a.y, b.x - a.x),
      };
    }
  }
  return { x: points[points.length - 1].x, y: points[points.length - 1].y, angle: 0 };
}
