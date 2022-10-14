// import { useState, useEffect } from "react";
// import { supabase } from "../utils/supabaseClient";

// export default function Account({ session }) {
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     async function getCurrentUser() {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();

//       if (error) {
//         console.log("no!!");
//         // throw error;
//       }

//       if (!session?.user) {
//         // throw new Error("User not logged in");
//         console.log("not logged in!!");
//       }
//       console.log(session.user);
//       return session.user;
//     }
//   }, [session]);

//   return <div className="form-widget"></div>;
// }
