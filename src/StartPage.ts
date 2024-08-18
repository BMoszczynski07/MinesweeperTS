import Random from "./utilities/Random";

import cloud1 from "./assets/cloud-1.png";
import cloud2 from "./assets/cloud-2.png";
import cloud3 from "./assets/cloud-3.png";
import cloud4 from "./assets/cloud-4.png";
import cloud5 from "./assets/cloud-5.png";

import hover from "./assets/hover.wav";
import click from "./assets/click.wav";

class StartPage {
  isMuted = false;

  handleCreateCloud = () => {
    const startPage: HTMLDivElement | null =
      document.querySelector(".site__start-page");

    const cloudImg = document.createElement("img");

    const rand = Math.floor(new Random().handleGetInt(1, 5));
    cloudImg.src = `./assets/cloud-${rand}.png`;

    switch (rand) {
      case 1:
        cloudImg.src = cloud1;
        break;
      case 2:
        cloudImg.src = cloud2;
        break;
      case 3:
        cloudImg.src = cloud3;
        break;
      case 4:
        cloudImg.src = cloud4;
        break;
      case 5:
        cloudImg.src = cloud5;
        break;
    }

    cloudImg.classList.add("site__cloud");

    const randTop = new Random().handleGetInt(50, 200);
    cloudImg.style.top = `${randTop}px`;

    const transition = new Random().handleGetInt(27, 40);
    cloudImg.style.transition = `transform ${transition}s linear`;

    // Początkowa pozycja
    cloudImg.style.transform = `translateX(0)`;

    startPage?.appendChild(cloudImg);

    requestAnimationFrame(() => {
      // Zapewnijmy, że zmiana pozycji transformacji nastąpi po dodaniu elementu do DOM
      requestAnimationFrame(() => {
        cloudImg.style.transform = `translateX(calc(-${window.innerWidth}px - 400px))`;
      });
    });

    setTimeout(() => {
      startPage?.removeChild(cloudImg);
    }, 40000);
  };

  handleMoveClouds = () => {
    this.handleCreateCloud();

    setInterval(() => this.handleCreateCloud(), 5000);
  };

  constructor() {
    const btns = document.querySelectorAll("button");

    for (const btn of btns) {
      btn.addEventListener("mouseover", () => {
        if (!this.isMuted) {
          const audio = new Audio();
          audio.src = hover;

          audio.play();
        }
      });

      btn.addEventListener("click", () => {
        if (!this.isMuted) {
          const audio = new Audio();
          audio.src = click;

          audio.play();
        }
      });
    }
  }
}

export default StartPage;
