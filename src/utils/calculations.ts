// interface ScoreInput {
//   classScore: number;
//   examScore: number;
// }

export const calculateTotal = (
  classScore: number,
  examScore: number
): number => {
  return classScore + examScore;
};

interface GradeRange {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
}

type Grade = keyof GradeRange;

export const calculateGrade = (total: number): Grade => {
  if (total >= 90) return "1";
  if (total >= 80) return "2";
  if (total >= 70) return "3";
  if (total >= 60) return "4";
  if (total >= 50) return "5";
  if (total >= 40) return "6";
  if (total >= 30) return "7";
  if (total >= 20) return "8";
  return "9";
};

interface Remarks {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
}

export const getRemarkFromGrade = (grade: Grade): string => {
  const remarks: Remarks = {
    1: "Excellent",
    2: "Very Good",
    3: "Good",
    4: "High Average",
    5: "Average",
    6: "Low Average",
    7: "Low",
    8: "Lower",
    9: "Lowest",
  };
  return remarks[grade] || "";
};

const CORE_SUBJECTS = [
  "ENGLISH LANGUAGE",
  "INTEGRATED SCIENCE",
  "MATHEMATICS",
  "SOCIAL STUDIES",
];

interface StudentScore {
  id?: string;
  subject?: string;
  total?: number;
}

interface Student {
  scores?: StudentScore[];
}

export const getTotalRawScore = (student: Student): number => {
  if (!student?.scores) return 0;

  return student.scores
    .filter((score) => CORE_SUBJECTS.includes(score.subject || ""))
    .reduce((sum, score) => sum + (score.total || 0), 0);
};

//interface PositionMap extends Map<string, string> {}

export const calculatePositions = (
  students: { id: string; scores: { total: number }[] }[],
  subjectIndex: number
): Map<string, string> => {
  const positions = new Map<string, string>();

  // Filter out students with invalid scores first
  const validScores = students
    .map((student) => ({
      id: student.id,
      total: student.scores[subjectIndex]?.total || 0,
    }))
    .filter((score) => !isNaN(score.total)); // Filter out NaN values

  // Sort by total score in descending order
  const sortedScores = validScores.sort((a, b) => b.total - a.total);

  let currentPosition = 1;
  let currentScore = -1;
  let samePositionCount = 0;

  sortedScores.forEach((score, index) => {
    if (score.total === currentScore) {
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

  // Set position for any remaining students (those with NaN or invalid scores)
  students.forEach((student) => {
    if (!positions.has(student.id)) {
      positions.set(student.id, "-");
    }
  });

  return positions;
};

const getPositionSuffix = (position: number): string => {
  if (position > 10 && position < 20) return "th";
  const lastDigit: number = position % 10;
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
