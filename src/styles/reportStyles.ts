import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  // ...existing styles from PDFPreviewModal...

  // New styles for Basic 4/5 template
  additionalInfo: {
    marginTop: 20,
    gap: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 5,
  },
  domainGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 10,
  },
});
