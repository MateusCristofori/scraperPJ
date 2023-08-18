import PDFDocument from "pdfkit";

export const createPDF = (results: any[], doc: typeof PDFDocument) => {
  doc.fontSize(20).text(`\n ${results} \n`);
};
