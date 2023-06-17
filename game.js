'use strict';


const HEIGHT = 20;
const WIDTH = 50;
const END_OF_FIELD = HEIGHT - 1;
const LEFT_WALL = 0;
const RIGHT_WALL = WIDTH - 1;
const CEILENG = 0;

const WIN_SCORE = 10;
let yourScore = 0;

const TIMEOUT = 60;

const WALL = '#';
const SPACE = ' ';
const RACKET = '@';
const BALL = '*';


const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');


const RACKET_LEN = 6;
const RACKET_X = Math.round((WIDTH - RACKET_LEN) / 2);

const racket = {
    x: RACKET_X,
    y: HEIGHT - 2,
    len: RACKET_LEN,
};


const ball = {
    x: 30,
    y: 10,
};



let xChanger = 1;
let yChanger = 1;


const moveBall = (gameField) => {

    const PREV_X = ball.x - 1;
    const NEXT_X = ball.x + 1;

    const PREV_Y = ball.y - 1;
    const NEXT_Y = ball.y + 1;

    if (gameField[ball.y][PREV_X] === WALL || gameField[ball.y][NEXT_X] === WALL)
        xChanger = -xChanger;

    if (gameField[PREV_Y][ball.x] === WALL || gameField[NEXT_Y][ball.x] === WALL)
        yChanger = -yChanger;

    if (gameField[NEXT_Y][ball.x] === RACKET) {

        yourScore++;
        yChanger = -yChanger;

    }

    ball.x += xChanger;
    ball.y -= yChanger;

    gameField[ball.y][ball.x] = BALL;

};


const putRacket = (gameField) => {

    for (let i = racket.x; i < racket.x + racket.len; i++) {

        gameField[racket.y][i] = RACKET;
    }
};


const moveRacket = (x) => {

    racket.x = x;

    if (racket.x < LEFT_WALL + 1) racket.x = 1;

    if (racket.x + racket.len >= WIDTH) racket.x = RIGHT_WALL - racket.len;

};


const createField = (symbol, width, height) => {

    const returnArray = [];
    const workArray = new Array(width).fill(symbol);

    for (let i = 0; i < height; i++) {

        returnArray.push([...workArray]);
        returnArray[i][LEFT_WALL] = WALL;
        returnArray[i][RIGHT_WALL] = WALL;

    }


    for (let i = 0; i < width; i++)
        returnArray[CEILENG][i] = WALL;


    return returnArray;

};



let fieldOfGame = createField(SPACE, WIDTH, HEIGHT);



const showField = (gamefield) => {

    let str = '';

    for (const row of gamefield) {

        for (const col of row) {

            str += col;
        }
        console.log(str);
        str = '';
    }
};



const updateGame = () => {

    console.clear();
    fieldOfGame = createField(SPACE, WIDTH, HEIGHT);
    putRacket(fieldOfGame);
    moveBall(fieldOfGame);
    showField(fieldOfGame);


    if (ball.y === END_OF_FIELD) {

        console.log("Game over, your score =", yourScore);
        process.exit(0);

    }


    if (yourScore === WIN_SCORE) {

        console.log("Congratulation!!!");
        process.exit(0);
    }

};


const controls = {
    
    get 'a'() {
        moveRacket(racket.x - 1);
    },
      
    get 'd'() {
        moveRacket(racket.x + 1);
    },
    
    get 'q'() {
        console.log('game over');
        process.exit(0);     
    },
};

const action = (button) => controls[button] || (() => {});

stdin.on('data', button => {

   action(button);

});

setInterval(updateGame, TIMEOUT);
