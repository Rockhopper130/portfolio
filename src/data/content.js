// ============================================================
// CONTENT CONFIGURATION
// Edit this file to update everything on the site.
// ============================================================

export const personal = {
  name: "Nishchay Nilabh",
  firstName: "Nishchay",
  lastName: "Nilabh",
  tagline: "MTS @ ThoughtSpot",
  major: "Alumnus IIT Guwahati 25', Data Science & Artificial Intelligence",
  bio: "Shipping Agentic AI at ThoughtSpot. Registering 3D MRIs at CMU. Researching how machines perceive, engineering how they act.",
  email: "nishchay.n2003@gmail.com",
  photo: "/images/landing-image.jpeg",
};

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nishchay-nilabh/",
    icon: "/images/linkedin.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/Rockhopper130/",
    icon: "/images/github.svg",
  },
  // {
  //   label: "Codeforces",
  //   href: "https://codeforces.com/profile/rockhopper130",
  //   icon: "/images/codeforces.svg",
  // },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1PTzkpieqCHYaZnZncdvB6ZMH0wQZ5SmL/view?usp=sharing",
    icon: "/images/cv.svg",
  },
  {
    label: "Email",
    href: "mailto:nishchay.n2003@gmail.com",
    icon: "/images/email.svg",
  },
];

export const skills = [
  {
    category: "Core",
    items: ["Python", "C++", "Java", "PyTorch", "TensorFlow"],
  },
  {
    category: "ML",
    items: ["OpenCV", "Open3D", "Pyannote", "LangGraph"],
  },
  {
    category: "Systems",
    items: ["Git", "Docker", "Kubernetes", "AWS", "Jenkins", "Redis"],
  },
  {
    category: "Ops & Observability",
    items: ["Grafana", "Kibana", "Jaeger", "Spinnaker"],
  },
];


export const projects = [
  {
    name: "Adobe Behaviour Simulation",
    sub: "Inter IIT 12.0 — IIT Madras",
    desc: "Tweet-like prediction and generation using NLP models. Predicts engagement metrics with high accuracy and fast inference.",
    tags: ["Python", "NLP", "Transformers", "ML"],
    github: "https://github.com/Rockhopper130/Adobe-Behaviour-Simulation",
    image: "/images/adobe.png",
  },
  {
    name: "Inventory Management System",
    sub: "Techboard — IIT Guwahati",
    desc: "Resource sharing and booking platform. Led UI/UX design in Figma and built the React + Material UI frontend.",
    tags: ["React", "Material UI", "Figma", "UI/UX"],
    github: "https://github.com/Rockhopper130/Inventory-Management-System",
    image: "/images/techboard.png",
  },
  {
    name: "GrowSimplee Volume Prediction",
    sub: "Inter IIT 11.0 — IIT Kanpur",
    desc: "3D point cloud reconstruction from stereo images. 98% accuracy in volumetric weight with only 1.5s inference time.",
    tags: ["Python", "OpenCV", "3D Vision", "NumPy"],
    github: "https://github.com/Rockhopper130/Grow-Simplee-Tech-Meet-11.0",
    image: "/images/growsimplee.avif",
  },
  {
    name: "DSAI Research Portal",
    sub: "DA215 — DBMS Lab",
    desc: "Scraped and structured Google Scholar profiles for the DSAI department. Interactive portal with PHP, MySQL, and Chart.js.",
    tags: ["PHP", "MySQL", "Selenium", "Chart.js"],
    github: "https://github.com/Rockhopper130/dbms_lab_endsem",
    image: "/images/dbms.png",
  },
];

export const experiences = [
  {
    name: "ThoughtSpot",
    role: "Member of Technical Staff (ML)",
    image: "/images/thoughtspot.png",
    time: "August 2025 - Present",
  },
  {
    name: "CMU - Xu Labs",
    role: "Research Collaborator",
    image: "/images/cmu.png",
    time: "June 2025 - Present",
  },
  {
    name: "Sprinklr",
    role: "Product Engineering Intern",
    image: "/images/sprinklr.png",
    time: "May 2024 - July 2024",
  },
  {
    name: "UNSW Sydney",
    role: "Research Intern",
    image: "/images/unsw.png",
    time: "January 2023 - May 2023",
  },
];
