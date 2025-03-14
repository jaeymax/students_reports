import React, { createContext, useState, useContext } from "react";
import { subjects } from "../utils/constants";
import { calculatePositions } from "../utils/calculations";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const updatePositions = () => {
    setStudents((currentStudents) => {
      if (currentStudents.length <= 1) return currentStudents;

      const updatedStudents = currentStudents.map((student) => ({
        ...student,
        scores: student.scores.map((score, index) => ({
          ...score,
          position:
            calculatePositions(currentStudents, index).get(student.id) || "1st",
        })),
      }));

      // Update selected student if needed
      if (selectedStudent) {
        const updatedSelected = updatedStudents.find(
          (s) => s.id === selectedStudent.id
        );
        setSelectedStudent(updatedSelected);
      }

      return updatedStudents;
    });
  };

  const addStudent = (name) => {
    const newStudent = {
      id: Date.now(),
      name,
      scores: subjects.map((subject) => ({
        subject,
        classScore: "",
        examScore: "",
        total: 0,
        grade: "",
        position: "",
        remark: "",
      })),
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setSelectedStudent(newStudent);

    // Update positions after state is updated
    setTimeout(() => updatePositions(), 0);
  };

  const updateStudentScores = (studentId, newScores) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) =>
        student.id === studentId ? { ...student, scores: newScores } : student
      );

      if (selectedStudent?.id === studentId) {
        const updatedStudent = updatedStudents.find((s) => s.id === studentId);
        setSelectedStudent(updatedStudent);
      }

      return updatedStudents;
    });

    // Recalculate positions after score update
    setTimeout(() => updatePositions(), 0);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        selectedStudent,
        setSelectedStudent,
        addStudent,
        updateStudentScores,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
