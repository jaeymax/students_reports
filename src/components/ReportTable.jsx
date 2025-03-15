import React, { useState } from "react";
import { useStudent } from "../context/StudentContext";
import { usePDF } from "react-to-pdf";
import PDFPreviewModal from "./PDFPreviewModal";
import {
  calculateTotal,
  calculateGrade,
  getRemarkFromGrade,
} from "../utils/calculations";

const ReportTable = () => {
  const { selectedStudent, updateStudentScores } = useStudent();
  const [showPreview, setShowPreview] = useState(false);
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: `${selectedStudent?.name}-report.pdf`,
  });

  const handleScoreChange = (index, field, value) => {
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

  

  return (
    <div className="w-full p-4">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Preview
        </button>
        <button
          onClick={() => toPDF()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>

      <div ref={targetRef}>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Student Report Card
        </h1>
        <h2 className="text-xl mb-6 text-center">
          Student: {selectedStudent.name}
        </h2>

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
              {selectedStudent.scores.map((score, index) => (
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
        }}
      />
    </div>
  );
};

export default ReportTable;
