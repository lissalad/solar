import Link from "next/link";

const STORAGE_URL =
  "https://qmcbxcwpoatpgxurtrgf.supabase.co/storage/v1/object/public/images/";

export default function PostCard({ post }) {
  return (
    <div className="bg-rose-500/60 shadow-xl text-white flex flex-col px-4 py-2 rounded space-y-2 w-full">
      <img src={`${STORAGE_URL}${post.imgSrc}`} />
      <p className="text-2xl">{post.title}</p>
      <p className="text-md text-rose-100">{post.content}</p>
      <div>
        <Link href={"/posts/" + post.id}>edit</Link>
      </div>
    </div>
  );
}
