import StartPage from "./StartPage";
import Timer from "./Timer";
import Random from "./utilities/Random";

class Board extends StartPage {
  board: HTMLButtonElement[][] = [];
  boardSize: number | null = null;
  difficulty: "easy" | "medium" | "hard" | null = null;

  timer: Timer = new Timer();

  currentPos: [number, number] | [null, null] = [null, null];

  handlePlaceBombs = () => {
    let bombsQty = null;

    switch (this.difficulty) {
      case "easy":
        bombsQty = 10;
        break;
      case "medium":
        bombsQty = 40;
        break;
      case "hard":
        bombsQty = 75;
        break;
    }

    if (bombsQty) {
      for (let i = 0; i < bombsQty; i++) {
        let bombX = 0;
        let bombY = 0;

        console.log(this.board);

        while (
          (bombX == this.currentPos[1] && bombY == this.currentPos[0]) ||
          this.board[bombY][bombX].classList.contains("site__board-tile--bomb")
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
  };

  handleClickTile = (pos: number) => {
    if (this.boardSize)
      this.currentPos = [
        Math.floor(pos / this.boardSize),
        pos % this.boardSize,
      ];

    this.handlePlaceBombs();
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

    console.log();

    newTile.addEventListener("click", () => {
      this.handleClickTile(i);
    });

    boardElement?.appendChild(newTile);
  };

  handleStartGame = () => {
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
        if (flags) flags.textContent = "10";
        this.boardSize = 9;
        this.difficulty = "easy";

        for (let i = 0; i < 9 * 9; i++) {
          this.handleAddTile(boardElement, i);
        }
        break;
      case "medium":
        if (boardElement) boardElement.style.width = "325px";
        if (boardElement) boardElement.style.height = "325px";
        if (flags) flags.textContent = "40";
        this.boardSize = 13;
        this.difficulty = "medium";

        for (let i = 0; i < 13 * 13; i++) {
          this.handleAddTile(boardElement, i);
        }
        break;
      case "hard":
        if (boardElement) boardElement.style.width = "375px";
        if (boardElement) boardElement.style.height = "375px";
        if (flags) flags.textContent = "75";
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
          this.handlePickDifficulty();
          this.handleGenerateBoard("easy");
        });

        difficultyNormal?.addEventListener("click", () => {
          this.handlePickDifficulty();
          this.handleGenerateBoard("medium");
        });

        difficultyHard?.addEventListener("click", () => {
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
