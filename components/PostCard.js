import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

export default function PostCard({ post, onDelete }) {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const [isLoading, setLoading] = useState(true);
  return (
    <a href={"/posts/" + post.id} className="">
      <div
        className={classNames(
          "rounded overflow-hidden",
          "md:group",
          "transition-all hover:brightness-75"
        )}
      >
        <img
          className="w-80 h-80 object-cover"
          src={`${STORAGE_URL}${post.imgSrc}`}
          alt=""
        />
      </div>
    </a>
  );
}
