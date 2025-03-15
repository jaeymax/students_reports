import { useStudent } from "../context/StudentContext";

const PdfTemplate = () => {
  const { selectedStudent, handleScoreChange } = useStudent();

  return (
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
          <input value={selectedStudent?.name} type="text" name="name" id="name" className="bg-transparent font-normal ml-3 outline-0 border-b border-black border-dashed mb-1 w-3/4" />
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
              {selectedStudent?.scores.map((score, index) => (
                <tr key={score.subject}>
                  <td className="border border-black p-2">
                    <span className="hidden md:inline">{score.subject}</span>
                    <span className="md:hidden">
                      {score.subject.slice(0, 5)}.
                    </span>
                  </td>
                  <td className="border border-black p-2">
                    {/* <input
                      type="number"
                      min="0"
                      max="50"
                      value={score.classScore}
                      onChange={(e) =>
                        handleScoreChange(index, "classScore", e.target.value)
                      }
                      className="w-16 md:w-20 p-1 border border-black"
                    /> */}
                  </td>
                  <td className="border border-black p-2">
                    {/* <input
                      type="number"
                      min="0"
                      max="50"
                      value={score.examScore}
                      onChange={(e) =>
                        handleScoreChange(index, "examScore", e.target.value)
                      }
                      className="w-16 md:w-20 p-1 border border-black"
                    /> */}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PdfTemplate;
