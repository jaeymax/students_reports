import React from "react";

const PDFPreviewModal = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  console.log(report);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full h-full md:w-4/5 md:h-5/6 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Report Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="preview-content">
            
            {/* <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left">Subject</th>
                  <th className="px-6 py-3 border-b text-left">Class Score</th>
                  <th className="px-6 py-3 border-b text-left">Exam Score</th>
                  <th className="px-6 py-3 border-b text-left">Total</th>
                  <th className="px-6 py-3 border-b text-left">Grade</th>
                  <th className="px-6 py-3 border-b text-left">Position</th>
                  <th className="px-6 py-3 border-b text-left">Remark</th>
                </tr>
              </thead>
              <tbody>
                {report.scores.map((score, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{score.subject}</td>
                    <td className="px-6 py-4">{score.classScore}</td>
                    <td className="px-6 py-4">{score.examScore}</td>
                    <td className="px-6 py-4">{score.total}</td>
                    <td className="px-6 py-4">{score.grade}</td>
                    <td className="px-6 py-4">{score.position}</td>
                    <td className="px-6 py-4">{score.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
             <div className="w-full py-4 px-16 bg-blue-300">
      <div>
        <div  className="flex">
          <div className="left w-[150px] h-[100px]" >

          </div>
          <div className="right borde flex-1 text-center space-y-2">
              <h1 className="text-2xl font-bold" >BRILLIANT KIDS EDUCATIONAL INSTITUTE</h1>
              <p className="italic font-medium" >Motto: Firm foundation & sound teaching our priority</p>
              <h6 className="underline font-bold">BASIC SIX TO JHS TERMINAL REPORT</h6>
              <h6 className="underline font-bold" >TERM: ONE</h6>
              <div className="flex gap-5" >
                <p>VACATION DATE: <span className="font-bold" >20<sup>TH</sup> DEC, 2024</span></p>
                <p>RE-OPENING DATE: <span className="font-bold" >6<sup>TH</sup> JAN, 2025</span></p>
              </div>
          </div>
        
        </div>
        <div className="mt-10 font-bold" >
          <label htmlFor="name">NAME:</label>
          <input value={report.name} readOnly type="text" name="name" id="name" className="bg-transparent font-normal ml-3 outline-0 border-b border-black border-dashed mb-1 w-3/4" />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse">
            <thead >
              <tr>
                <th className="border w-[150px] uppercase font-normal border-black p-2 text-left">
                  <span className="hidden md:inline">Subjects</span>
                  <span className="md:hidden">Subj.</span>
                </th>
                <th className="border w-[40px] uppercase font-normal border-black p-2 text-left">
                  <span className="hidden md:inline">Class Score (50%)</span>
                  <span className="md:hidden">Class</span>
                </th>
                <th className="border w-[60px] uppercase font-normal border-black p-2 text-left">
                  <span className="hidden md:inline">Exam Score (50%)</span>
                  <span className="md:hidden">Exam</span>
                </th>
                <th className="border w-[60px] uppercase font-normal border-black p-2 text-left">
                  <span className="hidden md:inline">Total (100%)</span>
                  <span className="md:hidden">Total</span>
                </th>
                <th className="border w-[60px] uppercase font-normal border-black p-2 text-left">Grades</th>
                <th className="border w-[60px] uppercase font-normal border-black p-2 hidden md:table-cell">
                  Position
                </th>
                <th className="border w-[60px] uppercase font-normal border-black p-2 hidden md:table-cell">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {
                report.scores.map((score, index)=>(
                <tr key={index}>
                  <td className="border border-black p-2">
                    <span className="hidden md:inline">{score.subject}</span>
                    <span className="md:hidden">
                      {score.subject.slice(0, 5)}.
                    </span>
                  </td>
                  <td className="border border-black p-2">
                    {score.classScore}
                  </td>
                  <td className="border border-black p-2">
                    {score.examScore}
                  </td>
                  <td className="border border-black p-2">{score.total}</td>
                  <td className="border border-black p-2">{score.grade}</td>
                  <td className="border border-black p-2 hidden md:table-cell">
                    {score.position}
                  </td>
                  <td className="border border-black p-2 hidden md:table-cell">
                    {score.remark}
                  </td>
                </tr>
                ))
              }
          
            </tbody>
          </table>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
