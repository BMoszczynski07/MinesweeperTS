import Random from "./utilities/Random";

class StartPage {
  isMuted = false;

  handleCreateCloud = () => {
    const startPage: HTMLDivElement | null =
      document.querySelector(".site__start-page");

    const cloudImg = document.createElement("img");

    const rand = Math.floor(new Random().handleGetInt(1, 5));
    cloudImg.src = `./src/assets/cloud-${rand}.png`;

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
          audio.src = "./src/assets/hover.wav";

          audio.play();
        }
      });

      btn.addEventListener("click", () => {
        if (!this.isMuted) {
          const audio = new Audio();
          audio.src = "./src/assets/click.wav";

          audio.play();
        }
      });
    }
  }
}

export default StartPage;