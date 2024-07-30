import Board from "./Board";
import StartPage from "./StartPage";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const start = new StartPage();
  const board = new Board();

  start.handleMoveClouds();
  board.handleChooseDifficulty();
});
