import Link from "next/link";
import BarsIcon from "./icons/BarsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import UploadIcon from "./icons/UploadIcon";
import MobileNav from "./MobileNav";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between py-2 bg-zinc-700/80 backdrop-blur fixed items-center content z-20">
        <div className="flex flex-row items-center space-x-2">
          <img src="/sun.png" width="40" height="40" />
          <Link href="/">
            <h1 className="text-3xl">solar</h1>
          </Link>
        </div>

        {/* desktop nav */}
        <div className="md:flex flex-row space-x-5 items-center hidden">
          <Link passHref href="/posts/new">
            <a className="icon">
              <UploadIcon />
            </a>
          </Link>
          <Link passHref href="/profile">
            <a className="icon">
              <ProfileIcon />
            </a>
          </Link>
        </div>

        <div className="md:hidden">
          {/* bars */}
          <div onClick={handleClick}>
            <BarsIcon />
          </div>
        </div>
      </div>
      <MobileNav active={active} />
    </>
  );
}
