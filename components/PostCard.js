import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

export default function PostCard({ post }) {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const [isLoading, setLoading] = useState(true);
  return (
    <a
      href={"/posts/" + post.id}
      className={classNames(
        "w-40 h-fit grow transition-all m-1",
        "md:w-64 md:max-w-[700px] max-h-[500px] md:group",
        "hover:brightness-75"
      )}
    >
      <div className="">
        <img
          src={`${STORAGE_URL}${post.imgSrc}`}
          // layout="fill"
          // objectFit="cover"
          alt=""
        ></img>
      </div>
    </a>
  );
}
