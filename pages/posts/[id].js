import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <p className="text-black">{id}</p>
    </main>
  );
};

export default Post;