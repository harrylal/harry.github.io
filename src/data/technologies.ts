export interface TechNode {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  useCase: string;
}

export interface TechCategory {
  id: string;
  title: string;
  color: string;
  technologies: TechNode[];
}

export const techCategories: TechCategory[] = [
  {
    id: "ai-ml",
    title: "AI & ML",
    color: "#C25E2E",
    technologies: [
      { name: "PyTorch", level: "Expert", useCase: "Deep learning & RL model training" },
      { name: "PPO / RL", level: "Advanced", useCase: "Vision-only AEB control policies" },
      { name: "TensorFlow Lite", level: "Advanced", useCase: "Lightweight edge deployment" },
      { name: "ONNX", level: "Advanced", useCase: "Cross-platform model export" },
    ],
  },
  {
    id: "cv",
    title: "Computer Vision",
    color: "#1D5C4A",
    technologies: [
      { name: "OpenCV", level: "Expert", useCase: "Real-time perception pipelines" },
      { name: "Object Detection", level: "Expert", useCase: "ADAS perception — LDW, FCW" },
      { name: "Driver Monitoring", level: "Advanced", useCase: "Drowsiness & distraction (Novus Aware)" },
      { name: "Sensor Fusion", level: "Advanced", useCase: "Camera + radar + LIDAR" },
    ],
  },
  {
    id: "robotics",
    title: "Robotics",
    color: "#D97706",
    technologies: [
      { name: "ROS", level: "Advanced", useCase: "Autonomous rover & AGV stacks" },
      { name: "LIDAR / SLAM", level: "Advanced", useCase: "Marker-free navigation" },
      { name: "Stereo Vision", level: "Proficient", useCase: "Depth & localization" },
      { name: "Path Planning", level: "Proficient", useCase: "Mobile robot navigation" },
    ],
  },
  {
    id: "embedded",
    title: "Embedded & Edge",
    color: "#141210",
    technologies: [
      { name: "C++", level: "Expert", useCase: "Production ADAS / NHR03 modules" },
      { name: "NVIDIA Jetson", level: "Expert", useCase: "Edge AI deployment" },
      { name: "MediaTek / Qualcomm", level: "Advanced", useCase: "On-device inference" },
      { name: "CAN Bus / Radar", level: "Advanced", useCase: "Vehicle integration" },
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    color: "#78716C",
    technologies: [
      { name: "Android (C++/JNI)", level: "Advanced", useCase: "Cross-platform ADAS app" },
      { name: "Cloud / Telematics", level: "Advanced", useCase: "Fleet integration & analytics" },
      { name: "Docker", level: "Advanced", useCase: "Containerized deployment" },
      { name: "Git", level: "Expert", useCase: "Version control & collaboration" },
    ],
  },
];
