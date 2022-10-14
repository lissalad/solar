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
        <>
          <img
            className={classNames(
              "max-h-[30vh] mx-auto w-fit",
              "md:max-w-[400px]"
            )}
            src={`${STORAGE_URL}${post.imgSrc}`}
          />
          <form className="" onSubmit={handleSubmit}>
            <div className="px-3 space-y-5">
              {/* title */}
              <div className="w-full">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* caption */}
              <div className="w-full">
                <label htmlFor="caption">Caption</label>
                <textarea
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>

            <button>Save</button>
            {/* error message */}
            {formError && <Error error={formError} />}
          </form>
          {/* button */}
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Edit;
