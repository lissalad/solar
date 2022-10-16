import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import Error from "../../components/Error";
import { supabase } from "../../utils/supabaseClient";

export default function New() {
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");

  const [caption, setCaption] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all fields completed
    if (!title || !selectedFile) {
      setFormError("Please complete the form.");
      return;
    }

    // upload image
    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: imgData, error: imgError } = await supabase.storage
      .from("images")
      .upload(filePath, selectedFile);

    // if so, create row
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, caption, imgSrc: filePath, when, where }])
      .select();

    // row failed
    if (error) {
      console.log(error);
      setFormError("Please complete the form.");
    }

    console.log({ data, error });

    // row good!
    if (data) {
      console.log(title, caption);
      console.log(data);
      setFormError(null);

      router.push("/");
    }
  };

  const handleImage = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <main>
      <div
        className={classNames(
          "w-full flex bg-black/40 mx-4 flex-col rounded-b-lg",
          "md:w-[400px] md:mt-10"
        )}
      >
        <h1 className="bg-yellow-400/80 py-2 rounded-t-lg text-center text-neutral-700 font-bold">
          New Post
        </h1>
        <form onSubmit={handleSubmit}>
          {/* image upload */}
          <div className="">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImage}
            />
          </div>

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

          {/* buttons */}
          <div className={classNames("flex flex-row w-full justify-between")}>
            <button className="cancel" href="/">
              Cancel
            </button>
            <button className="post">Post</button>
          </div>

          {/* error message */}
          {formError && <Error error={formError} />}
        </form>
      </div>
    </main>
  );
}
