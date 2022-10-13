import { data } from "autoprefixer";
import { useRouter } from "next/router";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const Post = () => {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [date, setDate] = useState();

  // get post
  useEffect(() => {
    // get post by id
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();
      // console.log("hello", { data, error });

      // if bad
      if (error) {
        // console.log("bad");
        router.push("/", { replace: true }); // NOT WORKING
      }

      // if good
      if (data) {
        // console.log("good");
        setPost(data);
      }
    };

    if (id) {
      // console.log(post.createdAt);

      formatDate(post.createdAt);
      fetchPost();
    }
  }, [id, router]);

  function formatDate(timestamp) {
    // const formattedDate = new Date(timestamp);
    setDate(timestamp);
  }

  return (
    <main>
      {/* loaded post */}
      {post ? (
        <div
          className={classNames(
            "flex flex-col bg-zinc-900/50",
            "md:flex-row md:items-end md:p-4 md:rounded-sm"
          )}
        >
          <img
            className={classNames("", "md:max-w-[400px]")}
            src={`${STORAGE_URL}${post.imgSrc}`}
          />
          <div
            className={classNames(
              "flex flex-col text-left w-full space-y-5 px-7 py-2",
              "md:w-[500px]"
            )}
          >
            <h1 className="text-3xl">{post.title}</h1>
            <div className={classNames("secondary space-y-2")}>
              <p className="indent-5">{post.caption}</p>
              <p>posted at {date}</p>
              <p>{post.when}</p>
              <p>{post.where}</p>
            </div>
          </div>
        </div>
      ) : (
        // loading
        <></>
      )}
    </main>
  );
};

export default Post;
