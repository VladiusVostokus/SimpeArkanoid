'use strict';


const HEIGHT = 20;
const WIDTH = 50;
const END_OF_FIELD = HEIGHT - 1;
const LEFT_WALL = 0;
const RIGHT_WALL = WIDTH - 1;
const CEILENG = 0;

const WIN_SCORE = 10;

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


class Ball {
    
    constructor(symbol, y, x) {
        
        this.symbol = symbol;
        this.y = y;
        this.x = x;
        
        this.xChanger = 1;
        this.yChanger = 1;
        this.score = 0;
        
    }
    
    moveBall(gamefield) {
        
        const prevX = this.x - 1;
        const nextX = this.x + 1;
        const prevY = this.y - 1;
        const nextY = this.y + 1;
        
        const leftX = gamefield.getCell(this.y,prevX);
        const rightX = gamefield.getCell(this.y,nextX);
    
        const aboveY = gamefield.getCell(prevY,this.x);
        const belowY = gamefield.getCell(nextY,this.x);
        
        if (leftX === WALL || rightX === WALL)
            this.xChanger = -this.xChanger;
    
        if (aboveY === WALL || belowY === WALL)
            this.yChanger = -this.yChanger;
        
        if (belowY === RACKET) {
            this.score++;
            this.yChanger = -this.yChanger;
        }
        
        this.x += this.xChanger;
        this.y -= this.yChanger
        
        gamefield.setCell(this.y, this.x, this.symbol);
    }
    
    checkEnd() {
        
        if (this.y === END_OF_FIELD) {

        console.log("Game over, your score =", this.score);
        process.exit(0);

        }
    }
    
    checkScore() {
        
        if(this.score === WIN_SCORE){
            
            console.log("Congratulation!!!");
            process.exit(0);
            
        }      
    }
   
}


const ball = new Ball(BALL, 10, 30);


const putRacket = (gamefield) => {

    for (let i = racket.x; i < racket.x + racket.len; i++) {

        gamefield.setCell(racket.y, i, RACKET);
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
        this.row = new Array(this.width).fill(this.symbol);
    }
    
    updateGameField() {
        
        this.gameField = [];
        
        for (let i = 0; i < this.height; i++) {
            
            this.gameField.push([...this.row]);
            this.gameField[i][LEFT_WALL] = WALL;
            this.gameField[i][RIGHT_WALL] = WALL;
            
        }   
        
        for (let j = 0; j < this.width; j++)
            this.gameField[CEILENG][j] = WALL;  
    }
    
    showGameField() {
        
        let str = '';
        
        for (const row of this.gameField) {

            for (const col of row) {

                str += col;
            }   
            console.log(str);
            str = '';
        }
    }
    
    getCell(row, col) {
        return this.gameField[row][col];   
    } 
    
    
    setCell(row, col, value) {
        this.gameField[row][col] = value;
    }  
}


const fieldOfGame = new FieldOfGame(SPACE,WIDTH,HEIGHT);


const updateGame = () => {

    console.clear();
    fieldOfGame.updateGameField();
    putRacket(fieldOfGame);
    ball.moveBall(fieldOfGame);
    fieldOfGame.showGameField();
    ball.checkEnd();
    ball.checkScore();

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
