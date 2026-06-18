import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [opportunities, setOpportunities] = useState([]);

  const navigate = useNavigate();

  // 🔐 AUTH CHECK
  useEffect(() => {
  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate("/admin/login");
      return;
    }

    // ONLY ALLOW YOUR ADMIN EMAIL
    if (user.email !== "krishxyz66@gmail.com") {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  checkAdmin();
}, [navigate]);
  
  

  // 📥 FETCH DATA
  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setOpportunities(data);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // ➕ ADD OPPORTUNITY
  const addOpportunity = async () => {
    if (!title || !description) {
      alert("Title and Description required");
      return;
    }

    const { error } = await supabase
      .from("opportunities")
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          link: link.trim(),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setCategory("");
    setLink("");

    fetchOpportunities();
  };

  // 🗑 DELETE OPPORTUNITY
  const handleDelete = async (id) => {
    console.log("Trying to delete ID:", id);

    const { data, error } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", Number(id))
      .select();

    console.log("Deleted rows:", data);
    console.log("Error:", error);

    fetchOpportunities();
  };

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>🛠 Admin Dashboard</h2>

      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>

      <hr />

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br /><br />

      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <br /><br />

      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br /><br />

      <input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
      <br /><br />

      <button onClick={addOpportunity}>➕ Add Opportunity</button>

      <hr />

      <h3>All Opportunities</h3>

      {opportunities.length === 0 && <p>No data found</p>}

      {opportunities.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <small>{item.category}</small>

          <br /><br />

          <button
            onClick={() => handleDelete(item.id)}
            style={{ background: "red", color: "white", padding: "6px 10px", border: "none" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;