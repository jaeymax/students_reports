import { useState } from "react";
import { useStudent } from "../context/StudentContext.tsx";
import AddStudentModal from "./AddStudentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { CiTrash, CiEdit, CiCircleCheck, CiWarning } from "react-icons/ci";

const StudentList = () => {
  const {
    students,
    setStudents,
    selectedStudent,
    setSelectedStudent,
    addStudent,
  } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  interface Student {
    id: number;
    name: string;
  }
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const handleAddStudent = (studentName: string) => {
    addStudent(studentName);
    setIsModalOpen(false);
  };

  const handleEditStudent = (studentName: string) => {
    setStudents(
      students.map((student) =>
        student.id === editingStudent?.id
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

  const handleDeleteAllConfirm = () => {
    setStudents([]);
    setIsDeleteAllModalOpen(false);
    setSelectedStudent(null);
  };

  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
  };

  const isReportComplete = (student: any) => {
    return student.scores.every(
      (score: any) =>
        score.classScore !== "" &&
        score.examScore !== "" &&
        !isNaN(score.classScore) &&
        !isNaN(score.examScore)
    );
  };

  return (
    <div className="md:w-64 w-full flex-1 md:h-screen md:border-l border-t md:border-t-0 border-gray-200 bg-white">
      <div className="flex justify-between items-center p-4 sticky top-0 bg-white border-b">
        <h2 className="text-lg font-semibold md:hidden">Student List</h2>
        <h2 className="text-lg font-semibold hidden md:block">Students</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingStudent(null);
              setIsModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            Add Student
          </button>
          <button
            onClick={() => setIsDeleteAllModalOpen(true)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Delete All Students
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
            <div className="flex items-center gap-2">
              <span className="font-medium">{student.name}</span>
              {isReportComplete(student) ? (
                <CiCircleCheck
                  className="text-green-500 text-xl"
                  title="Report Complete"
                />
              ) : (
                <CiWarning
                  className="text-red-500 text-xl"
                  title="Report Incomplete"
                />
              )}
            </div>
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
        studentName={deletingStudent?.name ?? ""}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={handleDeleteAllConfirm}
        studentName="all students"
      />
    </div>
  );
};

export default StudentList;
