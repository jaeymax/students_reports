import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportTable from "./components/ReportTable";
import StudentSidebar from "./components/StudentSidebar";
import { StudentProvider } from "./context/StudentContext";

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="flex">
          <div className="flex-1">
            <div className="container p-4">
              <h1 className="text-2xl font-bold mb-4">
                Student Report Generator
              </h1>
              <Routes>
                <Route path="/" element={<ReportTable />} />
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
