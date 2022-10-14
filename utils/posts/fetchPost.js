import { supabase } from "../supabaseClient";

export default async function fetchPost(id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  return { post, error };
}
