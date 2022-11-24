import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="w-full flex flex-row p-2 bg-teal-700/80 fixed items-center backdrop-blur z-20 text-white">
        <Link href="/">
          <h1 className="text-2xl">lissa&apos;s template</h1>
        </Link>
      </div>
    </>
  );
}
