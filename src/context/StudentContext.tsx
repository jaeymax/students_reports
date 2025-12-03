import { createContext, useState, useContext, useEffect } from "react";
import { subjectsByClass } from "../utils/constants.ts";
import { calculatePositions } from "../utils/calculations.ts";
import { mockStudentsByClass } from "../utils/mockStudents";

// Export the context
interface Subject {
  subject: string;
  classScore: string;
  examScore: string;
  total: number;
  grade: string;
  position: string;
  remark: string;
}

interface Student {
  id: number;
  name: string;
  class: string;
  classTeacherRemarks: string;
  scores: Subject[];
}

interface StudentContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  selectedStudent: any;
  setSelectedStudent: React.Dispatch<React.SetStateAction<any>>;
  selectedClass:
    | "BASIC 4"
    | "BASIC 5"
    | "BASIC 6"
    | "BASIC 7"
    | "BASIC 8"
    | "BASIC 9"
    | "";
  setSelectedClass: React.Dispatch<
    React.SetStateAction<
      "BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | ""
    >
  >;
  addStudent: (name: string) => void;
  updateStudentScores: (studentId: number, newScores: any[]) => void;
  saveToLocalStorage: () => void;
}

export const StudentContext = createContext<StudentContextType>(
  {} as StudentContextType
);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [selectedStudent, setSelectedStudent] = useState<NewStudent | null>(
    null
  );
  const [selectedClass, setSelectedClass] = useState<
    "BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | ""
  >("");

  const getSubjectsForClass = (
    className:
      | "BASIC 4"
      | "BASIC 5"
      | "BASIC 6"
      | "BASIC 7"
      | "BASIC 8"
      | "BASIC 9"
      | ""
  ) => {
    if (className === "") return subjectsByClass.default;
    return (
      subjectsByClass[className as keyof typeof subjectsByClass] ||
      subjectsByClass.default
    );
  };

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0]);
    }
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (selectedClass) {
      // Clear existing students and selected student
      //setStudents([]);
      if(students.length > 0)return;
      setSelectedStudent(null);

      // Get mock students for the selected class
      const mockStudents =
        mockStudentsByClass[selectedClass as keyof typeof mockStudentsByClass];

      // Create all students first
      const newStudents = mockStudents.map((name) => {
        const subjects: string[] = getSubjectsForClass(selectedClass);
        return {
          id: Date.now() + Math.random(), // ensure unique IDs
          name,
          class: selectedClass,
          classTeacherRemarks: "Satisfactory",
          scores: subjects.map((subject: string) => ({
            subject,
            classScore: (Math.floor(Math.random() * (49 - 45 + 1)) + 45).toString(),
            examScore: "",
            total: 0,
            grade: "",
            position: "",
            remark: "",
          })),
        };
      });

      // Set all students at once
      setStudents(newStudents);

      // Select only the first student
      if (newStudents.length > 0) {
        setSelectedStudent(newStudents[0]);
      }
    }
  }, [selectedClass]);

  const updatePositions = () => {
    setStudents((currentStudents: Student[]) => {
      // Only calculate positions if there are valid scores
      const updatedStudents = currentStudents.map((student: Student) => ({
        ...student,
        scores: student.scores.map((score: Subject, index: number) => {
          // Only calculate position if both scores are present and valid
          const hasValidScores = currentStudents.some(
            (s) =>
              s.scores[index] &&
              !isNaN(s.scores[index].total) &&
              s.scores[index].total > 0
          );

          if (!hasValidScores) {
            return score;
          }

          const position =
            calculatePositions(
              currentStudents.map((s) => ({ ...s, id: String(s.id) })),
              index
            ).get(String(student.id)) || "-";

          return {
            ...score,
            position,
          };
        }),
      }));

      return updatedStudents;
    });
  };

  interface Subject {
    subject: string;
    classScore: string;
    examScore: string;
    total: number;
    grade: string;
    position: string;
    remark: string;
  }

  interface NewStudent {
    id: number;
    name: string;
    class: string;
    classTeacherRemarks: string;
    scores: Subject[];
  }

  const addStudent = (name: string): void => {
    const subjects: string[] = getSubjectsForClass(selectedClass);
    const newStudent: NewStudent = {
      id: Date.now(),
      name,
      class: selectedClass,
      classTeacherRemarks: "Satisfactory",
      scores: subjects.map(
        (subject: string): Subject => ({
          subject,
          classScore: "",
          examScore: "",
          total: 0,
          grade: "",
          position: "",
          remark: "",
        })
      ),
    };

    setStudents((prevStudents: NewStudent[]): NewStudent[] => [
      newStudent,
      ...prevStudents,
    ]);

    setSelectedStudent(newStudent);
    console.log("new student", newStudent);
    console.log("Selected student:", selectedStudent);

    setTimeout((): void => updatePositions(), 0);
  };

  const updateStudentScores = (
    studentId: number,
    newScores: Subject[]
  ): void => {
    setStudents((prevStudents: NewStudent[]): NewStudent[] => {
      const updatedStudents = prevStudents.map(
        (student: NewStudent): NewStudent =>
          student.id === studentId ? { ...student, scores: newScores } : student
      );

      // Update positions for all students immediately
      const studentsWithUpdatedPositions = updatedStudents.map((student) => ({
        ...student,
        scores: student.scores.map((score, index) => {
          const hasValidScores = updatedStudents.some(
            (s) =>
              s.scores[index] &&
              !isNaN(s.scores[index].total) &&
              s.scores[index].total > 0
          );

          if (!hasValidScores) {
            return score;
          }

          const position =
            calculatePositions(
              updatedStudents.map((s) => ({ ...s, id: String(s.id) })),
              index
            ).get(String(student.id)) || "-";

          return {
            ...score,
            position,
          };
        }),
      }));

      // Update selected student if needed
      if (selectedStudent?.id === studentId) {
        const updatedStudent = studentsWithUpdatedPositions.find(
          (s: NewStudent): boolean => s.id === studentId
        );
        setSelectedStudent(updatedStudent || null);
      }

      return studentsWithUpdatedPositions;
    });

    // Remove the setTimeout since we're handling positions update inline
    // setTimeout((): void => updatePositions(), 0);
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
