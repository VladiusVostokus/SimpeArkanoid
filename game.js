"use strict";

const HEIGHT = 20;
const WIDTH = 50;
const END_OF_FIELD = HEIGHT - 1;
const LEFT_WALL = 0;
const RIGHT_WALL = WIDTH - 1;
const CEILENG = 0;

const WIN_SCORE = 10;

const TIMEOUT = 60;

const WALL = "#";
const SPACE = " ";
const RACKET = "@";
const BALL = "*";

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding("utf8");


const RACKET_LEN = 6;
const RACKET_X = Math.round((WIDTH - RACKET_LEN) / 2);
const RACKET_Y = HEIGHT - 2;

class Racket {
  constructor(symbol, y, x) {
    this.y = y;
    this.x = x;
    this.len = RACKET_LEN;
    this.symbol = symbol;
  }

  putRacket(gamefield) {
    for (let i = this.x; i < this.x + this.len; i++) {
      gamefield.setCell(this.y, i, RACKET);
    }
  }

  moveLeft() {
    --this.x;
    if (this.x < LEFT_WALL + 1) this.x = 1;
  }

  moveRight() {
    ++this.x;
    if (this.x + this.len >= WIDTH) this.x = RIGHT_WALL - this.len;
  }
}

const racket = new Racket(RACKET, RACKET_Y, RACKET_X);

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

    const leftX = gamefield.getCell(this.y, prevX);
    const rightX = gamefield.getCell(this.y, nextX);

    const aboveY = gamefield.getCell(prevY, this.x);
    const belowY = gamefield.getCell(nextY, this.x);

    if (leftX === WALL || rightX === WALL) this.xChanger = -this.xChanger;

    if (aboveY === WALL || belowY === WALL) this.yChanger = -this.yChanger;

    if (belowY === RACKET) {
      this.score++;
      this.yChanger = -this.yChanger;
    }

    this.x += this.xChanger;
    this.y -= this.yChanger;

    gamefield.setCell(this.y, this.x, this.symbol);
  }

  checkEnd() {
    if (this.y === END_OF_FIELD) {
      console.log("Game over, your score =", this.score);
      process.exit(0);
    }
  }

  checkScore() {
    if (this.score === WIN_SCORE) {
      console.log("Congratulation!!!");
      process.exit(0);
    }
  }
}

const ball = new Ball(BALL, 10, 30);

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
      const row = this.gameField[i];
      row[LEFT_WALL] = WALL;
      row[RIGHT_WALL] = WALL;
    }

    for (let j = 0; j < this.width; j++) this.gameField[CEILENG][j] = WALL;
  }

  showGameField() {
    const rows = this.gameField.map(row => row.join(''));
    const field = rows.join('\n');
    console.log(field); 
  }

  getCell(row, col) {
    return this.gameField[row][col];
  }

  setCell(row, col, value) {
    this.gameField[row][col] = value;
  }
}

const fieldOfGame = new FieldOfGame(SPACE, WIDTH, HEIGHT);

const updateGame = () => {
  console.clear();
  fieldOfGame.updateGameField();
  racket.putRacket(fieldOfGame);
  ball.moveBall(fieldOfGame);
  fieldOfGame.showGameField();
  ball.checkEnd();
  ball.checkScore();
};

const controls = {
  get a() {
    racket.moveLeft();
  },

  get d() {
    racket.moveRight();
  },

  get q() {
    console.log("game over");
    process.exit(0);
  },
};

const action = (button) => controls[button] || (() => {});

stdin.on("data", (button) => {
  action(button);
});

setInterval(updateGame, TIMEOUT);
