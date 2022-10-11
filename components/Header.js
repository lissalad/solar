import Link from "next/link";
import BarsIcon from "../public/icons/BarsIcon";
import ProfileIcon from "../public/icons/ProfileIcon";
import UploadIcon from "../public/icons/UploadIcon";
import classNames from "classnames";

export default function Header() {
  return (
    <div className="w-full flex flex-row justify-between py-2 bg-rose-800/80 backdrop-blur fixed items-center content">
      <div className="flex flex-row items-center space-x-2">
        <img src="/sun.png" width="40" height="40"></img>
        <Link href="/">
          <h1 className="text-3xl">solar</h1>
        </Link>
      </div>

      {/* desktop nav */}
      <div className="md:flex flex-row space-x-5 items-center hidden">
          <UploadIcon />
        <Link href="/profile">
          <ProfileIcon />
        </Link>
      </div>

      {/* mobile nav */}
      <div className="md:hidden">
        <BarsIcon />
      </div>
    </div>
  );
}
