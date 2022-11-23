/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ShieldCheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getGithubRepos } from "../../../slices/githubReposSlice";
import { RootState } from "../../../store";
import Repo from "./Repo";
import { CheckIntegrationLinked } from "../../../utils/CheckIntegrationLinked";
import { removeIntegration } from "../../../slices/linkedIntegrationsSlice";

export const GITHUB = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  const [reposCount, setReposCount] = useState(4);
  const dispatch = useDispatch();
  const repos = useSelector((state: RootState) => state.repoDetails.value);
  const githubRefFirebase = useMemo(() => {
    if (!usermail) return;
    return doc(db, "users", usermail, "integrations", "github");
  }, [usermail]);
  useEffect(() => {
    if (!usermail) return;
    const fetchGithubRepos = async () => {
      // we are fetching user details
      setLoading(true);
      const reposData = await getDocs(
        collection(db, "users", usermail, "integrations", "github", "repos")
      );
      const repoFiltered = reposData.docs.filter(
        (repo) =>
          repo.data().repo.fork === false && repo.data().repo.private === false
      );
      dispatch(getGithubRepos(repoFiltered));
      setLoading(false);
    };
    fetchGithubRepos();
  }, [usermail]);
  const removeGithub = async () => {
    await deleteDoc(githubRefFirebase)
      .then(async () => {
        // to delete the collection of github we need to remove every doc in the coll first
        repos.forEach(async (repo) => {
          await deleteDoc(doc(githubRefFirebase, "repos", repo.id));
        });
      })
      .then(async () => {
        await updateDoc(doc(db, "users", usermail), {
          github: deleteField(),
        });
        dispatch(removeIntegration("github"));
        alert("  removed");
      });
  };
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
        <TrashIcon
          title="remove"
          onClick={removeGithub}
          className="remove__icon"
        />
      </div>
      {/* repos */}
      <Suspense fallback={<h1>loading...</h1>}>
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
      </Suspense>
    </main>
  );
};
