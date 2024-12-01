import { useState } from "react";
import { FaBars, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import PizzaDialog from "./PizzaDialog";

function PizzaList({ name, data, onCreate, onDelete, onUpdate, error }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [showDialog, setShowDialog] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      onUpdate(formData);
      setEditingId(null);
    } else {
      onCreate(formData);
    }
    setFormData({
      id: "",
      name: "",
      description: "",
    });
    setShowDialog(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
    setShowDialog(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      id: "",
      name: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{name} List</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDialog(true)}
            className="bg-blue-600 text-white p-2 rounded flex items-center"
          >
            <span className="flex gap-2 items-center justify-between">
              <FaPlus />
            </span>
          </button>
          <button className="text-white">
            <FaBars size={24} />
          </button>
        </div>
      </header>

      <main className="mt-4">
        <div className="bg-white p-4 rounded shadow-md">
          <PizzaDialog
            show={showDialog}
            onClose={() => {
              setShowDialog(false);
              setEditingId(null);
            }}
            handleSubmit={handleSubmit}
            name={formData.name}
            setName={handleFormChange}
            description={formData.description}
            editingId={editingId}
            setDescription={handleFormChange}
          />

          <div>{error && <div>{error.message}</div>}</div>

          <ul className="mt-4 h-[60vh] overflow-y-auto bg-white p-4 rounded shadow-md scrollbar-visible">
            {data.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default PizzaList;
