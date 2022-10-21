import React from "react";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";

function Header({ session }) {
  return (
    <header className="w-full py-2 px-4 items-start justify-between flex sticky top-0 shadow-sm shadow-gray-100">
      <Image
        src="/devList.png"
        width={100}
        height={50}
        alt="logo"
        objectFit="contain"
      />
      <div className="w-full items-center justify-end flex ">
      <span className="bg-gray-100 rounded-full p-2 items-center justify-center flex mx-4">
          <BellIcon className="icon" />
        </span>
        <Image
          src={session ? session?.user?.image : "/devList.png"}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          objectFit="contain"
          alt={session?.user?.name}
        />
      </div>
    </header>
  );
}

export default Header;
