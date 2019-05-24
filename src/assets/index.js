import {
  shell
} from 'electron';
const dom = document.querySelector('#upload-btn');
dom.onclick = function () {
  console.log(shell);
  // shell.showItemInFolder('/');
  shell.openExternal('/');
}
document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e.dataTransfer.files);
  for (const f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path);
  }
});
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});
import {
  SimilarSearch
} from 'node-nlp';
const similar = new SimilarSearch();
console.log(similar.getBestSubstring('我在', '我在么干什么asdas'));
const {
  NerManager
} = require('node-nlp');

const manager = new NerManager({
  threshold: 0.8
});
manager.addNamedEntityText(
  'hero',
  'spiderman',
  'wjhat',
  ['en'],
  ['Spiderman', 'Spider-man'],
  ['wjhat'],
);
manager.findEntities(
  'I saw spederman eating speghetti in the city'
).then(entities => {
  console.log(entities)
})
