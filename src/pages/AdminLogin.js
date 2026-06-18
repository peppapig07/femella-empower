import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ check login success
    if (data?.user) {
      navigate("/admin");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Admin Login</h1>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login as Admin
      </button>
    </div>
  );
}

export default AdminLogin;