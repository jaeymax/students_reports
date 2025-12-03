import { useState } from "react";
import { useStudent } from "../context/StudentContext.tsx";
import PDFPreviewModal from "./PDFPreviewModal";
import {
  calculateTotal,
  calculateGrade,
  getRemarkFromGrade,
} from "../utils/calculations.ts";


export const ValidationModal = ({
  isOpen,
  onClose,
  incompleteStudents,
}: {
  isOpen: boolean;
  onClose: () => void;
  incompleteStudents: string[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Incomplete Reports</h3>
        <p className="mb-4 text-gray-600">
          The following students have incomplete reports:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-600">
          {incompleteStudents.map((student) => (
            <li key={student}>{student}</li>
          ))}
        </ul>
        <p className="mb-4 text-gray-600">
          Please complete all reports before downloading.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ReportTable = () => {
  const { selectedStudent, updateStudentScores, students } = useStudent();
  const [showPreview, setShowPreview] = useState(false);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [incompleteStudents, setIncompleteStudents] = useState<string[]>([]);

  // Add validation helper function
  const validateReports = () => {
    const incomplete = students
      .filter(
        (student) =>
          !student.scores.every(
            (score: { classScore: string | number; examScore: string | number; }) =>
              score.classScore !== "" &&
              score.examScore !== "" &&
              !isNaN(Number(score.classScore)) &&
              !isNaN(Number(score.examScore))
          )
      )
      .map((student) => student.name);

    return incomplete;
  };

  // interface Score {
  //   subject: string;
  //   classScore: string;
  //   examScore: string;
  //   total: number;
  //   grade: string;
  //   position: string;
  //   remark: string;
  // }

  interface ScoreField {
    field: "classScore" | "examScore";
  }

  const handleScoreChange = (
    index: number,
    field: ScoreField["field"],
    value: string
  ): void => {
    if (!selectedStudent) return;

    const newScores = [...selectedStudent.scores];
    newScores[index][field] = value;

    if (newScores[index].classScore && newScores[index].examScore) {
      const total = calculateTotal(
        parseFloat(newScores[index].classScore),
        parseFloat(newScores[index].examScore)
      );
      const grade = calculateGrade(total);
      newScores[index].total = total;
      newScores[index].grade = grade;
      newScores[index].remark = getRemarkFromGrade(grade);
    }

    updateStudentScores(selectedStudent.id, newScores);
  };

  if (!selectedStudent) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        Please select a student to view or edit their report
      </div>
    );
  }

  const handlePreview = () => {
    const incomplete = validateReports();

    if (incomplete.length > 0) {
      setIncompleteStudents(incomplete);
      setShowValidationModal(true);
      return;
    }

    setShowPreview(true)
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center gap-2 mb-4 text-gray-600">
        <p>
          {selectedStudent.name} - {selectedStudent.class}
        </p>
        <button
          onClick={handlePreview}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Preview
        </button>
      </div>

      <div>
        <div className="relative overflow-x-auto md:overflow-hidden shadow-sm rounded-lg border border-gray-300">
          {/* Show scroll indicator on mobile */}
          <div className="absolute right-0 top-1/2 md:hidden bg-gradient-to-l from-gray-100 to-transparent w-8 h-8 rounded-full animate-pulse"></div>

          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 md:px-6 py-2 md:py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Subject</span>
                  <span className="md:hidden">Subj.</span>
                </th>
                <th className="px-2 md:px-6 py-2 md:py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Class Score (50%)</span>
                  <span className="md:hidden">Class</span>
                </th>
                <th className="px-2 md:px-6 py-2 md:py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Exam Score (50%)</span>
                  <span className="md:hidden">Exam</span>
                </th>
                <th className="px-2 md:px-6 py-2 md:py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Total (100%)</span>
                  <span className="md:hidden">Total</span>
                </th>
                <th className="px-2 md:px-6 py-2 md:py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="hidde md:table-cell px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="hidde md:table-cell px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedStudent.scores.map((score: any, index: any) => (
                <tr key={score.subject} className="hover:bg-gray-50">
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="hidden md:inline">{score.subject}</span>
                    <span className="md:hidden">
                      {score.subject.slice(0, 5)}.
                    </span>
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={score.classScore}
                      onChange={(e) =>
                        handleScoreChange(index, "classScore", e.target.value)
                      }
                      className="w-16 md:w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={score.examScore}
                      onChange={(e) =>
                        handleScoreChange(index, "examScore", e.target.value)
                      }
                      className="w-16 md:w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                    {score.total}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                    {score.grade}
                  </td>
                  <td className="hidde md:table-cel px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {score.position}
                  </td>
                  <td className="hidde md:table-cel px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {score.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PDFPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        report={{
          name: selectedStudent.name,
          scores: selectedStudent.scores,
          classTeacherRemarks: selectedStudent.classTeacherRemarks,
          class: selectedStudent.class,
        }}
      />
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        incompleteStudents={incompleteStudents}
      />
    </div>
  );
};

export default ReportTable;
