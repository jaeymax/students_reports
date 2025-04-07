import React, { useState } from "react";
import IntroPage from "./components/IntroPage";
import ReportTable from "./components/ReportTable";

const App = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  if (!selectedClass) {
    return <IntroPage onClassSelect={setSelectedClass} />;
  }

  return (
    <div>
      {/* Existing app content */}
      <ReportTable />
    </div>
  );
};

export default App;
