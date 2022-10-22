import { SVGsIntegrations } from "./svgs";

export  const tags = [
    "figma",
    "product",
    "engineering",
    "javascript",
    "Blogger",
    "Entrepreneur",
  ];

  export const Integrations: Integrations = [
    {
      id: Math.floor(Math.random()),
      title: "github",
      desc: "Connect with GitHub and showcase your contribution & repositories.",
      icon: SVGsIntegrations.github,
    },
    {
      id: Math.floor(Math.random()),
      title: "medium",
      desc: "Connect your Medium blog and showcase your articles.",
      icon: SVGsIntegrations.medium,
    },
    {
      id: Math.floor(Math.random()),
      title: "youtube",
      desc: "Connect your YouTube channels & showcase your videos.",
      icon: SVGsIntegrations.youtube,
    },
    {
      id: Math.floor(Math.random()),
      title: "gumroad",
      desc: "Connect with Gumroad & showcase your digital products.",
      icon: SVGsIntegrations.gumroad,
    },
    {
      id: Math.floor(Math.random()),
      title: "hashnode",
      desc: "Connect your Hashnode blog and showcase your articles.",
      icon: SVGsIntegrations.hashnode,
    },
    {
      id: Math.floor(Math.random()),
      title: "dribbble",
      desc: "Connect with Dribbble and showcase your designs & case studies.",
      icon: SVGsIntegrations.dribbble,
    },
    {
      id: Math.floor(Math.random()),
      title: "productHunt",
      desc: "Connect with Product Hunt & showcase the products you built.",
      icon: SVGsIntegrations.producthunt,
    },
    {
      id: Math.floor(Math.random()),
      title: "DEV",
      desc: "Connect your DEV blog and showcase your articles.",
      icon: SVGsIntegrations.DEV,
    },
    {
      id: Math.floor(Math.random()),
      title: "substack",
      desc: " Connect your Substack newsletter & showcase your issues.",
      icon: SVGsIntegrations.substack,
    },
  ];
  
  type Integrations = Integration[];
  interface Integration {
    id: number;
    title: string;
    icon: JSX.Element;
    desc: string;
  }