'use strict';

const HEIGHT = 20;
const WIDTH = 50;

const WIN_SCORE = 10;
let yourScore = 0;


const FILL_SYMBOL = '#';
const EMPTY = ' ';


const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');



const racketWidth = 6;
const RACKET_X = Math.round((WIDTH - racketWidth) / 2);

const racket = {
    x: RACKET_X,
    y: HEIGHT - 2,
};

const ball = {
    x: 24,
    y: 10,
};

const putBall = (field) => {
    
    field[ball.y][ball.x] = '*';
    
};

let xChanger = 1;
let yChanger = 1;

const moveBall = (field) => {
    
    if (ball.y === 19) {
        
        console.log("game over, your score =", yourScore);
        process.exit(0);
        
    }
    
    if (field[ball.y + 1][ball.x - 1] === "@") { 
        
        yourScore++;
        yChanger = -yChanger;
        
    }
    
    
    if (ball.y === 1) yChanger = -yChanger;
    if (ball.x === 1 || ball.x === 48) xChanger = -xChanger;
    
    
    ball.x += xChanger;
    ball.y -= yChanger;
        
};


const putRacket = (field) => {

    for (let i = racket.x; i < racket.x + racketWidth; i++) {

        field[racket.y][i] = '@';
    }
};


const moveRacket = (x) => {

    racket.x = x;

    if (racket.x < 1) racket.x = 1;

    if (racket.x + racketWidth >= WIDTH) racket.x = WIDTH - 1 - racketWidth;

};



const createField = (symbol, w, h) => {

    const returnArray = [];
    const workArray = new Array(w).fill(symbol);

    for (let i = 0; i < h; i++)

        returnArray.push([...workArray]);

    for (let i = 1; i < h; i++) {

        for (let j = 1; j < w - 1; j++) {

            returnArray[i][j] = EMPTY;

        }
    }

    return returnArray;
};
    


let gameField = createField(FILL_SYMBOL, WIDTH, HEIGHT);


const showField = (field) => {

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
    gameField = createField(FILL_SYMBOL, WIDTH, HEIGHT);
    putRacket(gameField);
    moveBall(gameField);
    putBall(gameField);
    showField(gameField, HEIGHT);
    
    if(yourScore === WIN_SCORE) {
        
        console.log("Congratulation!!!");
        process.exit(0);
    }
    
};


stdin.on('data', button => {

    if (button === 'a') {
        
        moveRacket(racket.x - 1);
        putRacket(gameField);
        
    }


    if (button === 'd') {

        moveRacket(racket.x + 1);
        putRacket(gameField);
        
    }

    if (button === 'q') {
        
        console.log("game over");
        process.exit(0);
    }
    
});

setInterval(updateGame, 60);
