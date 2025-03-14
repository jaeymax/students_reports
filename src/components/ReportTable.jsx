import React, { useState } from "react";
import {
  calculateTotal,
  calculateGrade,
  getRemarkFromGrade,
} from "../utils/calculations";

const subjects = [
  "ENGLISH LANGUAGE",
  "MATHEMATICS",
  "SOCIAL STUDIES",
  "RELIGIOUS AND MORAL",
  "FRENCH",
  "CREATIVE ARTS",
  "GHANAIAN LANGUAGE",
  "CAREER TECHNOLOGY",
];

const ReportTable = () => {
  const [scores, setScores] = useState(
    subjects.map((subject) => ({
      subject,
      classScore: "",
      examScore: "",
      total: 0,
      grade: "",
      position: "",
      remark: "",
    }))
  );
   
  console.log(scores);
  
  const handleScoreChange = (index, field, value) => {
    const newScores = [...scores];
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

    setScores(newScores);
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class Score (50%)
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exam Score (50%)
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total (100%)
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remark
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {scores.map((score, index) => (
            <tr key={score.subject} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {score.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={score.classScore}
                  onChange={(e) =>
                    handleScoreChange(index, "classScore", e.target.value)
                  }
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={score.examScore}
                  onChange={(e) =>
                    handleScoreChange(index, "examScore", e.target.value)
                  }
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {score.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {score.grade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {score.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {score.remark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
