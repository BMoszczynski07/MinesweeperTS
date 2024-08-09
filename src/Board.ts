import StartPage from "./StartPage";
import Timer from "./Timer";
import Random from "./utilities/Random";

class Board extends StartPage {
  board: HTMLButtonElement[][] = [];
  boardSize: number | null = null;
  difficulty: "easy" | "medium" | "hard" | null = null;

  timer: Timer = new Timer();

  currentPos: [number, number] | [null, null] = [null, null];

  tileClickHandler: { [key: number]: (event: Event) => void } = {};

  bigFieldFound = false;
  clickFieldSound = false;

  flagsQty: number | null = 0;

  isGameStarted = false;

  explosionsInterval: number | null = null;

  handleCountBombs = (tileX: number, tileY: number): number => {
    let bombsQty = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          this.board[tileY + i] !== undefined &&
          this.board[tileY + i][tileX + j] !== undefined &&
          this.board[tileY + i][tileX + j].classList.contains(
            "site__board-tile--bomb"
          )
        ) {
          bombsQty++;
        }
      }
    }

    return bombsQty;
  };

  handleRevealTiles(tileX: number, tileY: number) {
    if (
      this.board[tileY] !== undefined &&
      this.board[tileY][tileX] !== undefined
    ) {
      if (
        this.board[tileY][tileX].classList.contains(
          "site__board-tile--marked"
        ) ||
        this.board[tileY][tileX].classList.contains("site__board-tile--bomb")
      )
        return;

      const countBombs = this.handleCountBombs(tileX, tileY);

      switch (countBombs) {
        case 0:
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              this.handleRevealTiles(tileX + j, tileY + i);
            }
          }

          this.bigFieldFound = true;
          return;
        case 1:
          this.board[tileY][tileX].textContent = "1";
          this.board[tileY][tileX].style.color = "#4453db";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 2:
          this.board[tileY][tileX].textContent = "2";
          this.board[tileY][tileX].style.color = "#0de00d";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 3:
          this.board[tileY][tileX].textContent = "3";
          this.board[tileY][tileX].style.color = "#ba0b0b";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 4:
          this.board[tileY][tileX].textContent = "4";
          this.board[tileY][tileX].style.color = "#4a077a";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 5:
          this.board[tileY][tileX].textContent = "5";
          this.board[tileY][tileX].style.color = "#a7a516";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 6:
          this.board[tileY][tileX].textContent = "6";
          this.board[tileY][tileX].style.color = "#3ededb";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 7:
          this.board[tileY][tileX].textContent = "7";
          this.board[tileY][tileX].style.color = "#de7b12";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
        case 8:
          this.board[tileY][tileX].textContent = "8";
          this.board[tileY][tileX].style.color = "#5c3104";
          this.board[tileY][tileX].classList.add("site__board-tile--marked");
          this.clickFieldSound = true;
          break;
      }
    }
  }

  handleCheckBomb = (pos: number) => {
    let row: number;
    let col: number;

    if (this.boardSize) {
      row = Math.floor(pos / this.boardSize);
      col = pos % this.boardSize;

      this.currentPos = [row, col];

      if (this.board[row][col].classList.contains("site__board-tile--bomb")) {
        const bombsPositions: HTMLButtonElement[] = [];

        if (this.boardSize)
          for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
              if (
                this.board[i][j].classList.contains("site__board-tile--bomb")
              ) {
                bombsPositions.push(this.board[i][j]);
              }
            }
          }

        this.explosionsInterval = setInterval(() => {
          bombsPositions[0].classList.add("site__board-tile--explosion");

          bombsPositions.shift();

          if (!this.isMuted) {
            const explosion = new Audio();

            explosion.src = "./src/assets/explosion.wav";

            explosion.play();
          }
        }, 1000 / this.boardSize + 200);

        return;
      }

      if (this.board[row][col].classList.contains("site__board-tile--flag")) {
        this.board[row][col].classList.remove("site__board-tile--flag");
        if (this.flagsQty) this.flagsQty++;

        const flagsVal: HTMLParagraphElement | null = document.querySelector(
          ".site__board-flags > .site__board-val"
        );

        if (flagsVal) flagsVal.textContent = `${this.flagsQty}`;
      }

      const countBombs = this.handleCountBombs(col, row);

      this.clickFieldSound = false;

      if (countBombs > 0) {
        this.handleRevealTiles(this.currentPos[1], this.currentPos[0]);
      } else {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            this.handleRevealTiles(
              this.currentPos[1] + j,
              this.currentPos[0] + i
            );
          }
        }
      }

      if (!this.bigFieldFound && !this.isMuted && this.clickFieldSound) {
        const clickField = new Audio();

        clickField.src = "./src/assets/click-field.wav";

        clickField.play();
      }

      if (this.bigFieldFound && !this.isMuted) {
        this.bigFieldFound = false;

        const boardElement: HTMLDivElement | null =
          document.querySelector(".site__board");

        if (boardElement) {
          boardElement.classList.remove("site__board--move");

          // Wymuszenie reflow przez odczyt właściwości offsetWidth
          void boardElement.offsetWidth;

          boardElement.classList.add("site__board--move");
        }

        const bigField = new Audio();

        bigField.src = "./src/assets/big-field.wav";

        bigField.play();
      }
    }
  };

  handleClickTile = (pos: number) => {
    if (this.boardSize)
      this.currentPos = [
        Math.floor(pos / this.boardSize),
        pos % this.boardSize,
      ];

    this.handlePlaceBombs();

    this.handleCheckBomb(pos);

    if (this.boardSize) {
      for (let i = 0; i < this.boardSize * this.boardSize; i++) {
        const row = Math.floor(i / this.boardSize);
        const col = i % this.boardSize;

        this.board[row][col].removeEventListener(
          "click",
          this.tileClickHandler[i]
        );

        this.board[row][col].addEventListener("click", () => {
          this.handleCheckBomb(i);
        });

        this.board[row][col].addEventListener("contextmenu", (e: Event) => {
          e.preventDefault();

          if (
            this.board[row][col].classList.contains("site__board-tile--marked")
          )
            return;

          // Pobranie stanu płytki (czy ma flagę czy nie)
          const hasFlag = this.board[row][col].classList.contains(
            "site__board-tile--flag"
          );

          if (hasFlag) {
            // Usuwanie flagi
            this.board[row][col].classList.remove("site__board-tile--flag");
            if (this.flagsQty !== null) this.flagsQty++; // Zwiększenie licznika dostępnych flag
          } else {
            // Dodawanie flagi, ale tylko wtedy, gdy są dostępne flagi
            if (this.flagsQty !== null && this.flagsQty > 0) {
              this.board[row][col].classList.add("site__board-tile--flag");
              this.flagsQty--; // Zmniejszenie licznika dostępnych flag
            } else {
              // Jeśli nie ma dostępnych flag, wyjdź z funkcji
              return;
            }
          }

          // Zawsze aktualizujemy licznik flag w UI
          const flagVal: HTMLDivElement | null = document.querySelector(
            ".site__board-flags > .site__board-val"
          );
          if (flagVal) {
            flagVal.textContent = `${this.flagsQty}`;
          }

          // Odtwarzanie dźwięku flagi, jeśli dźwięk nie jest wyciszony
          if (!this.isMuted) {
            const flagFlap = new Audio();
            flagFlap.src = "./src/assets/flag-flap.mp3";
            flagFlap.play();
          }

          return false;
        });
      }
    }
  };

  handlePlaceBombs = () => {
    let bombsQty = null;

    switch (this.difficulty) {
      case "easy":
        bombsQty = 10;
        break;
      case "medium":
        bombsQty = 30;
        break;
      case "hard":
        bombsQty = 50;
        break;
    }

    if (bombsQty) {
      for (let i = 0; i < bombsQty; i++) {
        let bombX = 0;
        let bombY = 0;

        while (
          (bombX == this.currentPos[1] && bombY == this.currentPos[0]) ||
          this.board[bombY][bombX].classList.contains(
            "site__board-tile--bomb"
          ) ||
          (this.currentPos[0] &&
            this.currentPos[1] &&
            this.boardSize &&
            Math.abs(bombX - this.currentPos[1]) < this.boardSize / 5 &&
            Math.abs(bombY - this.currentPos[0]) < this.boardSize / 5)
        ) {
          if (this.boardSize) {
            bombX = new Random().handleGetInt(0, this.boardSize - 1);
          }

          if (this.boardSize) {
            bombY = new Random().handleGetInt(0, this.boardSize - 1);
          }
        }

        this.board[bombY][bombX].classList.add("site__board-tile--bomb");
      }
    }

    const boardElement = document.querySelector(".site__board");

    boardElement?.classList.add("site__board--move");

    if (!this.isMuted) {
      const boardMoveAudio = new Audio();

      boardMoveAudio.src = "./src/assets/big-field.wav";

      boardMoveAudio.play();
    }
  };

  handleAddTile = (boardElement: HTMLDivElement | null, i: number) => {
    const newTile = document.createElement("button");

    newTile.classList.add("site__board-tile");

    if (i % 2 == 0) {
      newTile.classList.add("site__board-tile--light-green");
    } else {
      newTile.classList.add("site__board-tile--dark-green");
    }

    if (this.boardSize) {
      const row = Math.floor(i / this.boardSize);
      const col = i % this.boardSize;

      if (!this.board[row]) {
        this.board[row] = [];
      }

      this.board[row][col] = newTile;
    }

    this.tileClickHandler[i] = () => {
      this.handleClickTile(i);
    };

    newTile.addEventListener("click", this.tileClickHandler[i]);

    boardElement?.appendChild(newTile);
  };

  handleStartGame = () => {
    this.isGameStarted = true;

    this.timer.handleStartTime();
  };

  handleGenerateBoard = (difficulty: "easy" | "medium" | "hard") => {
    const boardElement: HTMLDivElement | null =
      document.querySelector(".site__board");

    const flags: HTMLParagraphElement | null = document.querySelector(
      ".site__board-flags > .site__board-val"
    );

    switch (difficulty) {
      case "easy":
        if (boardElement) boardElement.style.width = "225px";
        if (boardElement) boardElement.style.height = "225px";
        this.flagsQty = 10;
        if (flags) flags.textContent = `${this.flagsQty}`;
        this.boardSize = 9;
        this.difficulty = "easy";

        for (let i = 0; i < 9 * 9; i++) {
          this.handleAddTile(boardElement, i);
        }
        break;
      case "medium":
        if (boardElement) boardElement.style.width = "325px";
        if (boardElement) boardElement.style.height = "325px";
        this.flagsQty = 30;
        if (flags) flags.textContent = `${this.flagsQty}`;
        this.boardSize = 13;
        this.difficulty = "medium";

        for (let i = 0; i < 13 * 13; i++) {
          this.handleAddTile(boardElement, i);
        }
        break;
      case "hard":
        if (boardElement) boardElement.style.width = "375px";
        if (boardElement) boardElement.style.height = "375px";
        this.flagsQty = 50;
        if (flags) flags.textContent = `${this.flagsQty}`;
        this.boardSize = 15;
        this.difficulty = "hard";

        for (let i = 0; i < 15 * 15; i++) {
          this.handleAddTile(boardElement, i);
        }
        break;
      default:
        console.error("nieprawidłowy poziom trudności");
        break;
    }

    this.handleStartGame();
  };

  handlePickDifficulty = () => {
    const difficulty: HTMLDivElement | null =
      document.querySelector(".site__difficulty");
    const boardOverlay: HTMLDivElement | null = document.querySelector(
      ".site__board-overlay"
    );

    const difficultyHeader = document.querySelector(
      ".site__play-difficulty-header"
    );

    const difficultyEasy = document.querySelector(".site__btn--green");
    const difficultyNormal = document.querySelector(".site__btn--yellow");
    const difficultyHard = document.querySelector(".site__btn--red");

    difficultyHeader?.classList.add("site__play-difficulty-header--out");
    difficultyEasy?.classList.add("site__btn--green--out");
    difficultyNormal?.classList.add("site__btn--yellow--out");
    difficultyHard?.classList.add("site__btn--red--out");

    setTimeout(() => {
      if (difficulty) difficulty.style.display = "none";
      if (boardOverlay) boardOverlay.style.display = "flex";
    }, 700);
  };

  handleChooseDifficulty = () => {
    const startGameBtn = document.querySelector(".site__start-game-btn");

    startGameBtn?.addEventListener("click", () => {
      const start: HTMLDivElement | null =
        document.querySelector(".site__start");
      const difficulty: HTMLDivElement | null =
        document.querySelector(".site__difficulty");

      const play_header = document.querySelector(".site__play-header");
      const play_subtitle = document.querySelector(".site__play-subtitle");
      const start_game_btn = document.querySelector(".site__start-game-btn");

      play_header?.classList.add("site__play-header--out");
      play_subtitle?.classList.add("site__play-subtitle--out");
      start_game_btn?.classList.add("site__start-game-btn--out");

      setTimeout(() => {
        if (start) start.style.display = "none";
        if (difficulty) difficulty.style.display = "flex";

        const difficultyEasy = document.querySelector(".site__btn--green");
        const difficultyNormal = document.querySelector(".site__btn--yellow");
        const difficultyHard = document.querySelector(".site__btn--red");

        difficultyEasy?.addEventListener("click", () => {
          if (this.isGameStarted) return;

          this.handlePickDifficulty();
          this.handleGenerateBoard("easy");
        });

        difficultyNormal?.addEventListener("click", () => {
          if (this.isGameStarted) return;

          this.handlePickDifficulty();
          this.handleGenerateBoard("medium");
        });

        difficultyHard?.addEventListener("click", () => {
          if (this.isGameStarted) return;

          this.handlePickDifficulty();
          this.handleGenerateBoard("hard");
        });
      }, 600);
    });
  };

  constructor() {
    super();
  }
}

export default Board;
