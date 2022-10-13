import Link from "next/link";
import BarsIcon from "./icons/BarsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import UploadIcon from "./icons/UploadIcon";

export default function Header() {
  return (
    <div className="w-full flex flex-row justify-between py-2 bg-rose-800/80 backdrop-blur fixed items-center content z-20">
      <div className="flex flex-row items-center space-x-2">
        <img src="/sun.png" width="40" height="40" />
        <Link href="/">
          <h1 className="text-3xl">solar</h1>
        </Link>
      </div>

      {/* desktop nav */}
      <div className="md:flex flex-row space-x-5 items-center hidden">
        <Link passHref href="/posts/new">
          <a>
            <UploadIcon />
          </a>
        </Link>
        <Link passHref href="/profile">
          <a>
            <ProfileIcon />
          </a>
        </Link>
      </div>

      {/* mobile nav */}
      <div className="md:hidden">
        <BarsIcon />
      </div>
    </div>
  );
}
