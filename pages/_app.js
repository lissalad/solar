import Header from "../components/Header";
import { AuthProvider } from "../utils/auth";
import { supabase } from "../utils/supabaseClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider supabase={supabase}>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
