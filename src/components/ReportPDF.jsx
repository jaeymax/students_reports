import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  studentName: {
    fontSize: 16,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  subject: { width: "25%" },
  score: { width: "15%" },
  total: { width: "15%" },
  grade: { width: "15%" },
  position: { width: "15%" },
  remark: { width: "15%" },
});

const ReportPDF = ({ student }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Student Report Card</Text>
      <Text style={styles.studentName}>Student: {student.name}</Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.subject]}>Subject</Text>
          <Text style={[styles.tableCell, styles.score]}>Class Score</Text>
          <Text style={[styles.tableCell, styles.score]}>Exam Score</Text>
          <Text style={[styles.tableCell, styles.total]}>Total</Text>
          <Text style={[styles.tableCell, styles.grade]}>Grade</Text>
          <Text style={[styles.tableCell, styles.position]}>Position</Text>
          <Text style={[styles.tableCell, styles.remark]}>Remark</Text>
        </View>

        {student.scores.map((score, index) => (
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
    </Page>
  </Document>
);

export default ReportPDF;
