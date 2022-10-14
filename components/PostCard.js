import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

export default function PostCard({ post }) {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const [isLoading, setLoading] = useState(true);
  return (
    <a href={"/posts/" + post.id}>
      <div
        className={classNames(
          " transition-all m-1",
          "md:group",
          "hover:brightness-75"
        )}
      >
        <img
          className="w-60 h-80 object-cover"
          src={`${STORAGE_URL}${post.imgSrc}`}
          // layout="fill"
          // objectFit="cover"
          alt=""
        ></img>
      </div>
    </a>
  );
}
