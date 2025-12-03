import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportTable from "./components/ReportTable";
import StudentSidebar from "./components/StudentSidebar";
import { StudentProvider } from "./context/StudentContext";
import IntroPage from "./components/IntroPage";

function AppContent({ selectedClass }: { selectedClass: string }) {

  
  console.log("Selected class:", selectedClass);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1">
        <div className="container p-4">
          <div className="flex justify-between items-center mb-4">
            {/* <h1 className="text-2xl font-bold text-center">Student Report Generator</h1> */}
            {/* <div className="text-gray-600">Class: {selectedClass}</div> */}
          </div>
          <Routes>
            <Route path="/" element={<ReportTable />} />
          </Routes>
        </div>
      </div>
      <StudentSidebar />
    </div>
  );
}

function App() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <StudentProvider>
      {!selectedClass ? (
        <IntroPage onClassSelect={setSelectedClass} />
      ) : (
        <Router>
          <AppContent selectedClass={selectedClass} />
        </Router>
      )}
    </StudentProvider>
  );
}

export default App;
