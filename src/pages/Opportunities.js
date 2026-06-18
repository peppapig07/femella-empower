import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*");

    console.log("ERROR MESSAGE:", error?.message);
console.log("ERROR CODE:", error?.code);
console.log("FULL ERROR:", error);

    if (!error) {
      setOpportunities(data);
    }
  }
  async function bookmarkOpportunity(opportunityId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("USER:", user);

  if (!user) {
    alert("Please login first.");
    return;
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({
      user_id: user.id,
      opportunity_id: opportunityId,
    });

  if (error) {
    alert(error.message);
  } else {
    alert("Bookmark saved!");
  }
}

  return (
    <div>
      <h1>Opportunities</h1>
       <input
      type="text"
      placeholder=" Search opportunities..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

      {opportunities
  .filter((opportunity) =>
    opportunity.title
      .toLowerCase()
      .includes(search.toLowerCase())
  ).map((opportunity) => (
        <div key={opportunity.id}>
          <h3>{opportunity.title}</h3>
          <p>{opportunity.description}</p>
          <p>Category: {opportunity.category}</p>

          <a
            href={opportunity.link}
            target="_blank"
            rel="noreferrer"
          >
            Apply Here
          </a>


<br />
<br />

<button
  onClick={() => bookmarkOpportunity(opportunity.id)}
>
  ❤️ Save
</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Opportunities;