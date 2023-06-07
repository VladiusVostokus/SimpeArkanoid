'use strict';

const height = 25;
const width = 30;

const gameField = new Array(width).fill('#');

const updateField = (field, width) => {
    
    let line = '';
    
    for(let i = 0; i < width; i ++) {
        
        line += field[i];
        
    }
    
    console.log(line);
    
}

updateField(gameField,width);

