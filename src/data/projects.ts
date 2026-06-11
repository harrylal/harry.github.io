export interface Project {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  description: string;
  image: string;
  images?: string[];
  githubUrl?: string;
  challenges: string[];
  architecture: string[];
  results: { metric: string; label: string }[];
  technologies: string[];
  diagram?: "aeb" | "agv" | "dms" | "bev" | "localization" | "inspection";
}

export const projects: Project[] = [
  {
    slug: "vision-based-aeb",
    title: "Vision-Only Reinforcement Learning AEB",
    tagline: "Bidirectional collision risk awareness with PPO",
    period: "May 2025 — Aug 2025",
    description:
      "A low-cost, vision-driven Autonomous Emergency Braking framework that mitigates both front-end and rear-end collision risks — addressing a critical limitation of conventional, front-only systems. MTech research project.",
    image: "/images/projects/rl-based-aeb.jpeg",
    challenges: [
      "Covering both front and rear collision risk, unlike conventional front-only AEB",
      "Modeling ego, front, and rear vehicle dynamics in a custom OpenAI Gym environment",
      "Designing multi-term rewards that balance safety, comfort, anticipation, and expert alignment",
      "Maintaining stability under imperfect, noisy detections",
    ],
    architecture: [
      "Custom OpenAI Gym-compatible environment modeling ego/front/rear dynamics",
      "Proximal Policy Optimization (PPO) trained on multi-term reward shaping",
      "Noise-injected training for robustness to imperfect perception",
      "Vision-only perception feeding bidirectional collision-risk estimation",
    ],
    results: [
      { metric: "Front + Rear", label: "Bidirectional risk coverage" },
      { metric: "Vision-only", label: "No radar dependency" },
      { metric: "PPO", label: "RL control policy" },
    ],
    technologies: ["Python", "PyTorch", "PPO", "OpenAI Gym", "OpenCV", "Reinforcement Learning"],
    diagram: "aeb",
  },
  {
    slug: "marker-free-agv",
    title: "Marker-Free Connected AGV for Smart Factories",
    tagline: "Omnidirectional AMR with multi-sensor perception",
    period: "Jan 2022 — May 2022",
    description:
      "A fully autonomous mobile robot with omnidirectional travel, built on LIDAR, stereo camera, and Vive trackers powered by an NVIDIA Jetson Nano — demonstrated with a connected mock assembly station and warehouse. BTech capstone.",
    image: "/images/projects/amr.jpeg",
    images: ["/images/projects/station1.jpeg"],
    challenges: [
      "Marker-free, omnidirectional navigation on dynamic factory floors",
      "Fusing LIDAR, stereo camera, and Vive tracker data on the Jetson Nano",
      "Coordinating the AMR with assembly and warehouse stations in real time",
      "Driving electro-pneumatic stations via ESP32 alongside the robot stack",
    ],
    architecture: [
      "Omnidirectional drive for holonomic mobility",
      "Multi-sensor localization (LIDAR + stereo vision + Vive trackers)",
      "NVIDIA Jetson Nano perception and control",
      "ESP32-controlled electro-pneumatic assembly + warehouse demo",
    ],
    results: [
      { metric: "Omni-drive", label: "Holonomic mobility" },
      { metric: "Marker-free", label: "No floor infrastructure" },
      { metric: "Connected", label: "Assembly ↔ AMR ↔ warehouse" },
    ],
    technologies: ["ROS", "LIDAR", "Stereo Vision", "NVIDIA Jetson Nano", "ESP32", "Electro-Pneumatics"],
    diagram: "agv",
  },
  {
    slug: "birds-eye-view-mapping",
    title: "Birds-Eye-View Map Generation from RGB-D",
    tagline: "Lidar + camera sensor fusion on KITTI",
    period: "Sep 2021 — Dec 2021",
    description:
      "Employed sensor fusion techniques utilizing lidar and camera data from the KITTI dataset to generate an informative birds-eye-view occupancy grid map enriched with semantic details.",
    image: "/images/projects/bev-occupancy.jpg",
    githubUrl:
      "https://github.com/harrylal/simulation-of-birds-eye-view-map-generation-from-rgbd-data",
    challenges: [
      "Fusing heterogeneous lidar point clouds with camera imagery",
      "Generating top-down occupancy grids with semantic class labels",
      "Working within the constraints of the KITTI benchmark dataset",
      "Predicting segmentation masks with BiSeNetv2 for semantic enrichment",
    ],
    architecture: [
      "Bird's-eye-view occupancy grid map generation from LiDAR data",
      "BiSeNetv2 semantic segmentation mask prediction",
      "Sensor fusion pipeline combining lidar and camera streams",
      "KITTI dataset preprocessing and visualization",
    ],
    results: [
      { metric: "BEV", label: "Occupancy grid maps" },
      { metric: "Semantic", label: "Segmentation-enriched" },
      { metric: "KITTI", label: "Benchmark dataset" },
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "BiSeNetv2", "KITTI", "Sensor Fusion"],
    diagram: "bev",
  },
  {
    slug: "overhead-camera-localization",
    title: "Overhead Camera Robot Localization",
    tagline: "Real-time outside-in tracking with computer vision",
    period: "Jul 2021 — Sep 2021",
    description:
      "An experimental project for real-time outside-in tracking using an overhead camera feed to pilot and navigate a small ESP32-powered differential-drive robot within its arena — utilizing pixel data for localization and path planning.",
    image: "/images/projects/overhead-cam-guide-robot.png",
    challenges: [
      "Achieving real-time localization from a fixed overhead camera",
      "Mapping pixel coordinates to robot pose in the arena",
      "Low-latency communication between host system and ESP32 microcontroller",
      "Reliable tracking under varying lighting in the arena",
    ],
    architecture: [
      "Overhead camera feed for outside-in pose estimation",
      "Pixel-based piloting and navigation pipeline",
      "ESP32 differential-drive robot with host-system control",
      "Real-time path planning from camera coordinates",
    ],
    results: [
      { metric: "Outside-in", label: "Overhead camera tracking" },
      { metric: "ESP32", label: "Embedded robot platform" },
      { metric: "Real-time", label: "Live navigation" },
    ],
    technologies: ["Python", "OpenCV", "ESP32", "Computer Vision", "Path Planning"],
    diagram: "localization",
  },
  {
    slug: "bottle-crate-inspection",
    title: "Bottle Crate Inspection",
    tagline: "Classical computer vision quality control",
    period: "Sep 2020 — Dec 2020",
    description:
      "Analyzes the quality of bottle crates with classical image processing techniques using OpenCV — detecting defects and verifying crate integrity without deep learning.",
    image: "/images/projects/bottle-crate.png",
    githubUrl: "https://github.com/harrylal/Bottle-crate-inspection-OpenCV",
    challenges: [
      "Robust defect detection under varying lighting and crate orientations",
      "Designing classical CV pipelines without neural network dependencies",
      "Handling diverse crate configurations and bottle arrangements",
      "Producing clear visual output for quality-assurance review",
    ],
    architecture: [
      "Classical image processing pipeline with OpenCV",
      "Contour and feature-based defect detection",
      "Batch processing of crate images with annotated outputs",
      "Quality scoring and pass/fail classification",
    ],
    results: [
      { metric: "Classical CV", label: "No deep learning required" },
      { metric: "OpenCV", label: "Production-ready tooling" },
      { metric: "QA", label: "Manufacturing inspection" },
    ],
    technologies: ["Python", "OpenCV", "Image Processing", "Quality Control"],
    diagram: "inspection",
  },
];
