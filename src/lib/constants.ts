import type { Project, Blog } from "@/types";
import { Code, Cpu, Lightbulb, Briefcase } from 'lucide-react';

export const projects: Project[] = [
  {
    id: "1",
    title: "TeleOTIVA",
    description: "TeleOTIVA is a mobile phone-based technology that utilizes an AI model to detect precancerous cervical lesions using cervicography data.",
    longDescription: "TeleOTIVA is a mobile phone-based technology that utilizes an AI model to detect precancerous cervical lesions using cervicography data. The model’s performance was tested through several stages: evaluating the AI model, having oncology-gynecologists assess cervicography images taken by healthcare workers, and conducting direct tests on 1,611 women aged 20 to 50 at Dr. Mohammad Hoesin Hospital in Palembang and 12 primary health centers. 12 healthcare workers were trained to use the application, called the TeleOTIVA App. Four mobile phones—OVO, Infinix, Xiaomi Redmi, and Samsung—were used to evaluate the processing speed and quality of VIA images.",
    imageUrl: "/images/teleotiva.webp",
    images: [
        { url: "/images/teleotiva.webp", alt: "Image" },
        { url: "/images/teleotiva_2.png", alt: "Image" },
    ],
    projectUrl: "https://teleotiva.com/",
    detailsUrl: "https://isysrg.com/products/teleotiva",
    tags: ["Flutter", "Dart", "Go", "Python", "Android", "iOS"],
    keywords: ["online store", "shopping", "payment gateway"],
    publishedAt: new Date("2025-05-24"),
    createdAt: new Date("2025-05-24"),
    updatedAt: new Date("2025-05-24"),
  },
  {
    id: "2",
    title: "FazScan",
    description: "FazScan is a cross-platform software application designed to analyze and improve website security by scanning website information and detecting security vulnerabilities.",
    longDescription: "FazScan is a cross-platform software application designed to analyze and improve website security by scanning website information and detecting security vulnerabilities. The invention of this application utilizes advanced scanning algorithms and open website analysis APIs to provide information such as website URL, IP, domain, CMS details, blacklist status, and potential security risks. This application is compatible with Android, Windows, and Linux operating systems.",
    imageUrl: "/images/fazscan.png",
    images: [
        { url: "/images/fazscan.png", alt: "Image" },
    ],
    projectUrl: "https://play.google.com/store/apps/details?id=com.mfazrinizar.fazscan",
    githubUrl: "https://github.com/mfazrinizar/fazscan",
    tags: ["Flutter", "Dart", "OSINT", "Information Gathering", "C++", "CVE"],
    keywords: ["to-do list", "project management", "teamwork"],
    publishedAt: new Date("2025-05-24"),
    createdAt: new Date("2025-05-24"),
    updatedAt: new Date("2025-05-24"),
  },
  {
    id: "3",
    title: "Flutter Secure DotEnv",
    description: "A package to encrypt environment keys with AES industry-standard encryption algorithm.",
    longDescription: "flutter_secure_dotenv takes the security of your sensitive data in dotenv files to the next level. Unlike other dotenv packages that may leave your secrets vulnerable, flutter_secure_dotenv prioritizes reliability and protection. Through advanced encryption, robust key management, and efficient secret decryption, flutter_secure_dotenv ensures your secrets remain confidential and inaccessible to unauthorized users. Experience enhanced security and peace of mind with flutter_secure_dotenv for your Flutter and Dart projects.",
    imageUrl: "/images/flutter_secure_dotenv.png",
    images: [
        { url: "/images/flutter_secure_dotenv.png", alt: "Image" },
    ],
    projectUrl: "https://pub.dev/packages/flutter_secure_dotenv", 
    githubUrl: "https://github.com/mfazrinizar/flutter_secure_dotenv",
    tags: ["Flutter", "Dart", "AES", "Pointycastle", "Buildrunner"],
    keywords: ["web developer", "showcase", "resume", "one-page"],
    publishedAt: new Date("2025-05-24"),
    createdAt: new Date("2025-05-24"),
    updatedAt: new Date("2025-05-24"),
  },
];

export const skills = [
  { name: "Flutter", icon: "Code" },
  { name: "Dart", icon: "Code" },
  { name: "Next.JS", icon: "Code" },
  { name: "Typescript", icon: "Code" },
  { name: "Python", icon: "Code" },
  { name: "Pytorch", icon: "Code" },
  { name: "Golang", icon: "Code" },
  { name: "Problem Solving", icon: "Lightbulb" },
  { name: "Research", icon: "Cpu" },
];

export const iconMap = {
  Code,
  Cpu,
  Lightbulb,
  Briefcase,
};

export const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Pertamina",
    duration: "2024 - 2025",
    description: "Building specialized software that integrates optimized local Small Language Model onpremise systems for Knowledge-Based Systems (KBS).",
    icon: "Briefcase"
  },
  {
    role: "AI Software Engineer",
    company: "Scale AI",
    duration: "2025 - Present",
    description: "Software using AI evaluation, AI engineering and research, specializing in GenAI model training, feedback, and evaluation.",
    icon: "Briefcase"
  },
  {
    role: "Mobile Developer",
    company: "Google Play Store & Apple App Store",
    duration: "2024 - Present",
    description: "Mobile development, specializing in mobile application development, maintenance, and publishing for commercial client apps.",
    icon: "Briefcase"
  },
  {
    role: "Full Stack Engineer",
    company: "Intelligent Systems Research Group (ISysRG)",
    duration: "2024 - Present",
    description: "Full stack engineering, specializing in mobile, backend, and server maintenance (devops).",
    icon: "Briefcase"
  },
  {
    role: "Research Assistant & Student Lead",
    company: "Artificial Intelligence Research Laboratory (AIRLab) Research Group",
    duration: "2024 - Present",
    description: "Research assistant and student lead, specializing in NLP research and engineering.",
    icon: "Briefcase"
  },
  {
    role: "Software Engineer",
    company: "DataAnnotation",
    duration: "Q2 2025",
    description: "Software optimization, AI engineering and research, specializing in data annotation and model training.",
    icon: "Briefcase"
  },
  {
    role: "Mobile Engineer",
    company: "Confidential State-Owned Enterprise Partner",
    duration: "2023 - 2024",
    description: "Mobile engineering, specializing in mobile application development and signal processing.",
    icon: "Briefcase"
  },
];

export const phrases = [
  "Software Engineer",
  "Research Enthusiast",
  "Full Stack Engineer",
  "Mobile Engineer",
];

export const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export const blogs: Blog[] = [
  // Example blog
  // {
  //   id: "1",
  //   title: "Welcome to My Blog",
  //   slug: "welcome-to-my-blog",
  //   content: "This is the first post.",
  //   summary: "Introductory post.",
  //   imageUrl: "/images/profile.png",
  //   tags: ["intro", "personal"],
  //   publishedAt: new Date(),
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
];

// Terminal commands for interactive hero terminal
export const terminalCommands: Record<string, string> = {
  help: "Available commands: help, about, skills, education, contact, projects, clear",
  about: "M. Fazri Nizar - Software Engineer & Research Enthusiast with 3+ years of experience building innovative solutions.",
  skills: "Core skills: Flutter, Dart, Next.JS, TypeScript, Python, PyTorch, Golang, Problem Solving, Research",
  education: "Computer Science @ Sriwijaya University | GPA: 3.88/4.00 | Expected Graduation: 2026",
  contact: "Email: mfazrinizar@gmail.com | LinkedIn: linkedin.com/in/mfazrinizar | GitHub: github.com/mfazrinizar",
  projects: "Featured: TeleOTIVA (AI Healthcare), FazScan (Security Tool), Flutter Secure DotEnv (Encryption Package)",
  location: "Based in South Sumatera, Indonesia | Open to remote opportunities worldwide",
  experience: "Current: AI Software Engineer @ Scale AI | Full Stack Engineer @ ISysRG | Research Assistant @ AIRLab",
  clear: "__CLEAR__",
};
