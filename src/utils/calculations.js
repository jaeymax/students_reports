export const calculateTotal = (classScore, examScore) => {
  return classScore + examScore;
};

export const calculateGrade = (total) => {
  if (total >= 80) return "1";
  if (total >= 75) return "2";
  if (total >= 70) return "3";
  if (total >= 65) return "4";
  if (total >= 60) return "5";
  if (total >= 50) return "6";
  if (total >= 40) return "7";
  if (total >= 30) return "8";
  return "9";
};

export const getRemarkFromGrade = (grade) => {
  const remarks = {
    1: "Excellent",
    2: "Very Good",
    3: "Good",
    4: "Credit",
    5: "Pass",
    6: "Pass",
    7: "Pass",
    8: "Pass",
    9: "Fail",
  };
  return remarks[grade] || "";
};
