import React, { createContext, useState, useContext, useEffect } from "react";
import { subjectsByClass } from "../utils/constants";
import { calculatePositions } from "../utils/calculations";

// Export the context
export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const getSubjectsForClass = (className) => {
    return subjectsByClass[className] || subjectsByClass.default;
  };

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0]);
    }
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const updatePositions = () => {
    setStudents((currentStudents) => {
      const updatedStudents = currentStudents.map((student) => ({
        ...student,
        scores: student.scores.map((score, index) => ({
          ...score,
          position:
            calculatePositions(currentStudents, index).get(student.id) || "1st",
        })),
      }));

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
    const subjects = getSubjectsForClass(selectedClass);
    const newStudent = {
      id: Date.now(),
      name,
      class: selectedClass,
      classTeacherRemarks: "Satisfactory",
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

    setStudents((prevStudents) => [newStudent,...prevStudents]);

    setSelectedStudent(newStudent);
    console.log("Selected student:", selectedStudent);
    

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

    setTimeout(() => updatePositions(), 0);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        selectedStudent,
        setSelectedStudent,
        selectedClass,
        setSelectedClass,
        addStudent,
        updateStudentScores,
        saveToLocalStorage,
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
