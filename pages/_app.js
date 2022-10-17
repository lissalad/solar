import Header from "../components/Header";
import { supabase } from "../utils/supabaseClient";
import "../styles/globals.css";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}>
    <>
      <Header />
      <Component {...pageProps} />
      {/* </Auth> */}
    </>
  );
}

export default MyApp;
