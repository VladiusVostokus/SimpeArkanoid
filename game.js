'use strict';

const height = 20;
const width = 50;
const fillSymbol = '#';

//const gameField = new Array(width).fill('#');

const createField = (symbol,w,h) => {
    
    const returnArray = [];
    const workArray = new Array(width).fill(symbol);
    
    for(let i = 0; i < h; i++) {
        
        returnArray.push([...workArray]);
       
    }
    
    for(let i = 1; i < h - 1 ; i++) {
        for(let j = 1; j < w - 1; j++){
            returnArray[i][j] = ' ';
        }
    }
    
    return returnArray;
    
};


const gameField = createField(fillSymbol,width,height);


const updateField = (field) => {
    
    let str = '';
    
    for(const subArray of field) {
        
        for(const value of subArray){
            
            str += value;
        }
        console.log(str);
        str = '';
    }  
};

updateField(gameField,height);

