import React from "react";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";

function Header({ session }) {
  return (
    <header className="header__container">
      <Image
        src="/devList.png"
        width={100}
        height={50}
        alt="logo"
        objectFit="contain"
      />
      <div className="w-full items-center justify-end flex ">
        <span className="icon__wrapper">
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
