/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <div className="bg-gradient-to-b from-transparent to-[#FED7B8] items-center justify-start flex flex-col min-h-screen ">
      <img
        src="/devList.png"
        className="object-center object-cover mt-12"
        height={100}
        width={200}
        alt="logo"
      />
      <div className="mb-24 "/>
      <div className="items-center justify-start flex flex-col w-1/3 py-12">
        <h1 className="mb-12 text-xl"> signIn or sign Up Below </h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="z-10">
          <button
            className="btn"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
