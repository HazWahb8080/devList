import React, { Suspense, useEffect, useState } from "react";
import { ShieldCheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

function GITHUB() {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  useEffect(() => {
    if (!usermail) return;
    const fetchGithubRepos = async () => {
      // we are fetching user details
      setLoading(true);
      const reposData = await getDocs(
        collection(db, "users", usermail, "integrations", "github", "repos")
      );
      setRepos(reposData.docs);
      setLoading(false);
    };
    fetchGithubRepos();
  }, [usermail]);
  return (
    <main className="w-full pb-6 pt-2 px-12 items-center justify-center flex flex-col space-y-6">
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
        {repos && (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <Repo key={repo.data().repo.id} repo={repo.data().repo} />
            ))}
          </div>
        )}
      </Suspense>
    </main>
  );
}

export default GITHUB;

export const Repo = ({ repo }) => {
  return <h1>{repo.name}</h1>;
};
