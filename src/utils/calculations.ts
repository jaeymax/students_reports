// interface ScoreInput {
//   classScore: number;
//   examScore: number;
// }

export const calculateTotal = (classScore: number, examScore: number): number => {
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
    4: "Credit",
    5: "Pass",
    6: "Pass",
    7: "Pass",
    8: "Pass",
    9: "Fail",
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
    .filter((score) => CORE_SUBJECTS.includes(score.subject || ''))
    .reduce((sum, score) => sum + (score.total || 0), 0);
};

interface PositionMap extends Map<string, string> {}

export const calculatePositions = (
  students: { id: string; scores: { total: number }[] }[],
  subjectIndex: number
): PositionMap => {
  // Get all scores for the specific subject
  const subjectScores: StudentScore[] = students.map((student) => ({
    id: student.id,
    total: student.scores[subjectIndex].total,
  }));

  // Sort by total score in descending order
  const sortedScores: StudentScore[] = subjectScores.sort((a, b) => (b.total || 0) - (a.total || 0));

  // Create position mapping
  const positions: PositionMap = new Map();
  let currentPosition: number = 1;
  let currentScore: number = -1;
  let samePositionCount: number = 0;

  sortedScores.forEach((score, index) => {
    if (score.total === currentScore) {
      // Same score gets same position
      samePositionCount++;
    } else {
      currentPosition = index + 1;
      currentScore = score.total ?? 0;
      samePositionCount = 0;
    }
    if (score.id) {
      positions.set(
        score.id,
        `${currentPosition}${getPositionSuffix(currentPosition)}`
      );
    }
  });

  return positions;
};

// interface PositionSuffix {
//   "st": string;
//   "nd": string;
//   "rd": string;
//   "th": string;
// }

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
