import classNames from "classnames";
import BarsIcon from "./icons/BarsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import UploadIcon from "./icons/UploadIcon";
import Link from "next/link";
import { useState } from "react";
import HomeIcon from "./icons/HomeIcon";

export default function MobileNav({ active }) {
  const navItem =
    "flex flex-row w-full text-lg items-center justify-between px-4 py-4 focus:bg-yellow-600/90";

  return (
    <>
      <div
        className={
          active
            ? "fixed bottom-0 right-0 transition-all bg-yellow-600/80 w-[230px] flex flex-col backdrop-blur h-full flex flex-col justify-end"
            : "hidden"
        }
      >
        <Link passHref href="/posts/new">
          <a className={navItem}>
            <UploadIcon />
            <p>Upload</p>
          </a>
        </Link>
        <Link passHref href="/profile">
          <a className={navItem}>
            <ProfileIcon />
            <p>Profile</p>
          </a>
        </Link>
        <Link passHref href="/">
          <a className={navItem}>
            <HomeIcon />
            <p>Home</p>
          </a>
        </Link>
      </div>
    </>
  );
}
