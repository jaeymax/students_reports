import React, { useState } from "react";
import { useStudent } from "../context/StudentContext";
import AddStudentModal from "./AddStudentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

const StudentList = () => {
  const {
    students,
    setStudents,
    selectedStudent,
    setSelectedStudent,
    addStudent,
    saveToLocalStorage,
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
      setSelectedStudent(null);
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
    <div className="md:w-64 w-full flex-1 md:h-screen md:border-l border-t md:border-t-0 border-gray-200 bg-white">
      <div className="flex justify-between items-center p-4 sticky top-0 bg-white border-b">
        <h2 className="text-lg font-semibold md:hidden">Student List</h2>
        <h2 className="text-lg font-semibold hidden md:block">Students</h2>
        <div className="flex gap-2">
          {/* <button
            onClick={saveToLocalStorage}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          >
            Save
          </button> */}
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
      </div>

      <div className="md:space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 p-4">
        {students.map((student) => (
          <div
            key={student.id}
            className={`flex items-center justify-between p-3 rounded-md cursor-pointer border
              ${
                selectedStudent?.id === student.id
                  ? "bg-blue-50 border-blue-200"
                  : "hover:bg-gray-50 border-gray-100"
              }`}
            onClick={() => handleStudentClick(student)}
          >
            <span className="font-medium">{student.name}</span>
            <div className="flex space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(student);
                }}
                className="text-blue-500 hover:text-blue-700 text-xl"
              >
                <CiEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeletingStudent(student);
                }}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <CiTrash />
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

export default StudentList;
