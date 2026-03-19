const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('dataUMP.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

const headers = rows[0]; // ["No", "Provinsi", "2018", "2019", ...]
const years = headers.slice(2); // ["2018", "2019", ...]

const provinces = rows.slice(1)
    .filter(row => row[0] && row[1]) // skip empty rows
    .map(row => {
        const data = {};
        years.forEach((year, i) => {
            data[year] = row[i + 2] ?? 0;
        });
        return {
            id: row[0],
            province: row[1],
            data
        };
    });

fs.writeFileSync('static/provinces.json', JSON.stringify(provinces, null, 4));
console.log(`Done: ${provinces.length} provinces written to static/provinces.json`);
