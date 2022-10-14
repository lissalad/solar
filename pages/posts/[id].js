import { data } from "autoprefixer";
import { useRouter } from "next/router";
import Image from "next/image";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import PenIcon from "../../components/icons/PenIcon";

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

      // formatDate(data.createdAt);
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
            "flex flex-col bg-zinc-900/50 items-center",
            "md:flex-row md:items-end md:p-4 md:rounded-sm"
          )}
        >
          {/* image */}
          <img
            className={classNames("max-h-[60vh] w-fit", "md:max-w-[400px]")}
            src={`${STORAGE_URL}${post.imgSrc}`}
          />

          {/* text */}
          <div
            className={classNames(
              "flex flex-col w-full",
              "md:w-[500px] md:space-y-5 md:px-7"
            )}
          >
            {/* post title */}
            <h1 className="text-2xl my-1.5 text-center">{post.title}</h1>

            {/* details */}
            <div className={classNames("secondary my-2 mx-7", "md:space-y-2")}>
              <p className="text-left">{post.caption}</p>

              {/* more */}
              <div className={classNames("my-3")}>
                <p>posted at {post.createdAt}</p>
                <p>{post.when}</p>
                <p>{post.where}</p>
              </div>
            </div>
          </div>

          {/* edit button */}
          <a
            href={"/posts/edit/" + post.id}
            className="fixed bottom-3 right-3 p-3 bg-black/30 rounded-lg"
          >
            <PenIcon />
          </a>
        </div>
      ) : (
        // loading
        <></>
      )}
    </main>
  );
};

export default Post;
