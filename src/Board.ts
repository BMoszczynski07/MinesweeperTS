import StartPage from "./StartPage";

class Board extends StartPage {
  board: HTMLButtonElement[] = [];

  handleGenerateBoard = () => {};

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
        });

        difficultyNormal?.addEventListener("click", () => {
          this.handlePickDifficulty();
        });

        difficultyHard?.addEventListener("click", () => {
          this.handlePickDifficulty();
        });
      }, 600);
    });
  };

  constructor() {
    super();
  }
}

export default Board;
