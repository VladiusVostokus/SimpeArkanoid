'use strict';

const height = 20;
const width = 50;


const fillSymbol = '#';
const fillEmpty = ' ';

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');


//const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));


const racketWidth = 6;
const racketX = Math.round((width - racketWidth) / 2);
const racket = {
    x: racketX,
    y: height - 2
};



const putRacket = (field) => {

    for (let i = racket.x; i < racket.x + racketWidth; i++) {

        field[racket.y][i] = '@';
    }
};

const racketMove = (x) => {

    racket.x = x;

    if (racket.x < 1) racket.x = 1;

    if (racket.x + racketWidth >= width) racket.x = width - 1 - racketWidth;

}


//const gameField = new Array(width).fill('#');


const createField = (symbol, w, h) => {

    const returnArray = [];
    const workArray = new Array(width).fill(symbol);

    for (let i = 0; i < h; i++)

        returnArray.push([...workArray]);

    for (let i = 1; i < h; i++) {

        for (let j = 1; j < w - 1; j++) {

            returnArray[i][j] = fillEmpty;

        }
    }

    return returnArray;
};


let gameField = createField(fillSymbol, width, height);


const updateField = (field) => {

    let str = '';

    for (const subArray of field) {

        for (const value of subArray) {

            str += value;
        }
        console.log(str);
        str = '';
    }
};


//updateField(gameField,height);
//console.clear();

/*
racketMove(30);
putRacket(gameField);
updateField(gameField, height);

gameField = createField(fillSymbol, width, height);

racketMove(20);
putRacket(gameField);
updateField(gameField, height);
*/


stdin.on('data', button => {
    
    switch(button) {
        
        case 'a':
            console.clear();
            gameField = createField(fillSymbol, width, height);
            racketMove(racket.x - 1);
            putRacket(gameField);
            updateField(gameField, height);
            break;
            
        case 'd':
            console.clear();
            gameField = createField(fillSymbol, width, height);
            racketMove(racket.x + 1);
            putRacket(gameField);
            updateField(gameField, height);
            break;
    }
    
});
         

















