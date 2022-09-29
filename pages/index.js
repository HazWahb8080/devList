import { signOut } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="w-full h-screen items-center justify-center flex">
      <Head>
        <title>showcase your works in a single place</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-red-400"> nice </h1>
    </div>
  );
}
