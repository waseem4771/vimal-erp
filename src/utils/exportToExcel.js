import * as XLSX from 'xlsx';

/**
 * JSON Data ko Excel (.xlsx) mein convert aur download karne ka helper
 * @param {Array} data - Table ka data (JSON format)
 * @param {String} fileName - File ka naam (e.g. Profit_Loss_Report)
 */
export const exportToExcel = (data, fileName) => {
  // 1. Nayi Workbook banayein
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  
  // 2. Data ko sheet mein add karein
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  
  // 3. File generate aur download karein
  XLSX.writeFile(workbook, `${fileName}_${new Date().getTime()}.xlsx`);
};