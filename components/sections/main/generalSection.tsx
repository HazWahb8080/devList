import React from "react";
import useFetch from "../../../utils/hooks/useFetch";
import Image from "next/image";

function GeneralSection({ session }) {
  const { result, loading } = useFetch("user");
  //fetching the user data once and then store it in the global state to access it anywhere
  //so we fetch the data only once.

  const handleName = () => {
    return (
      result.firstName[0].toUpperCase() +
      result.firstName.slice(1) +
      " " +
      result.lastName[0].toUpperCase() +
      result.lastName.slice(1)
    );
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
        <h1> loading...! </h1>
      </div>
    );
  }

  return (
    <div className="w-full items-center justify-between py-6 flex bg-[#FAFBFC] lg:px-12 px-1">
      {/* right */}
      <div className="w-full flex flex-col items-start justify-start">
        <span className="flex w-full items-center justify-between pb-5">
          <h1 className="text-2xl lg:text-4xl text-black ">{handleName()}</h1>
          <button className="btn py-1">Edit profile</button>
        </span>
        <h2> {result.description} </h2>
        <span className="w-2/3 space-x-4 flex items-start justify-start mt-6 pt-6 border-t border-black/10">
          {result.tags.map((tag: string) => (
            <div
              key={tag}
              className="tag bg-black/10 text-black cursor-default"
            >
              {tag}
            </div>
          ))}
        </span>
      </div>
      {/* left__ the Image */}
      <span className=" w-1/3 items-center justify-end flex">
        <Image
          src={session?.user?.image}
          objectFit="contain"
          className="rounded-full"
          height={150}
          width={150}
          alt={session?.user?.name}
        />
      </span>
    </div>
  );
}

export default GeneralSection;
