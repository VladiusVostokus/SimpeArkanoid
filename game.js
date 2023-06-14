'use strict';

const HEIGHT = 20;
const WIDTH = 50;
const END_OF_FIELD = HEIGHT - 1;

const WIN_SCORE = 10;
let yourScore = 0;


const WALL = '#';
const SPACE = ' ';
const RACKET = '@';
const BALL = '*';


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
    x: 30,
    y: 10,
};

const putBall = (field) => {

    field[ball.y][ball.x] = BALL;

};

let xChanger = 1;
let yChanger = 1;

const moveBall = (field) => {
    
    const PREV_X = ball.x - 1;
    const NEXT_X = ball.x + 1;
    
    const PREV_Y = ball.y - 1;
    const NEXT_Y = ball.y + 1;
    
    
    if (ball.y === END_OF_FIELD) {

        console.log("game over, your score =", yourScore);
        process.exit(0);

    }
    
    
    if (field[ball.y][PREV_X] === WALL || field[ball.y][NEXT_X] === WALL)  
        xChanger = -xChanger;
        
    
    if(field[PREV_Y][ball.x] === WALL || field[NEXT_Y][ball.x] === WALL )
        yChanger = - yChanger;
    
    
    if (field[NEXT_Y][ball.x] === RACKET) {

        yourScore++;
        yChanger = -yChanger;

    }
    
    
    ball.x += xChanger;
    ball.y -= yChanger;
    
}



const putRacket = (field) => {

    for (let i = racket.x; i < racket.x + racketWidth; i++) {

        field[racket.y][i] = RACKET;
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

            returnArray[i][j] = SPACE;

        }
    }

    return returnArray;
};



let gameField = createField(WALL, WIDTH, HEIGHT);


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
    gameField = createField(WALL, WIDTH, HEIGHT);
    putRacket(gameField);
    moveBall(gameField);
    putBall(gameField);
    showField(gameField, HEIGHT);

    if (yourScore === WIN_SCORE) {

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
