import { createContext, useState, useContext, useEffect } from "react";
import { subjectsByClass } from "../utils/constants";
import { calculatePositions } from "../utils/calculations";

// Export the context
interface StudentContextType {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  selectedStudent: any;
  setSelectedStudent: React.Dispatch<React.SetStateAction<any>>;
  selectedClass: "BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | "";
  setSelectedClass: React.Dispatch<React.SetStateAction<"BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | "">>;
  addStudent: (name: string) => void;
  updateStudentScores: (studentId: number, newScores: any[]) => void;
  saveToLocalStorage: () => void;
}

export const StudentContext = createContext<StudentContextType>({} as StudentContextType);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [selectedStudent, setSelectedStudent] = useState<NewStudent | null>(null);
  const [selectedClass, setSelectedClass] = useState<"BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | "">("");

  const getSubjectsForClass = (className: "BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | "") => {
    if (className === "") return subjectsByClass.default;
    return subjectsByClass[className as keyof typeof subjectsByClass] || subjectsByClass.default;
  };

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0]);
    }
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const updatePositions = () => {
    interface Score {
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
      scores: Score[];
    }

    setStudents((currentStudents: Student[]) => {
      const updatedStudents = currentStudents.map((student: Student) => ({
        ...student,
        scores: student.scores.map((score: Score, index: number) => ({
          ...score,
          position:
            calculatePositions(
              currentStudents.map(s => ({ ...s, id: String(s.id) })),
              index
            ).get(String(student.id)) || "1st",
        })),
      }));

      if (selectedStudent) {
        const updatedSelected = updatedStudents.find(
          (s: Student) => s.id === selectedStudent.id
        );
        if (updatedSelected) {
          setSelectedStudent(updatedSelected);
        }
      }

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
      scores: subjects.map((subject: string): Subject => ({
        subject,
        classScore: "",
        examScore: "",
        total: 0,
        grade: "",
        position: "",
        remark: "",
      })),
    };

    setStudents((prevStudents: NewStudent[]): NewStudent[] => [newStudent, ...prevStudents]);

    setSelectedStudent(newStudent);
    console.log("Selected student:", selectedStudent);

    setTimeout((): void => updatePositions(), 0);
  };

  const updateStudentScores = (studentId: number, newScores: Subject[]): void => {
    setStudents((prevStudents: NewStudent[]): NewStudent[] => {
      const updatedStudents = prevStudents.map((student: NewStudent): NewStudent =>
        student.id === studentId ? { ...student, scores: newScores } : student
      );

      if (selectedStudent?.id === studentId) {
        const updatedStudent = updatedStudents.find((s: NewStudent): boolean => s.id === studentId);
        setSelectedStudent(updatedStudent || null);
      }

      return updatedStudents;
    });

    setTimeout((): void => updatePositions(), 0);
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
