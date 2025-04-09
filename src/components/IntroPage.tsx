
import { useStudent } from "../context/StudentContext.tsx";

const IntroPage = ({ onClassSelect }: { onClassSelect: (selectedClass: string) => void }) => {
  const { selectedClass, setSelectedClass } = useStudent();

  const classes = [
    "BASIC 4",
    "BASIC 5",
    "BASIC 6",
    "BASIC 7",
    "BASIC 8",
    "BASIC 9",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedClass) {
      onClassSelect(selectedClass);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            {/* Logo placeholder - replace with actual logo */}
            <svg
              className="w-16 h-16 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14v7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Student Reports
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Brilliant Kids Educational Institute
          </p>
          <p className="text-gray-500">Please select your class to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as "BASIC 4" | "BASIC 5" | "BASIC 6" | "BASIC 7" | "BASIC 8" | "BASIC 9" | "")}
              className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a class</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedClass}
            className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntroPage;
