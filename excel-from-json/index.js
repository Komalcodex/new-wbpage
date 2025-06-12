const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');


const rawData = fs.readFileSync('./data.json');
const data = JSON.parse(rawData);


const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Komal Sheet');


worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 }
];


data.forEach(item => {
    worksheet.addRow(item);
});


const outputPath = path.join(outputDir, 'data.xlsx');
workbook.xlsx.writeFile(outputPath)
    .then(() => {
        console.log('✅ Excel file ban gayi Komal ji!');
    })

    .catch(err => {
        console.error('❌ Error:', err);
    });
const { exec } = require('child_process');

exec(`start "" "${outputPath}"`);
