const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Load the Excel file
const filePath = path.join(__dirname, "13.xlsx"); // Replace with your Excel file name
const workbook = XLSX.readFile(filePath);

// Function to create directories if they don't exist
const createDirectory = (folderName) => {
  const outputDir = path.join(__dirname, folderName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
};

// Create necessary directories
const regenciesDir = createDirectory("static/regency");
const provincesDir = createDirectory("static/regencies");

(async () => {
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    let results = [];
    let beforeProvinceId = null;

    for (const row of jsonData) {
      const { id, name, province_id, province_name, ...extraData } = row;

      const data = {
        id,
        name,
        province_id,
        province: province_name,
        data: Object.fromEntries(Object.entries(extraData).filter(([key]) => !isNaN(key))),
      };

      // Save individual regency JSON
      const regencyFile = path.join(regenciesDir, `${id}.json`);
      fs.writeFileSync(regencyFile, JSON.stringify(data, null, 4));
      console.log(`✅ Saved: ${regencyFile}`);

      // Group regencies by province
      if (beforeProvinceId !== province_id && beforeProvinceId !== null) {
        // Save previous province JSON
        const provinceFile = path.join(provincesDir, `${beforeProvinceId}.json`);
        fs.writeFileSync(provinceFile, JSON.stringify(results, null, 4));
        console.log(`✅ Saved province: ${provinceFile}`);
        results = [];
      }

      results.push(data);
      beforeProvinceId = province_id;
    }

    // Save last province's data
    if (results.length > 0) {
      const provinceFile = path.join(provincesDir, `${beforeProvinceId}.json`);
      fs.writeFileSync(provinceFile, JSON.stringify(results, null, 4));
      console.log(`✅ Saved province: ${provinceFile}`);
    }
  }

  console.log("🎉 Conversion complete!");
})();
