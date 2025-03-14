import React, { useState } from "react";
import { useStudent } from "../context/StudentContext";
import AddStudentModal from "./AddStudentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const StudentSidebar = () => {
  const {
    students,
    setStudents,
    selectedStudent,
    setSelectedStudent,
    addStudent,
  } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const handleAddStudent = (studentName) => {
    addStudent(studentName);
    setIsModalOpen(false);
  };

  const handleEditStudent = (studentName) => {
    setStudents(
      students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, name: studentName }
          : student
      )
    );
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      setStudents(
        students.filter((student) => student.id !== deletingStudent.id)
      );
      setDeletingStudent(null);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="w-64 h-screen bg-white border-l border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Students</h2>
        <button
          onClick={() => {
            setEditingStudent(null);
            setIsModalOpen(true);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          Add Student
        </button>
      </div>

      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className={`flex items-center justify-between p-2 rounded-md group cursor-pointer
              ${
                selectedStudent?.id === student.id
                  ? "bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            onClick={() => handleStudentClick(student)}
          >
            <span>{student.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => openEditModal(student)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletingStudent(student)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        initialValue={editingStudent?.name || ""}
        mode={editingStudent ? "edit" : "add"}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
        studentName={deletingStudent?.name}
      />
    </div>
  );
};

export default StudentSidebar;
