import Error from "../../../components/Error";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { supabase } from "../../../utils/supabaseClient";
import PostCard from "../../../components/PostCard";
import fetchPost from "../../../utils/posts/fetchPost";

const Edit = () => {
  const STORAGE_URL =
    "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);

  // update changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please complete the form.");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .update({ title, caption })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError("Please complete the form.");
    }

    console.log(data);
    if (data) {
      setFormError(null);
      router.push("/posts/" + post.id);
    }
  };

  // get post
  useEffect(() => {
    if (id) {
      fetchPost(id).then(({ post, error }) => {
        if (error) {
          router.push("/");
        } else {
          setPost(post);
          setTitle(post.title);
          setCaption(post.caption);
          setLoading(false);
        }
      });
    }
  }, [id, router]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <main>
      {post ? (
        <div
          className={classNames(
            "w-full flex bg-black/40 mx-4 flex-col rounded-b-lg",
            "md:w-[750px] md:mt-10"
          )}
        >
          <h1 className="bg-yellow-400/80 py-2 rounded-t-lg text-center text-neutral-700 font-bold">
            Edit Post
          </h1>
          <div className="md:flex md:flex-row">
            {/* image */}
            <img
              className={classNames(
                "max-h-[30vh] mx-auto w-fit",
                "md:max-h-[450px] rounded-bl-lg"
              )}
              src={`${STORAGE_URL}${post.imgSrc}`}
            />
            {/* form */}
            <form className="md:w-[500px]" onSubmit={handleSubmit}>
              {/* title */}
              <div className="">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* caption */}
              <div className="">
                <label htmlFor="caption">Caption</label>
                <textarea
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              {/* when */}
              <div className="">
                <label htmlFor="when">When</label>
                <input
                  type="date"
                  id="when"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                />
              </div>

              {/* where */}
              <div className="">
                <label htmlFor="where">Where</label>
                <input
                  type="text"
                  id="where"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                />
              </div>

              {/* save */}
              <button className="save">Save</button>

              {/* error message */}
              {formError && <Error error={formError} />}
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Edit;
