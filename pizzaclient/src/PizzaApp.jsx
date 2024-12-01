import { useEffect, useState } from "react";
import PizzaList from "./PizzaList";

const term = "Pizza";
const API_URL = "/pizzas";
const headers = {
  "Content-Type": "application/json",
};

function PizzaApp() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizzaData();
  }, []);

  const fetchPizzaData = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const handleCreate = (item) => {
    console.log(`add item: ${JSON.stringify(item)}`);

    fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: item.name, description: item.description }),
    })
      .then((response) => response.json())
      .then((returnedItem) => setData([...data, returnedItem]))
      .catch((error) => setError(error));
  };

  const handleUpdate = (updatedItem) => {
    fetch(`${API_URL}/${updatedItem.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedItem),
    })
      .then(() =>
        setData(
          data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        )
      )
      .catch((error) => setError(error));
  };

  const handleDelete = (id) => {
    console.log(`${API_URL}/${id}`, id);
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(() => setData(data.filter((item) => item.id != id)))
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      <PizzaList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default PizzaApp;
