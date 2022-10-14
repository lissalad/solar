import classNames from "classnames";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { AuthProvider } from "../utils/auth";
import { useAuth } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setIsError(true);
    }
  };

  if (loading) {
    return (
      <main>
        <p>Check your email</p>
      </main>
    );
  }

  return (
    <main>
      {isError && <p>Please try again</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </main>
  );
}
