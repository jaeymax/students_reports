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

export const calculatePositions = (students, subjectIndex) => {
  // Get all scores for the specific subject
  const subjectScores = students.map((student) => ({
    id: student.id,
    total: student.scores[subjectIndex].total,
  }));

  // Sort by total score in descending order
  const sortedScores = subjectScores.sort((a, b) => b.total - a.total);

  // Create position mapping
  const positions = new Map();
  let currentPosition = 1;
  let currentScore = -1;
  let samePositionCount = 0;

  sortedScores.forEach((score, index) => {
    if (score.total === currentScore) {
      // Same score gets same position
      samePositionCount++;
    } else {
      currentPosition = index + 1;
      currentScore = score.total;
      samePositionCount = 0;
    }
    positions.set(
      score.id,
      `${currentPosition}${getPositionSuffix(currentPosition)}`
    );
  });

  return positions;
};

const getPositionSuffix = (position) => {
  if (position > 10 && position < 20) return "th";
  const lastDigit = position % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
