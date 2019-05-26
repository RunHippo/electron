import xlsx from 'node-xlsx';
import fs from 'fs';

class Excel {
  constructor(files) {
    this.files = files;
    this.getContent = () => {
      this.workSheetsFromFile = xlsx.parse(fs.readFileSync(this.dir));
    };
    this.save = (fileList) => {
      var s = [];
      this.workSheetsFromFile = xlsx.parse(fs.readFileSync(fileList[0].path));
      this.workSheetsFromFile[0].data.forEach(v=>{
        var obj = {};
        obj.code = v[0];
        obj.extraCode = v[1];
        obj.name = v[2].replace(/\([\S\s]*\)/g,'').replace(/\（[\S\s]*\)/g,'').replace(/\([\S\s]*\）/g,'').replace(/\（[\S\s]*\）/g,'');
        s.push(obj);
      })
      fs.writeFileSync('standard.json', JSON.stringify(s));
    };
  }
}
