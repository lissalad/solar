import EXIF from "exif-js";
import exifr from "exifr";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import PenIcon from "../../components/icons/PenIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import MapPinIcon from "../../components/icons/MapPinIcon";

import fetchPost from "../../utils/posts/fetchPost";
import CalendarIcon from "../../components/icons/CalendarIcon";

const Post = () => {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);

  // fetch post
  useEffect(() => {
    if (id) {
      fetchPost(id).then(({ post, error }) => {
        if (error) {
          router.push("/");
        } else {
          setPost(post);
          setLoading(false);
        }
      });
    }
  }, [id, router]);

  // delete post
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log("deleted");
      router.push("/");
    }
  };

  // exifr.parse(`${STORAGE_URL}${post.imgSrc}`).then((img) => {
  //   const tempPost = post;
  //   tempPost.latitude = img["GPSTimeStamp"];
  //   setPost(tempPost);
  // });

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <main className={classNames("")}>
      <div
        className={classNames(
          "flex flex-col bg-zinc-900/50 items-center my-auto",
          "md:flex-row md:items-end md:p-4 md:rounded-sm"
        )}
      >
        {/* image */}
        <img
          className={classNames("max-h-[50vh] w-fit", "md:max-h-[600px]")}
          src={`${STORAGE_URL}${post.imgSrc}`}
        />

        {/* text */}
        <div
          className={classNames(
            "flex flex-col w-full",
            "md:w-[500px] md:space-y-3 md:mx-2"
          )}
        >
          {/* post title */}
          <h1 className="text-2xl text-center my-2 md:text-left md:my-0 md:ml-7">
            {post.title}
          </h1>

          {/* details */}
          <div className={classNames("secondary my-2 mx-7", "space-y-6")}>
            {/* caption */}
            <div className={classNames("flex flex-row space-x-2")}>
              <p
                className={classNames(
                  "bg-rose-800/60 px-2 py-.5 rounded-lg text-rose-200"
                )}
              >
                user
              </p>
              <p className="text-left">{post.caption}</p>
            </div>

            {/* more */}
            <div
              className={classNames(
                "flex flex-col space-y-4",
                "md:flex-row md:space-y-0 md:space-x-4"
              )}
            >
              {/* <p>
                Posted on{" "}
                {new Date(post.createdAt).toLocaleString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p> */}

              {/* date */}
              <div className="flex flex-row space-x-2 items-center">
                <CalendarIcon />
                <p>
                  {new Date(post.when).toLocaleString("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* location */}
              <div className="flex flex-row space-x-1 items-center">
                <MapPinIcon />
                <p>{post.where}</p>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div
          className={classNames(
            "fixed flex flex-row space-x-3 bottom-3 right-3"
          )}
        >
          <a
            href={"/posts/edit/" + post.id}
            className="p-3 bg-black/30 rounded-lg"
          >
            <PenIcon />
          </a>
          <button onClick={handleDelete} className="p-3 bg-black/30 rounded-lg">
            <TrashIcon />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Post;
