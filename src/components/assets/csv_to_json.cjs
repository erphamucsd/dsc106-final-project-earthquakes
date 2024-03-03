const fs = require('fs');
const csv = require('csv-parser');

// Specify the path to your CSV file
const csvFilePath = './Significant Earthquake Dataset 1900-2023.csv';
const jsonData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Process each row
    jsonData.push(row);
  })
  .on('end', () => {
    // Write the JSON data to a file
    const jsonFilePath = 'output.json';
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log('CSV file successfully converted to JSON.');
  });
