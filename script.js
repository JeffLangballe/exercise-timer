function makeTimer(seconds, oncomplete) {
  const timerTimeEl = document.getElementById("timer-time");
  const timerNameEl = document.getElementById("timer-name");
  let startTime = seconds * 100;
  let timerId;
  let ms = seconds * 1000;
  let timerObj = {};
  timerObj.running = false;

  timerObj.resume = () => {
    timerObj.running = true;
    timerNameEl.innerText = "Timer is running";
    startTime = new Date().getTime();
    timerId = setInterval(timerObj.step, 250); // adjust this number to affect granularity
    // lower numbers are more accurate, but more CPU-expensive
  };

  timerObj.pause = () => {
    timerObj.running = false;
    timerNameEl.innerText = "Timer is paused";
    ms = timerObj.step();
    clearInterval(timerId);
  };

  timerObj.step = () => {
    let now = Math.max(0, ms - (new Date().getTime() - startTime)),
      m = Math.floor(now / 60000),
      s = Math.ceil(now / 1000) % 60;
    s = (s < 10 ? "0" : "") + s;
    timerTimeEl.innerText = m + ":" + s;
    if (now == 0) {
      timerObj.running = false;
      clearInterval(timerId);
      timerObj.resume = () => {};
      if (oncomplete) oncomplete();
    }
    return now;
  };

  return timerObj;
}

let t = makeTimer(10, () => {
  const timerNameEl = document.getElementById("timer-name");
  timerNameEl.innerText = "Timer is done!";
});

function pauseResume() {
  console.log("pause/resume");
  if (t.running) t.pause();
  else t.resume();
}
