import Head from "next/head";
import Image from "next/image";
import PostCard from "../../components/PostCard";
import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Error from "../../components/Error";

export default function Posts() {
  const [fetchError, setFetchError] = useState(null);
  const [Posts, setPosts] = useState(null);

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
      {Posts && (
        <div className="flex flex-col space-y-5">
          {Posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
