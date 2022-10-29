import { CodeIcon } from "@radix-ui/react-icons";
import { SVGsIntegrations } from "./svgs";

export const tags = [
  "figma",
  "product",
  "engineering",
  "javascript",
  "Blogger",
  "Entrepreneur",
];

export const Integrations: Integrations = [
  {
    id: 1,
    title: "github",
    desc: "Connect with GitHub and showcase your contribution & repositories.",
    icon: SVGsIntegrations.github,
    authorizeLink: `https://github.com/login/oauth/authorize?scope=public_repo&client_id=d1e100b716c65639f27d`,
  },
  {
    id: 2,
    title: "medium",
    desc: "Connect your Medium blog and showcase your articles.",
    icon: SVGsIntegrations.medium,
    authorizeLink: "",
  },
  {
    id: 3,
    title: "youtube",
    desc: "Connect your YouTube channels & showcase your videos.",
    icon: SVGsIntegrations.youtube,
    authorizeLink: "",
  },
  {
    id: 4,
    title: "gumroad",
    desc: "Connect with Gumroad & showcase your digital products.",
    icon: SVGsIntegrations.gumroad,
    authorizeLink: "",
  },
  {
    id: 5,
    title: "hashnode",
    desc: "Connect your Hashnode blog and showcase your articles.",
    icon: SVGsIntegrations.hashnode,
    authorizeLink: "",
  },
  {
    id: 6,
    title: "dribbble",
    desc: "Connect with Dribbble and showcase your designs & case studies.",
    icon: SVGsIntegrations.dribbble,
    authorizeLink: "",
  },
  {
    id: 7,
    title: "productHunt",
    desc: "Connect with Product Hunt & showcase the products you built.",
    icon: SVGsIntegrations.producthunt,
    authorizeLink: "",
  },
  {
    id: 8,
    title: "DEV",
    desc: "Connect your DEV blog and showcase your articles.",
    icon: SVGsIntegrations.DEV,
    authorizeLink: "",
  },
  {
    id: 9,
    title: "substack",
    desc: " Connect your Substack newsletter & showcase your issues.",
    icon: SVGsIntegrations.substack,
    authorizeLink: "",
  },
];

export type Integrations = Integration[];
export interface Integration {
  id: number;
  title: string;
  icon: JSX.Element;
  desc: string;
  authorizeLink: string;
}

export const RepoLanguages: Language[] = [
  {
    title: "TypeScript",
    icon: <CodeIcon className="w-4 h-4 self-center" />,
  },
  {
    title: "JavaScript",
    icon: <CodeIcon className="w-4 h-4 self-center" />,
  },
  {
    title: "SCSS",
    icon: <CodeIcon className="w-4 h-4 self-center" />,
  },
  {
    title: "CSS",
    icon: <CodeIcon className="w-4 h-4 self-center" />,
  },
];

export interface Language {
  title: string;
  icon: JSX.Element;
}
