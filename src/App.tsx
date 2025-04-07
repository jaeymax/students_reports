import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportTable from "./components/ReportTable";
import StudentSidebar from "./components/StudentSidebar";
import { StudentProvider } from "./context/StudentContext";
import PdfTemplate from "./components/PdfTemplate";
import IntroPage from "./components/IntroPage";

function App() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  if (!selectedClass) {
    return <IntroPage onClassSelect={setSelectedClass} />;
  }

  return (
    <StudentProvider>
      <Router>
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="flex-1">
            <div className="container p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Student Report Generator</h1>
                <div className="text-gray-600">Class: {selectedClass}</div>
              </div>
              <Routes>
                <Route path="/" element={<ReportTable />} />
                <Route path="/pdf" element={<PdfTemplate />} />
              </Routes>
            </div>
          </div>
          <StudentSidebar />
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
