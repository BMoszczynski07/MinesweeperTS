class Timer {
  time = 0;
  timeInterval = 0;

  handleStartTime = () => {
    const timer = document.querySelector(
      ".site__board-clock > .site__board-val"
    );

    this.timeInterval = setInterval(() => {
      this.time++;

      if (timer)
        timer.textContent = `${
          Math.floor(this.time / 3600) >= 10
            ? Math.floor(this.time / 3600)
            : "0" + Math.floor(this.time / 3600)
        }:${
          Math.floor(this.time / 60) % 60 >= 10
            ? Math.floor(this.time / 60) % 60
            : "0" + Math.floor((this.time / 60) % 60)
        }:${this.time % 60 >= 10 ? this.time % 60 : "0" + (this.time % 60)}`;
    }, 1000);
  };

  handleStopTime = () => {
    clearInterval(this.timeInterval);
  };

  constructor() {}
}

export default Timer;
