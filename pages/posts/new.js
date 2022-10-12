import { useRouter } from "next/router";
import { useState } from "react";
import Error from "../../components/Error";
import { supabase } from "../../utils/supabaseClient";

export default function Create() {
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all fields completed
    if (!title || !caption || !selectedFile) {
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
      .insert([{ title, caption, imgSrc: filePath }])
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
      <form onSubmit={handleSubmit}>
        {/* image upload */}
        <div className="w-full">
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

        {/* button */}
        <button>Post</button>

        {/* error message */}
        {formError && <Error error={formError} />}
      </form>
    </main>
  );
}
