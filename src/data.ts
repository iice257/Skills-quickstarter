import {
  Blocks,
  Bot,
  Box,
  Braces,
  Brush,
  Bug,
  CheckCircle2,
  FileText,
  FlaskConical,
  Gem,
  GitPullRequest,
  Globe2,
  Layers3,
  Lightbulb,
  MonitorSmartphone,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TerminalSquare,
  TestTube2,
  WandSparkles,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const repoUrl = "https://github.com/iice257/Skills-quickstarter";
export const commandRepoBase = "https://github.com/iice257/Skills";
export const githubProfileUrl = "https://github.com/iice257";
export const xProfileUrl = "https://x.com/iice257";

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Categories", href: "#categories" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Providers", href: "#providers" },
  { label: "About", href: "#about" }
];

export type CommandRow = {
  label: string;
  description: string;
  command: string;
  icon: LucideIcon;
};

export const commands: CommandRow[] = [
  {
    label: "Guided setup",
    description: "Starts from the README so the agent asks what you need.",
    command: `$skill-starter install ${commandRepoBase}/readme.md`,
    icon: Sparkles
  },
  {
    label: "Lightweight quickstart",
    description: "Small starter setup without installing everything.",
    command: `$skill-starter install ${commandRepoBase}/tree/main/categories/lightweight-quickstart`,
    icon: PackageCheck
  },
  {
    label: "Web development setup",
    description: "Frontend, design, browser testing, CI, and deployment.",
    command: `$skill-starter install ${commandRepoBase}/tree/main/categories/web-development-setup`,
    icon: Globe2
  },
  {
    label: "Full startup",
    description: "Installs the full skill catalog.",
    command: `$skill-starter install ${commandRepoBase}/tree/main/categories/full-startup`,
    icon: Blocks
  },
  {
    label: "Favourites",
    description: "Installs the current capped shortlist.",
    command: `$skill-starter install ${commandRepoBase}/tree/main/favourites`,
    icon: CheckCircle2
  }
];

export const needCards = [
  {
    title: "Categories",
    text: "Install paths grouped by the kind of work you do.",
    href: `${repoUrl}/tree/main/categories`,
    action: "Browse categories",
    icon: Layers3
  },
  {
    title: "Scenarios",
    text: "Use-case bundles for different setups.",
    href: "#scenarios",
    action: "View bundles",
    icon: Workflow
  },
  {
    title: "Favourites",
    text: "The capped shortlist for a fast high-value setup.",
    href: `${repoUrl}/tree/main/favourites`,
    action: "Install shortlist",
    icon: Star
  },
  {
    title: "Providers",
    text: "OpenAI, Claude, Gemini, and Cursor packs.",
    href: "#providers",
    action: "Explore packs",
    icon: Workflow
  },
  {
    title: "Originals",
    text: "My originals and custom additions.",
    href: `${repoUrl}/tree/main/originals`,
    action: "See originals",
    icon: WandSparkles
  }
];

export type Scenario = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const scenarios: Scenario[] = [
  {
    name: "Web development setup",
    description: "Frontend, design, testing, CI, and deploy workflows.",
    href: `${repoUrl}/tree/main/categories/web-development-setup`,
    icon: Globe2
  },
  {
    name: "Design UI",
    description: "Premium interface design and redesign work.",
    href: `${repoUrl}/tree/main/categories/design-ui`,
    icon: Brush
  },
  {
    name: "Browser testing",
    description: "Browser automation, screenshots, and verification.",
    href: `${repoUrl}/tree/main/categories/browser-testing`,
    icon: TestTube2
  },
  {
    name: "Debugging",
    description: "Browser, screenshot, PR checks, and review fixes.",
    href: `${repoUrl}/tree/main/categories/debugging`,
    icon: Bug
  },
  {
    name: "GitHub CI",
    description: "GitHub Actions and PR review workflow.",
    href: `${repoUrl}/tree/main/categories/github-ci`,
    icon: GitPullRequest
  },
  {
    name: "Deployment",
    description: "Vercel, Netlify, and deploy-readiness workflows.",
    href: `${repoUrl}/tree/main/categories/deployment`,
    icon: Rocket
  },
  {
    name: "Cybersec",
    description: "Security review, ownership mapping, and CI checks.",
    href: `${repoUrl}/tree/main/categories/cybersec`,
    icon: ShieldCheck
  },
  {
    name: "Content media",
    description: "Images, speech, transcription, screenshots, publishing.",
    href: `${repoUrl}/tree/main/categories/content-media`,
    icon: FileText
  },
  {
    name: "Documents office",
    description: "Documents, PDFs, and transcription-heavy work.",
    href: `${repoUrl}/tree/main/categories/documents-office`,
    icon: Braces
  },
  {
    name: "AI / API",
    description: "Gemini, image generation, speech, and transcription APIs.",
    href: `${repoUrl}/tree/main/categories/ai-api`,
    icon: FlaskConical
  },
  {
    name: "Mobile desktop",
    description: "WinUI, iOS-adjacent references, and app workflows.",
    href: `${repoUrl}/tree/main/categories/mobile-desktop`,
    icon: MonitorSmartphone
  },
  {
    name: "Planning productivity",
    description: "Idea shaping, skill discovery, handoff, and complete output.",
    href: `${repoUrl}/tree/main/categories/planning-productivity`,
    icon: Lightbulb
  }
];

export const providers = [
  {
    name: "OpenAI",
    description: "Official OpenAI skills from GitHub and local Codex OpenAI cache entries.",
    href: `${repoUrl}/tree/main/categories/openai-official`,
    icon: Bot
  },
  {
    name: "Claude Code",
    description: "Anthropic GitHub skills plus local Claude Code-style skills found on this machine.",
    href: `${repoUrl}/tree/main/categories/claude-code`,
    icon: Box
  },
  {
    name: "Gemini",
    description: "Gemini CLI GitHub skills plus local Gemini-related skills.",
    href: `${repoUrl}/tree/main/categories/gemini`,
    icon: Gem
  },
  {
    name: "Cursor",
    description: "Cursor rules and skill locations checked; no installable SKILL.md pack found yet.",
    href: `${repoUrl}/tree/main/categories/cursor`,
    icon: TerminalSquare
  }
];

export const trustItems = [
  "Install only what you need",
  "One-command setup",
  "Works across agent workflows"
];

export const stats = [
  { value: "100+", label: "Skills" },
  { value: "20+", label: "Bundles" },
  { value: "4", label: "Provider packs" },
  { value: "1cmd", label: "Setup time" }
];

export const ecosystem = [
  { label: "Codex", icon: Bot },
  { label: "Claude Code", icon: Box },
  { label: "Gemini", icon: Gem },
  { label: "Cursor", icon: TerminalSquare }
];
