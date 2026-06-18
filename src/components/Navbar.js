import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
<div className="brand">
  <img
    src="/logo.png"
    alt="Femella Logo"
    className="brand-logo"
  />

  <div className="brand-text">
    <h2>Femella Empower</h2>
  </div>
</div>
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      alert("Logged out successfully!");
      window.location.href = "/";
    }
  }

  return (
    <nav
      style={{
        padding: "15px",
        display: "flex",
        gap: "20px",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Link to="/">🏠 Home</Link>

      <Link to="/opportunities">
        💼 Opportunities
      </Link>

      <Link to="/resources">
        📚 Resources
      </Link>

      {user ? (
        <>
          <Link to="/bookmarks">
            ❤️ My Bookmarks
          </Link>

          <button onClick={handleLogout}>
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            👤 Login
          </Link>

          <Link to="/signup">
            📝 Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;