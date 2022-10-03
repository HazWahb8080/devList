/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { githubIcon, googleIcon } from "../../utils/svgs";
export default function SignIn({ providers }) {
  return (
    <div className="bg-gradient-to-b from-transparent to-[#FED7B8] items-center justify-start flex flex-col min-h-screen ">
      <img
        src="/devList.png"
        className="object-center object-cover mt-12"
        height={100}
        width={150}
        alt="logo"
      />
      <div className="mb-24 " />
      <div className="items-center justify-start flex flex-col w-1/3 py-12">
        <h1 className="mb-12 text-xl"> signIn or sign Up Below </h1>
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="items-center justify-center flex flex-col"
          >
            <button
              className="btn my-4 flex space-x-4"
              onClick={() => signIn(provider.id, { callbackUrl: "/welcome" })} //
            >
              <span className="self-center mx-2 ">
                {provider.name === "Google" ? googleIcon : githubIcon}
              </span>
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
