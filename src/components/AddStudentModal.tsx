import React, { useState, useEffect } from "react";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialValue?: string;
  mode?: 'add' | 'edit';
}

const AddStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue = "",
  mode = "add",
}: AddStudentModalProps) => {
  const [studentName, setStudentName] = useState(initialValue);

  useEffect(() => {
    setStudentName(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (studentName.trim()) {
      onSubmit(studentName);
      setStudentName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          {mode === "add" ? "Add New Student" : "Edit Student"}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-none"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {mode === "add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
