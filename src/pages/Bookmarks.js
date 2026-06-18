import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);
async function removeBookmark(id) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    fetchBookmarks();
  }
}

  async function fetchBookmarks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
console.log("USER:", user);
    if (!user) {
      alert("Please login first.");
      return;
    }

    const { data, error } = await supabase
  .from("bookmarks")
  .select(`
    *,
    opportunities(*)
  `);
      console.log("BOOKMARK DATA:", data);
console.log("BOOKMARK ERROR:", error);

    if (error) {
      console.log(error);
    } else {
      setBookmarks(data);
    }
  }

  return (
    <div>
      <h1>❤️ My Bookmarks</h1>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>{bookmark.opportunities.title}</h3>

          <p>
            {bookmark.opportunities.description}
          </p>

          <p>
            Category:
            {" "}
            {bookmark.opportunities.category}
          </p>

          <a
            href={bookmark.opportunities.link}
            target="_blank"
            rel="noreferrer"
          >
            Apply Here
          </a>
            <br />
    <br />

    <button
      onClick={() =>
        removeBookmark(bookmark.id)
      }
    >
      🗑 Remove Bookmark
    </button>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks;