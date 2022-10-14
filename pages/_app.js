import Header from "../components/Header";
// import { AuthProvider } from "../utils/auth";
import { supabase } from "../utils/supabaseClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // const [session, setSession] = useState(null);
  // const [user, setUser] = useState(null);

  // supabase.auth.getSession().then(({ data: { session }, error }) => {
  //   setSession(session);
  // });

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
