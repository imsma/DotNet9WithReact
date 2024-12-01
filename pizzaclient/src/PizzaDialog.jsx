import { FaEdit, FaPlus } from "react-icons/fa";

const PizzaDialog = ({
  show,
  onClose,
  handleSubmit,
  name,
  setName,
  description,
  editingId,
  setDescription,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit" : "Add"} Pizza
        </h2>
        <div className="flex flex-col space-y-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={setName}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={setDescription}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white p-2 rounded flex items-center"
          >
            {editingId ? (
              <span className="flex gap-2 items-center justify-between">
                <FaEdit /> Update
              </span>
            ) : (
              <span className="flex gap-2 items-center justify-between">
                <FaPlus /> Add
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDialog;
