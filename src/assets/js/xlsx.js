import table from 'xlsx';
import fs from 'fs';

class Excel {
  constructor(files, mode) {
    this.files = files;
    this.mode = mode;
  }
  read() {
    this.files.forEach((element) => {
      const workExcels = table.readFile(element.path);
      const insertHeader = ['match', 'accuracy'];
      const insertData = [];
      workExcels.SheetNames.forEach((sheetName) => {
        let excelIndex = 6;
        // eslint-disable-next-line no-restricted-syntax
        for (const grid in workExcels.Sheets[sheetName]) {
          if (workExcels.Sheets[sheetName][`X${excelIndex}`]) {
            const result = this.mode.find(workExcels.Sheets[sheetName][`X${excelIndex}`].v);
            // workExcels.Sheets[sheetName][`X${excelIndex}`].v = `${result.bestMatch.target} rating:${result.bestMatch.rating}`;
            insertData.push({
              match: result.bestMatch.target,
              accuracy: result.bestMatch.rating,
            });
            excelIndex += 1;
          }
        }
      });
      console.log(insertData);
      table.utils.sheet_add_json(workExcels, insertData, {
        header: insertHeader,
        // origin: 'X5',
      });
      table.writeFile(workExcels, 'out.xlsx');
    });
  }
  parseExcel(fileList) {
    const s = [];
    this.workSheetsFromFile = table.parse(fs.readFileSync(fileList[0].path));
    this.workSheetsFromFile[0].data.forEach((v) => {
      const obj = {};
      obj.code = v[0];
      obj.extraCode = v[1];
      obj.name = v[2].replace(/\([\S\s]*\)/g, '').replace(/\（[\S\s]*\)/g, '').replace(/\([\S\s]*\）/g, '').replace(/\（[\S\s]*\）/g, '').replace(/\[[\S\s]*\]/g, '');
      s.push(obj);
    });
    fs.writeFileSync('standard.json', JSON.stringify(s));
  }
}
