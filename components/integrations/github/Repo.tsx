import { CopyIcon, StarIcon } from "@radix-ui/react-icons";
import { RepoLanguages } from "../../../utils/db";
import React from "react";

export default function Repo({ repo }) {
  return (
    <div className="repo__wrapper group">
      <span className="repo__wrapper_item ">
        <h1 className="w-full text-left">{repo.name}</h1>
        <span className="flex space-x-2 w-full items-center justify-end">
          <LanguageIcon l={repo.language} />
          <p className="self-center">{repo.language}</p>
        </span>
      </span>
      <div className="w-full py-1 border-t border-black/10 group-hover:border-black/50 smooth" />
      <span className="w-full items-start justify-start flex px-2 space-x-2 ">
        {/* forks */}
        <span className="flex space-x-1 items-center justify-center">
          <CopyIcon className="icon h-4 w-4" />
          <p className="self-center">{repo.forks}</p>
        </span>
        {/* stars */}
        <span className="flex space-x-1 items-center justify-center">
          <StarIcon className="icon h-4 w-4" />
          <p className="self-center">{repo.forks}</p>
        </span>
      </span>
    </div>
  );
}

export const LanguageIcon = ({ l }) => {
  let language = RepoLanguages.find((item) => item.title === l);
  if (language) return <span>{language.icon}</span>;
  return <></>;
};
