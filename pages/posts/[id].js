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
import EllipsisIcon from "../../components/icons/EllipsisIcon";

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

  function getDate() {
    if (date) {
      return (
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
      );
    }
  }

  function getLocation() {
    <div className="flex flex-row space-x-1 items-center">
      <MapPinIcon />
      <p>{post.where}</p>
    </div>;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <main>
      {post ? (
        <div
          className={classNames(
            "w-full flex bg-black/40 mx-4 flex-col rounded-lg relative justify",
            "md:max-w-[800px] md:mt-10"
          )}
        >
          <div className="md:flex md:flex-row mr-auto">
            {/* image */}
            <img
              className={classNames(
                "max-h-[30vh] mx-auto w-fit",
                "md:max-h-[550px] md:max-w-[500px] rounded-l-lg"
              )}
              src={`${STORAGE_URL}${post.imgSrc}`}
            />
            {/* details */}
            <div className=" flex flex-col mx-5 my-4 space-y-6 h-full">
              {/* title */}
              <h1 className={classNames("text-4xl")}>{post.title}</h1>
              {/* caption */}
              <div className={classNames("flex flex-col space-y-2")}>
                <p
                  className={classNames(
                    "bg-rose-800/50 px-2 py-.5 rounded-lg text-rose-200 h-fit w-fit font-bold"
                  )}
                >
                  user
                </p>
                <p className="text-left w-full text-neutral-400">
                  {post.caption}
                </p>
              </div>
            </div>
            {/* buttons */}
            <div className="absolute right-3 bottom-3">
              {/* <div className="p-3 w-fit bg-black/30 rounded-lg">
                  <EllipsisIcon />
                </div> */}
              <div className={classNames("md:flex md:flex-row md:space-x-3")}>
                <a
                  href={"/posts/edit/" + post.id}
                  className="w-fit p-3 bg-black/30 rounded-lg icon"
                >
                  <PenIcon />
                </a>
                <button
                  onClick={handleDelete}
                  className="w-fit p-3 bg-black/30 rounded-lg icon"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Post;
