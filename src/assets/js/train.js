import fs from 'fs';
import stringSimilarity from 'string-similarity';

class Mode {
  constructor() {
    this.list = [];
    this.init();
  }
  init() {
    fs.readFile(`${__dirname}/assets/standard.json`, (err, data) => {
      if (err) {
        return console.error(err);
      }
      const list = JSON.parse(data.toString());
      list.forEach((element) => {
        this.list.push(element.name);
      });
      return false;
    });
  }
  find(name) {
    return stringSimilarity.findBestMatch(name, this.list);
  }
}
