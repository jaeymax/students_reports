import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { getTotalRawScore } from "../utils/calculations";
import { Basic45Report } from "./Basic45ReportTemplate";

const styles = StyleSheet.create({
  page: {
    padding: "40px",
    backgroundColor: "#93c5fd",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 70,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  motto: {
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 10,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    fontSize: 10,
  },
  table: {
    marginTop: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRight: "none",
    borderBottom: "none",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#000",
    // paddingVertical: 5,
  },
  tableHeader: {
    textTransform: "uppercase",
  },
  tableCell: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  remarks: {
    marginTop: 20,
    fontSize: 10,
    fontWeight: "bold",
  },
  subject: { width: "35%", paddingVertical: 15 },
  score: { width: "10%", textAlign: "center" },
  total: { width: "10%", textAlign: "center" },
  grade: { width: "15%", textAlign: "center" },
  position: { width: "15%", textAlign: "center" },
  remark: { width: "15%", textAlign: "center" },
});

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    name: string;
    class: string;
    scores: Array<{
      subject: string;
      classScore: number;
      examScore: number;
      total: number;
      grade: string;
      position: string;
      remark: string;
    }>;
    classTeacherRemarks: string;
  };
}

const PDFPreviewModal = ({ isOpen, onClose, report }: PDFPreviewModalProps) => {
  const handleDownload = async () => {
    const blob = await pdf(<ReportDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report?.name}-report.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  
  if (!isOpen) return null;

  const ReportDocument = () => {
    
    if (report.class === "BASIC 4" || report.class === "BASIC 5") {
      return <Basic45Report report={report} />;
    }

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src="./school-logo.jpg" style={styles.logo} />
            <View style={styles.headerText}>
              <Text style={styles.title}>
                BRILLIANT KIDS EDUCATIONAL INSTITUTE
              </Text>
              <Text style={styles.motto}>
                Motto: Firm foundation & sound teaching our priority
              </Text>
              <Text style={styles.subtitle}>
                {report.class} TERMINAL REPORT
              </Text>
              <Text style={styles.subtitle}>TERM: TWO</Text>
              <View style={styles.dates}>
                <Text>VACATION DATE: 17TH APRIL, 2025</Text>
                <Text>RE-OPENING DATE: 5TH MAY, 2025</Text>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 12, marginBottom: 10, fontWeight: "bold" }}>
            NAME: {report.name}
          </Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.subject]}>Subjects</Text>
              <Text style={[styles.tableCell, styles.score]}>Class Score</Text>
              <Text style={[styles.tableCell, styles.score]}>Exam Score</Text>
              <Text style={[styles.tableCell, styles.total]}>Total</Text>
              <Text style={[styles.tableCell, styles.grade]}>Grades</Text>
              <Text style={[styles.tableCell, styles.position]}>Position</Text>
              <Text style={[styles.tableCell, styles.remark]}>Remark</Text>
            </View>

            {report.scores.map((score, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.subject]}>
                  {score.subject}
                </Text>
                <Text style={[styles.tableCell, styles.score]}>
                  {score.classScore}
                </Text>
                <Text style={[styles.tableCell, styles.score]}>
                  {score.examScore}
                </Text>
                <Text style={[styles.tableCell, styles.total]}>
                  {score.total}
                </Text>
                <Text style={[styles.tableCell, styles.grade]}>
                  {score.grade}
                </Text>
                <Text style={[styles.tableCell, styles.position]}>
                  {score.position}
                </Text>
                <Text style={[styles.tableCell, styles.remark]}>
                  {score.remark}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.remarks}>
            <Text style={{ marginBottom: 10 }}>
              Total Raw Score (Four Core Subjects): {getTotalRawScore(report)}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Class teacher's remark: {report.classTeacherRemarks}
            </Text>
            <Text style={{ marginTop: 5 }}>
              HEADMASTER'S GENERAL REMARKS: Home supervision is very important
              and necessary. Parents and Guardians should kindly supervise their
              wards' homework and give feedback.
            </Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full h-full md:w-4/5 md:h-5/6 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Report Preview</h2>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="text-white hover:bg-blue-600 bg-blue-500 p-2 rounded-md"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-1">
          <PDFViewer width="100%" height="100%">
            <ReportDocument />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
