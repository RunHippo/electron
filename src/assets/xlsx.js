import xlsx from 'node-xlsx';
import fs from 'fs';

class Excel {
  constructor(files) {
    this.files = files;
    this.getContent = () => {
      this.workSheetsFromFile = xlsx.parse(fs.readFileSync(this.dir));
    };
    this.save = () => {

    };
  }

}
