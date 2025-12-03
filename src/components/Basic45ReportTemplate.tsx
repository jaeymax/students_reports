import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
// import { styles } from "../styles/reportStyles";

interface Basic45ReportProps {
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

//#93c5fd
const styles = StyleSheet.create({
  page: {
    padding: "40px",
    backgroundColor: "#fff",
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
    marginTop: 10,
    fontSize: 8,
    fontWeight: "bold",
  },
  subject: { width: "35%", paddingVertical: 1 },
  score: { width: "10%", textAlign: "center" },
  total: { width: "10%", textAlign: "center" },
  grade: { width: "15%", textAlign: "center" },
  position: { width: "15%", textAlign: "center" },
  remark: { width: "15%", textAlign: "center" },

  additionalInfo: {
    marginTop: 15,
    gap: 5,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 1,
  },
  domainGrid: {
    display: "flex",
    // marginLeft: 10,
    flexDirection: "column",
    gap: 5,
    fontSize: 8,
  },
});

export const Basic45Report = ({ report }: Basic45ReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          src={window.location.origin + "/school-logo.jpg"}
          style={styles.logo}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>BRILLIANT KIDS EDUCATIONAL INSTITUTE</Text>
          <Text style={styles.motto}>
            Motto: Firm foundation & sound teaching our priority
          </Text>
          <Text style={styles.subtitle}>{report.class} TERMINAL REPORT</Text>
          <Text style={styles.subtitle}>TERM: THREE</Text>
          <View style={styles.dates}>
            <Text>
              VACATION DATE:{" "}
              <Text style={{ fontWeight: "bold" }}>8TH AUGUST, 2025</Text>
            </Text>
            <Text>
              RE-OPENING DATE:{" "}
              <Text style={{ fontWeight: "bold" }}>1ST SEPTEMBER, 2025</Text>
            </Text>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 12, marginBottom: 10, fontWeight: "bold" }}>
        NAME: {report.name}
      </Text>

      {/* Scores Table */}
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
            <Text style={[styles.tableCell, styles.total]}>{score.total}</Text>
            <Text style={[styles.tableCell, styles.grade]}>{score.grade}</Text>
            <Text style={[styles.tableCell, styles.position]}>
              {score.position}
            </Text>
            <Text style={[styles.tableCell, styles.remark]}>
              {score.remark}
            </Text>
          </View>
        ))}
      </View>

      {/* Additional Information for Basic 4/5 */}
      <View style={styles.additionalInfo}>
        <Text style={styles.sectionTitle}>
          CRITICAL THINKING & PROBLEM SOLVING (CP)
        </Text>
        <View style={styles.domainGrid}>
          <Text>
            Able to organize vast amount of information in ways that are useful
            and understanding 3
          </Text>
          <Text>
            Able to think through what he/she is doing and evaluate many
            potential choices 4
          </Text>
          <Text>
            Can identify the key questions in a problem, develop possible paths
            to a solution, and follow through with a solution 3
          </Text>
        </View>

        <Text style={styles.sectionTitle}>CREATIVITY AND INNOVATION (CI)</Text>
        <View style={styles.domainGrid}>
          <Text>Able to think about new ways of solving problems 4</Text>
          <Text>
            Develops simple tools, procedures and technologies for addressing
            problems 3
          </Text>
          <Text>
            Able to think independently and conceive something original or
            unusual 3
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          COMMUNICATION AND COLLABORATION (CC)
        </Text>
        <View style={styles.domainGrid}>
          <Text>
            Articulate thoughts and ideas effectively using oral, written and
            nonverbal communication skills in a variety of forms and contexts 3
          </Text>
          <Text>
            Listen effectively to decipher meaning, including knowledge, values,
            attitudes and intentions 3
          </Text>
          <Text>
            Demonstrate ability to work effectively and respectfully with
            diverse people and teams 2
          </Text>
          <Text>
            Assume shared responsibility for work done with others and value the
            individual contributions made by each team member 4
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          PERSONAL DEVELOPMENT AND LEADERSHIP (PL)
        </Text>
        <View style={styles.domainGrid}>
          <Text>Improving in self-awareness and self-esteem 4</Text>
          <Text>
            Shows ability to identify and develop talents, to fulfil dreams and
            aspirations 3
          </Text>
          <Text>Able to learn from the mistakes and failures of the past</Text>
          <Text>Able to set and meet personal goals 4</Text>
          <Text>
            Uses interpersonal and problem-solving skills to influence and guide
            others towards a goal 4
          </Text>
          <Text>
            Leverages the strengths of others to accomplish a common goal 2
          </Text>
        </View>
      </View>

      {/* Regular Remarks Section */}
      <View style={styles.remarks}>
        <Text style={{ marginBottom: 1 }}>
          CLASS TEACHER'S REMARKS: {report.classTeacherRemarks}
        </Text>
        <Text style={{ marginTop: 3 }}>
          <Text
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              marginRight: 20,
            }}
          >
            Director's remarks:
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            {" "}
            Home supervision is very important and necessary. Parents and
            Guardians should kindly supervise their wards' homework and give
            feedback.
          </Text>
        </Text>
      </View>
    </Page>
  </Document>
);
