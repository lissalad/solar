import { useEffect, useState } from "react";
import Error from "../components/Error";
import PostCard from "../components/PostCard";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../utils/auth";

export default function Home() {
  // const { user, signOut } = useAuth();
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

  // if (!user) {
  //   return <p className="p-12 text-white">welcome</p>;
  // }

  return (
    <main>
      {fetchError && <Error error={fetchError} />}
      {posts && (
        <div className="flex flex-row justify-center flex-wrap">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
