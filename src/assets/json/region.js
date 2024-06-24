import fs from 'fs';
import csv from 'csv-parser';

const results = [];

fs.createReadStream('input.csv') // input.csv 파일 경로를 지정하십시오
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
    console.log('CSV to JSON conversion completed successfully.');
  });
