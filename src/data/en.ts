import type { Award, Project } from './zh';
import { robot } from './en-robot';
import { vit } from './en-vit';
import { nnm } from './en-nnm';

export const person = {
  name: 'Soren Yao',
  en: '姚舒文',
  school: 'Wuhan University',
  college: 'School of Computer Science',
  major: 'Software Engineering (Pilot Class of the Characteristic Demonstration Software School)',
  grade: 'Class of 2025 · Sophomore · Expected graduation June 2029',
  photo: 'assets/photo.png',
  emailMain: 'xd_koala@163.com',
  emailSchool: '2025302183135@whu.edu.cn',
  github: 'https://github.com/XDkoala',
  githubName: 'XDkoala',
  bio: [
    "I'm Soren Yao, a sophomore (Class of 2025) majoring in Software Engineering at the School of Computer Science, Wuhan University, enrolled in the Pilot Class of its Characteristic Demonstration Software School. The question I care about is how a robot can understand the real physical world and still behave reliably in unfamiliar, changing and noisy conditions. Embodied AI and physical AI, together with VLA and world models, are the directions I'm continually learning.",
    'To get closer to that question, I work in three directions: designing the visual localization, kinematics and arm–vehicle coordination algorithms of a mobile manipulation robot, so that it can resume its task after the target moves, is lost, or a grasp fails; implementing a Vision Transformer from scratch and running comparison, ablation, corruption and cross-domain transfer experiments on it; and building a locally run neural-network training and model-management platform that turns training, evaluation and inference into a complete tool.',
    "These experiences have taught me to state problems clearly and to test my judgments against evidence. I'm also good at working with AI: I set the goals, review the proposals and arrange real-robot validation, driving problems toward solutions step by step.",
  ],
  keywords: ['Embodied AI', 'World Models', 'Physical AI', 'Generalization & Robustness', 'VLA'],
};

export const interests = [
  { t: 'Embodied AI & Physical AI', d: 'I focus on how perception, decision and action form a closed loop: a robot must understand the real environment and also answer for its own actions.' },
  { t: 'World Models', d: 'I focus on environment representation, change prediction and memory, hoping robots can judge “what will happen next” before they act.' },
  { t: 'VLA', d: 'I focus on how vision and language understanding connect to robot actions. This is what I want to study systematically next.' },
  { t: 'Generalization, Transfer & Robustness', d: "I focus on reliable behavior under unfamiliar environments, disturbances and task changes. MiniViT's cross-domain transfer and corruption experiments were my first empirical attempt." },
];

export const stats = [
  { label: 'First-year GPA', value: 3.93, dec: 2, suffix: ' / 4.00' },
  { label: 'First-year class GPA rank', value: 2, dec: 0, suffix: ' / 36' },
  { label: 'Open Source Innovation Competition awards', value: 7, dec: 0, suffix: ' awards' },
];

export const courses = [
  { n: 'Advanced Mathematics A1', s: 95 },
  { n: 'Advanced Mathematics A2', s: 92 },
  { n: 'Linear Algebra A', s: 96 },
  { n: 'High-Level Language Programming A', s: 94 },
  { n: 'Data Structures A', s: 96 },
  { n: 'Object-Oriented Programming', s: 94 },
  { n: 'Digital Logic and Digital Circuits', s: 94 },
  { n: 'Foundational Project Practice', s: 98 },
];

export const foundations = [
  { t: 'Mathematics', d: 'Mathematics is my strongest subject. I have studied calculus, linear algebra, discrete mathematics, and probability and statistics.' },
  { t: 'Machine Learning & Deep Learning', d: 'I have studied the main theory and can explain the underlying principles. My practice centers on CNNs and Transformers: I implemented a Vision Transformer from scratch, ran CNN comparisons, architecture ablations, regularization comparisons, multi-seed evaluation, corruption tests and cross-domain transfer, and visualized attention with Attention Rollout.' },
  { t: 'Reinforcement Learning', d: 'I have studied the main theory and can explain the basic principles; I hope to go deeper by connecting it to robot perception and decision-making.' },
  { t: 'Robotics & Engineering Practice', d: 'On K230 and MSPM0 I developed the algorithms and system for robot visual localization, arm kinematics, chassis control and board-to-board communication. I built a desktop neural-network training platform with C++17, Qt 6, LibTorch, OpenCV and CMake, and use Python and PyTorch for deep learning experiments.' },
];

const osc = 'The 8th Open Source Innovation Competition';
const contribTrack = 'Open-Source Project Contribution Track';
const taskTrack = 'Open-Source Task Challenge Track';
export const awards: Award[] = [
  { group: 'osc', level: 'First Prize', event: osc, track: contribTrack, topic: 'UCAgent Open-Source Contribution Challenge', work: 'UCAgent NutShell Cache Automated Verification', date: '2026.08', img: 'assets/certs/osc-1.png' },
  { group: 'osc', level: 'Second Prize', event: osc, track: taskTrack, topic: 'Rust Programming Competition: HTTPS proxy support for ylong_http', work: 'ylong_http_client HTTPS Proxy Module', date: '2026.08', img: 'assets/certs/osc-2b.png' },
  { group: 'osc', level: 'Second Prize', event: osc, track: taskTrack, topic: 'On-device Audio Event Detection System on openvela', work: 'On-device Audio Event Detection System on openvela', date: '2026.08', img: 'assets/certs/osc-2a.png' },
  { group: 'osc', level: 'Third Prize', event: osc, track: taskTrack, topic: 'Smart Home Control System with openvela Agents', work: 'Smart Home Vela Agent', date: '2026.08', img: 'assets/certs/osc-3b.png' },
  { group: 'osc', level: 'Third Prize', event: osc, track: taskTrack, topic: 'Mooncake KVCache Storage Design and Performance Optimization', work: 'Mooncake Store promotion-hit transient failure retry', date: '2026.08', img: 'assets/certs/osc-3c.png' },
  { group: 'osc', level: 'Third Prize', event: osc, track: contribTrack, topic: 'ModelEngine Open-Source Contribution Challenge', work: 'MedGraph Insight Agent', date: '2026.08', img: 'assets/certs/osc-3a.png' },
  { group: 'osc', level: 'Third Prize', event: osc, track: contribTrack, topic: 'CrowdOS Crowd-Intelligence Application Development and LLM Enhancement', work: 'FloodGuard-LLM', date: '2026.08', img: 'assets/certs/osc-3d.png' },
  { group: 'other', level: 'First Prize', event: '2026 VeriSilicon Cup National Embedded Software Development Competition', work: 'Team “WHU 333”, Wuhan University', date: '2026.07', img: 'assets/certs/verisilicon.jpg', extra: [{ label: 'Award ceremony', img: 'assets/certs/verisilicon-stage.jpeg' }] },
  { group: 'other', level: 'Second Prize', event: "19th China College Students' Computer Design Contest · Central-South Regional Round", work: '“Health Guardian”: An Edge–Cloud Collaborative Smart Health Monitoring System for Elderly People Living Alone', date: '2026.05', img: 'assets/certs/design.jpg' },
  { group: 'other', level: 'Second Prize', event: 'The 16th MathorCup Mathematical Applications Challenge · Regional Round', work: 'Undergraduate Group', date: '2026.06', img: 'assets/certs/mathorcup.png' },
];

export const projects: Project[] = [robot, vit, nnm];
