
import {
    NerManager
} from 'node-nlp';

import fs from 'fs';
const manager = new NerManager({
    threshold: 0.8
});
fs.readFile(`${__dirname}/assets/standard.json`,function(err,data){
    if(err){
        return console.error(err);
    }
    const list = JSON.parse(data.toString());
    list.forEach(element => {
        console.log(element);
        manager.addNamedEntityText(
        'medical',
        element.name,
        ['zh'],
        [element.name],
        );
        manager.findEntities(
        '伤寒性脑膜炎'
        ).then(entities => {
            console.log(entities)
        })
        
    });
})
class Mode{
    constructor(){
        fs.readFile(`${__dirname}/assets/standard.json`,function(err,data){
            if(err){
                return console.error(err);
            }
            const list = JSON.parse(data.toString());
            list.forEach(element => {
                console.log(element);
                manager.addNamedEntityText(
                'medical',
                element.name,
                ['zh'],
                [element.name],
                );
                manager.findEntities(
                '伤寒性脑膜炎'
                ).then(entities => {
                    console.log(entities)
                })
                
            });
        })
    }
}
