import { useEffect, useState } from "react";
import Error from "../components/Error";
import PostCard from "../components/PostCard";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select();

      // if failed
      if (error) {
        setFetchError("failure! you are bad");
        setContent(null);
        console.log(error);
      }

      // if good
      if (data) {
        setPosts(data);
        setFetchError(null);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main>
      {fetchError && <Error error={fetchError} />}
      {posts && (
        <div className="@apply flex flex-row flex-wrap mx-auto w-fit">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
