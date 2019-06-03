
onmessage = function(element, table) {
    const workExcels = table.readFile(element.path);
    workExcels.SheetNames.forEach((sheetName) => {
    let excelIndex = 0;
    let signIndex = 0;
    let matchIndex = null;
    const insertHeader = ['name','match', 'accuracy'];
    const insertData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const grid in workExcels.Sheets[sheetName]) {
        if(workExcels.Sheets[sheetName][grid].v==='疾病名称'&&!matchIndex){
        matchIndex = grid.match(/[\D]*/g)[0];
        excelIndex = parseInt(grid.match(/[\d]*/g)[1]);
        signIndex = excelIndex;
        }
        if(grid.match(/[\D]*/g)[0]===matchIndex){
        excelIndex += 1;
        if (workExcels.Sheets[sheetName][matchIndex+excelIndex]) {
            const word = workExcels.Sheets[sheetName][matchIndex+excelIndex].v;
            const result = this.mode.find(word);
            insertData.push({
            name: word,
            match: result.bestMatch.target,
            accuracy: result.bestMatch.rating,
            });
        }else{
            insertData.push({
            name: '',
            match: '',
            accuracy: '',
            });

        }
        }
    }
    table.utils.sheet_add_json(workExcels.Sheets[sheetName], insertData, {
        header: insertHeader,
        origin: 'BT'+ signIndex,
    });
    });
    table.writeFile(workExcels, element.path);
    postMessage(element);
}      