import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Gallery from "../components/Gallery";
import classNames from "classnames";

export default function Account({ session }) {
  // const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);

  // useEffect(() => {
  //   async function getCurrentUser() {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();

  //     if (error) {
  //       console.log("no!!");
  //       // throw error;
  //     }

  //     if (!session?.user) {
  //       // throw new Error("User not logged in");
  //       console.log("not logged in!!");
  //     }
  //     console.log(session.user);
  //     return session.user;
  //   }
  // }, [session]);

  return (
    <main className="">
      <div
        className={classNames(
          "flex flex-row w-[400px] rounded-lg bg-black/70 h-[130px] items-center justify-center my-6 space-x-5"
        )}
      >
        <div className="bg-white/80 w-[80px] h-[80px] rounded-lg"></div>

        <div className="flex flex-col items-left space-y-2">
          <p className="text-xl">Lissa</p>
          <div className="flex flex-row space-x-3 text-neutral-400">
            <p>47 followers</p>
            <p>34 following</p>
          </div>
        </div>
      </div>
      <Gallery />
    </main>
  );
}
