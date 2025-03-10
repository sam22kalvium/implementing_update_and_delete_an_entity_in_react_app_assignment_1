import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [itemId, setItemId] = useState(null);

  // Fetch the first door's ID when the component mounts
  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setItemId(data[0].id); // Use the first item's ID
        }
      })
      .catch((error) => console.error("Error fetching doors:", error));
  }, []);

  return (
    <div>
      <h1>Update Door</h1>
      {itemId ? <UpdateItem itemId={itemId} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
