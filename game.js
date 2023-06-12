'use strict';

const height = 20;
const width = 50;


const fillSymbol = '#';
const fillEmpty = ' ';


const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');



const racketWidth = 6;
const racketX = Math.round((width - racketWidth) / 2);

const racket = {
    x: racketX,
    y: height - 2,
};

const BALL = {
    x: 24,
    y: 10,
};

const putBall = (field) => {
    
    field[BALL.y][BALL.x] = '*';
    
};

let xChanger = 1;
let yChanger = 1;

const moveBall = (field) => {
    
    if (BALL.y === 19) {
        
        console.log("game over");
        process.exit(0);
        
    }
    
    if (field[BALL.y + 1][BALL.x - 1] === "@") yChanger = -yChanger;
    if (BALL.y === 1) yChanger = -yChanger;
    if (BALL.x === 1 || BALL.x === 48) xChanger = -xChanger;
    
    
    BALL.x += xChanger;
    BALL.y -= yChanger;
        
}


const putRacket = (field) => {

    for (let i = racket.x; i < racket.x + racketWidth; i++) {

        field[racket.y][i] = '@';
    }
};


const racketMove = (x) => {

    racket.x = x;

    if (racket.x < 1) racket.x = 1;

    if (racket.x + racketWidth >= width) racket.x = width - 1 - racketWidth;

};



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




const updateGame = () => {

    console.clear();
    gameField = createField(fillSymbol, width, height);
    putRacket(gameField);
    moveBall(gameField);
    putBall(gameField);
    updateField(gameField, height);
    
};


stdin.on('data', button => {

    if (button === 'a') {
        
        racketMove(racket.x - 1);
        putRacket(gameField);
        
    }


    if (button === 'd') {

        racketMove(racket.x + 1);
        putRacket(gameField);
        
    }

    if (button === 'q') {
        
        console.log("game over");
        process.exit(0);
    }
});

setInterval(updateGame, 60);
