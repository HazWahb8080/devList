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
      id: 1,
      title: "github",
      desc: "Connect with GitHub and showcase your contribution & repositories.",
      icon: SVGsIntegrations.github,
    },
    {
      id: 2,
      title: "medium",
      desc: "Connect your Medium blog and showcase your articles.",
      icon: SVGsIntegrations.medium,
    },
    {
      id: 3,
      title: "youtube",
      desc: "Connect your YouTube channels & showcase your videos.",
      icon: SVGsIntegrations.youtube,
    },
    {
      id: 4,
      title: "gumroad",
      desc: "Connect with Gumroad & showcase your digital products.",
      icon: SVGsIntegrations.gumroad,
    },
    {
      id: 5,
      title: "hashnode",
      desc: "Connect your Hashnode blog and showcase your articles.",
      icon: SVGsIntegrations.hashnode,
    },
    {
      id: 6,
      title: "dribbble",
      desc: "Connect with Dribbble and showcase your designs & case studies.",
      icon: SVGsIntegrations.dribbble,
    },
    {
      id: 7,
      title: "productHunt",
      desc: "Connect with Product Hunt & showcase the products you built.",
      icon: SVGsIntegrations.producthunt,
    },
    {
      id: 8,
      title: "DEV",
      desc: "Connect your DEV blog and showcase your articles.",
      icon: SVGsIntegrations.DEV,
    },
    {
      id: 9,
      title: "substack",
      desc: " Connect your Substack newsletter & showcase your issues.",
      icon: SVGsIntegrations.substack,
    },
  ];
  
  export type Integrations = Integration[];
  export interface Integration {
    id: number;
    title: string;
    icon: JSX.Element;
    desc: string;
  }