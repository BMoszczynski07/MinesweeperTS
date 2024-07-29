import StartPage from "./StartPage";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const start = new StartPage();

  start.handleMoveClouds();
});
