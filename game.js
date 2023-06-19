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

    const prev_x = ball.x - 1;
    const next_x = ball.x + 1;
    
    const prev_y = ball.y - 1;
    const next_y = ball.y + 1;
    
    const leftX = gameField.getCell(ball.y,prev_x);
    const rightX = gameField.getCell(ball.y,next_x);
    
    const aboveY = gameField.getCell(prev_y,ball.x);
    const belowY = gameField.getCell(next_y,ball.x);
    

    if (leftX === WALL || rightX === WALL)
        xChanger = -xChanger;
    
    if (aboveY === WALL || belowY === WALL)
        yChanger = -yChanger;

    if (belowY === RACKET) {

        yourScore++;
        yChanger = -yChanger;

    }

    ball.x += xChanger;
    ball.y -= yChanger;

    gameField.setCell(ball.y, ball.x, BALL);

};


const putRacket = (gameField) => {

    for (let i = racket.x; i < racket.x + racket.len; i++) {

        gameField.setCell(racket.y, i, RACKET);
    }
};


const moveRacket = (x) => {

    racket.x = x;

    if (racket.x < LEFT_WALL + 1) racket.x = 1;

    if (racket.x + racket.len >= WIDTH) racket.x = RIGHT_WALL - racket.len;

};



class FieldOfGame {   
    constructor(symbol, widht, height) {
        
        this.symbol = symbol;
        this.width = widht;
        this.height = height;
        this.field = new Array(this.width).fill(this.symbol);
    }
    
    updateGameField() {
        
        this.returnField = [];
        
        for (let i = 0; i < this.height; i++) {
            
            this.returnField.push([...this.field]);
            this.returnField[i][LEFT_WALL] = WALL;
            this.returnField[i][RIGHT_WALL] = WALL;
            
        }   
        
        for (let j = 0; j < this.width; j++)
            this.returnField[CEILENG][j] = WALL;  
    }
    
    showGameField() {
        
        let str = '';
        
        for (const row of this.returnField) {

            for (const col of row) {

                str += col;
            }   
            console.log(str);
            str = '';
        }
    }
    
    getCell(row, col) {
        return this.returnField[row][col];   
    } 
    
    
    setCell(row, col, value) {
        this.returnField[row][col] = value;
    }  
}


const fieldOfGame = new FieldOfGame(SPACE,WIDTH,HEIGHT);


const updateGame = () => {

    console.clear();
    fieldOfGame.updateGameField();
    putRacket(fieldOfGame);
    moveBall(fieldOfGame);
    fieldOfGame.showGameField();


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
