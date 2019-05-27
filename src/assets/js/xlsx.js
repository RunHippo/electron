import table from 'xlsx';
import fs from 'fs';


class Excel {
  constructor(files) {
    this.files = files;
    this.read = (fileList) => {
      fileList.forEach((element) => {
        const workExcels = table.readFile(element.path);
        this.loadExcel(workExcels.Sheets);
      });
    };
    this.parseExcel = (fileList) => {
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
    };
    this.loadExcel = (sheets) => {
      for (const excel in sheets) {
        let excelIndex = 6;
        for (const grid in sheets[excel]) {
          if (sheets[excel][`X${excelIndex}`]) {
            console.log(sheets[excel][`X${excelIndex}`].v);
            excelIndex++;
          }
        }
      }
    };
  }
}
