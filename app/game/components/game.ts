// game.ts
type Ball = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
};

type Paddle = {
  width: number;
  height: number;
  x: number;
  y: number;
  speedY: number;
};

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ball: Ball;
  private player1: Paddle;
  private player2: Paddle;
  private isGameStarted: boolean;
  private player1Score: number = 0;
  private player2Score: number = 0;
  private lastScoreTime: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.ball = {x: canvas.width / 2, y: canvas.height / 2, radius: 5, speedX: 2, speedY: 2};
    this.player1 = {width: 10, height: 80, x: 0, y: canvas.height / 2 - 40, speedY: 0};
    this.player2 = {
      width: 10,
      height: 80,
      x: canvas.width - 10,
      y: canvas.height / 2 - 40,
      speedY: 0,
    };
    this.isGameStarted = false;

    this.setupControls();
    this.draw();
  }
  public startGame(): void {
    if (!this.isGameStarted) {
      this.isGameStarted = true;
      this.ball.speedX = 2; // ボールの速度を設定
      this.ball.speedY = 2;
      this.gameLoop();
    }
  }

  private setupControls(): void {
    window.addEventListener('keydown', event => {
      switch (event.key) {
        case 'w':
          this.player1.speedY = -5;
          break;
        case 's':
          this.player1.speedY = 5;
          break;
        case 'ArrowUp':
          this.player2.speedY = -5;
          break;
        case 'ArrowDown':
          this.player2.speedY = 5;
          break;
      }
    });

    window.addEventListener('keyup', event => {
      switch (event.key) {
        case 'w':
        case 's':
          this.player1.speedY = 0;
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          this.player2.speedY = 0;
          break;
      }
    });
  }

  private gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());
    this.update();
    this.draw();
  }

  private update(): void {
    this.ball.x += this.ball.speedX;
    this.ball.y += this.ball.speedY;

    if (this.ball.y < this.ball.radius || this.ball.y > this.canvas.height - this.ball.radius) {
      this.ball.speedY *= -1;
    }

    if (this.ball.x < 0 || this.ball.x > this.canvas.width) {
      if (this.ball.x < 0) {
        this.player2Score += 1;
      } else {
        this.player1Score += 1;
      }
      this.resetBall();
      this.lastScoreTime = performance.now();
    }
    // 左右のパドルに衝突したときのボールの反射
    if (this.isCollidingWithPaddle(this.player1) || this.isCollidingWithPaddle(this.player2)) {
      this.ball.speedX *= -1;
    }

    // パドルの動き
    this.player1.y += this.player1.speedY;
    this.player2.y += this.player2.speedY;
    this.player1.y = Math.max(this.player1.y, 0);
    this.player1.y = Math.min(this.player1.y, this.canvas.height - this.player1.height);
    this.player2.y = Math.max(this.player2.y, 0);
    this.player2.y = Math.min(this.player2.y, this.canvas.height - this.player2.height);
  }

  private isCollidingWithPaddle(paddle: Paddle): boolean {
    return (
      this.ball.x - this.ball.radius < paddle.x + paddle.width &&
      this.ball.x + this.ball.radius > paddle.x &&
      this.ball.y - this.ball.radius < paddle.y + paddle.height &&
      this.ball.y + this.ball.radius > paddle.y
    );
  }

  private resetBall(): void {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.speedX = 0;
    this.ball.speedY = 0;

    setTimeout(() => {
      this.ball.speedX = 2; // またはランダムな方向
      this.ball.speedY = 2; // またはランダムな方向
    }, 3000); // 3秒後にボールを再開
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
    this.context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
    if (this.lastScoreTime && performance.now() - this.lastScoreTime < 3000) {
      // スコアを表示するロジック
      this.context.fillText(`Player 1: ${this.player1Score}`, 100, 50);
      this.context.fillText(`Player 2: ${this.player2Score}`, this.canvas.width - 200, 50);
    }
  }
}
