import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setResources(data);
    }
  }

  return (
    <div>
      <h1>Resources</h1>

      {resources.map((resource) => (
        <div
          key={resource.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <a
            href={resource.link}
            target="_blank"
            rel="noreferrer"
          >
            Visit Resource
          </a>
        </div>
      ))}
    </div>
  );
}

export default Resources;