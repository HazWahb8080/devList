import React, { Suspense, useEffect, useState } from "react";
import { ShieldCheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CopyIcon, GitHubLogoIcon, StarIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { RepoLanguages } from "../../utils/db";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../../slices/githubReposSlice";
import { RootState } from "../../store";

function GITHUB() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  const [reposCount, setReposCount] = useState(4);
  const dispatch = useDispatch();
  const repos = useSelector((state: RootState) => state.repoDetails.value);
  useEffect(() => {
    if (!usermail) return;
    const fetchGithubRepos = async () => {
      // we are fetching user details
      setLoading(true);
      const reposData = await getDocs(
        collection(db, "users", usermail, "integrations", "github", "repos")
      );
      dispatch(getGithubRepos(reposData.docs));
      setLoading(false);
    };
    fetchGithubRepos();
  }, [usermail]);
  return (
    <main className="w-full pb-6 pt-2 lg:px-12 px-2 items-center justify-center flex flex-col space-y-6">
      {/* top heading */}
      <div className="w-full  items-center justify-between flex border-b border-black/10 pb-4 ">
        {/* text */}
        <span className="w-full items-start justify-start flex space-x-4">
          <GitHubLogoIcon className="self-center h-8 w-8" />
          <h1 className="self-center text-xl mr-6">Github</h1>
          <ShieldCheckIcon title="verified" className="verified__icon" />
        </span>
        <TrashIcon className="remove__icon" title="remove" />
      </div>
      {/* repos */}
      <Suspense fallback={<h1>loading...</h1>}>
        {repos.length > 0 && (
          <>
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              {repos.slice(0, reposCount).map((repo) => (
                <Repo key={repo.data().repo.id} repo={repo.data().repo} />
              ))}
            </div>
            <span className="w-full items-center justify-center flex  pt-6">
              <button
                className="btn py-1.5"
                onClick={() =>
                  repos.length <= reposCount
                    ? setReposCount((curr) => 4)
                    : setReposCount((curr) => curr + 4)
                }
              >
                {repos.length <= reposCount ? " show less" : "show more"}
              </button>
            </span>
          </>
        )}
      </Suspense>
    </main>
  );
}

export default GITHUB;

export const Repo = ({ repo }) => {
  return (
    <div className="repo__wrapper group">
      <span className="repo__wrapper_item ">
        <h1 className="w-full text-left">{repo.name}</h1>
        <span className="flex space-x-2 w-full items-center justify-end">
          <RepoIconFilter l={repo.language} />
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
};

export const RepoIconFilter = ({ l }) => {
  let language = RepoLanguages.find((item) => item.title === l);
  if (language) return <span className="">{language.icon}</span>;
  return <></>;
};
