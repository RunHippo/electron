import fs from 'fs';
import stringSimilarity from 'string-similarity';

class Mode {
  constructor() {
    this.init = () => {
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
    };
    this.compare = name => stringSimilarity.findBestMatch(name, this.list);
  }
}
