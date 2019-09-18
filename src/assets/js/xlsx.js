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
      workExcels.SheetNames.forEach((sheetName) => {
        let excelIndex = 0;
        let signIndex = 0;
        let matchIndex = null;
        let icdIndex = null;
        let icdExcelIndex = 0;
        const insertHeader = ['name', 'match', 'icd', 'accuracy'];
        const insertData = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const grid in workExcels.Sheets[sheetName]) {
          if (workExcels.Sheets[sheetName][grid].v === '疾病名称' && !matchIndex) {
            matchIndex = grid.match(/[\D]*/g)[0];
            excelIndex = parseInt(grid.match(/[\d]*/g)[1], 10);
            signIndex = excelIndex;
          }
          if (workExcels.Sheets[sheetName][grid].v === 'ICD-10编码' && !matchIndex) {
            icdIndex = grid.match(/[\D]*/g)[0];
            icdExcelIndex = parseInt(grid.match(/[\d]*/g)[1], 10);
          }
          if (grid.match(/[\D]*/g)[0] === icdIndex) {
            let icdArrIndex = 0;
            if (workExcels.Sheets[sheetName][icdIndex + icdExcelIndex]) {
              insertData[icdArrIndex].icd = icdText;

            }
          }
          if (grid.match(/[\D]*/g)[0] === matchIndex) {
            excelIndex += 1;
            if (workExcels.Sheets[sheetName][matchIndex + excelIndex]) {
              const word = workExcels.Sheets[sheetName][matchIndex + excelIndex].v;
              const icdText = workExcels.Sheets[sheetName][icdIndex + excelIndex].v;
              const result = this.mode.find(word);
              insertData.push({
                name: word,
                icd: icdText,
                match: result.bestMatch.target,
                accuracy: result.bestMatch.rating,
              });
            } else {
              insertData.push({
                name: '',
                icd: '',
                match: '',
                accuracy: '',
              });
            }
          }
        }
        table.utils.sheet_add_json(workExcels.Sheets[sheetName], insertData, {
          header: insertHeader,
          origin: 'BT' + signIndex,
        });
      });
      table.writeFile(workExcels, element.path);
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
