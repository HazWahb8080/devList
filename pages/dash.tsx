import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { useSession } from "next-auth/react";
import ProfileCompletion from "../components/sections/ProfileCompletion";
import MainBuilder from "../components/sections/main/MainBuilder";
import Head from "next/head";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const result = useSelector((state: RootState) => state.userDetails.value);
  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [session]);
  return (
    <main className="w-full min-h-screen items-start justify-start flex flex-col ">
      {Object.values(result).some((value) => value !== "") && (
        <Head>
          <title>{result.firstName} | DevList Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <Header session={session} />
      <div className="grid grid-cols-12 place-items-start w-full min-h-screen">
        <ProfileCompletion />
        <MainBuilder session={session} />
        <div className="col-span-1 py-2 w-full h-full"></div>
      </div>
    </main>
  );
}

export default DashboardPage;
