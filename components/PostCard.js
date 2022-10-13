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
        "w-32 h-fit group transition-all m-1",
        "md:w-64 md:max-w-[700px] max-h-[500px]",
        "hover:brightness-75"
      )}
    >
      <div className="rounded-sm bg-gray-200">
        <img
          src={`${STORAGE_URL}${post.imgSrc}`}
          // layout="fill"
          // objectFit="cover"
          alt=""
        ></img>
      </div>
    </a>

    // <Link href={"/posts/" + post.id}>
    //   <div className="shadow-xl text-white h-fit relative transition-all group z-0">
    //     <img
    //       className="group-hover:brightness-75 transition-all"
    //       src={`${STORAGE_URL}${post.imgSrc}`}
    //     />

    //     {/* HELP NOT SYNCHED */}
    //     <div className="absolute w-full bottom-0 py-5 px-5 bg-black/90 invisible transition-all group-hover:visible z-10">
    //       <p className="text-2xl">{post.title}</p>
    //       <p className="text-md">{post.content}</p>
    //     </div>
    //   </div>
    // </Link>
  );
}
