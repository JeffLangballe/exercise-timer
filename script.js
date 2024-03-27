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
            timerObj.clear()
            if (oncomplete) oncomplete();
        }
        return now;
    };

    timerObj.clear = () => {
        timerObj.running = false;
        clearInterval(timerId);
        timerObj.resume = () => { };
    }

    return timerObj;
}

function onTimerDone() {
    const timerNameEl = document.getElementById("timer-name");
    timerNameEl.innerText = "Timer is done!";
}

let t = makeTimer(10, onTimerDone);

function pauseResume() {
    console.log("pause/resume");
    if (t.running) t.pause();
    else t.resume();
}

function reset() {
    t.clear();
    document.getElementById("timer-name").innerText = "Timer is reset"
    document.getElementById("timer-time").innerText = "X:XX"
    t = makeTimer(10, onTimerDone);
}
