const container = document.querySelector(".cvs .anima-container");
const t2 = document.querySelector(".cvs .t2");
const bar = document.querySelector(".cvs .bar");
const cupCenter = document.querySelector(".cvs .cup-center");
const trash = document.querySelector(".cvs .trash");
let triggerC = 0;
let trashC = 0;
const trashCMax = 50;
let arcTime = undefined;

function makeACup(top, left) {
  let bottle = document.createElement("div");
  bottle.classList.add("bottle");
  bottle.style.color = "rgba(80,80,80,0.8)";
  let flow = document.createElement("div");
  flow.classList.add("flow");
  let flowNext = document.createElement("div");
  flowNext.classList.add("flow-next");
  let box = document.createElement("div");
  box.classList.add("box");
  box.append(bottle, flow, flowNext);
  container.append(box);
  if (top !== undefined) {
    box.style.top = `${top}px`;
    flow.style.height = `${220 - 80 - top}px`;
  }
  if (left !== undefined) {
    box.style.left = `${left}px`;
  }

  let startTime = undefined;
  box.style.opacity = 0;
  bottle.style.transform = `translate(3px,32px)`;

  function animation() {
    if (!(bottle && flow && flowNext && box)) return;
    if (startTime === undefined) {
      startTime = Date.now();
      if (arcTime === undefined) {
        setTimeout(() => {
          arcTime = startTime + 200;
          triggerC = 50;
        }, 200);
      }else{
        setTimeout(() => {
          trashC = trashCMax;
        }, 200);
      }
    }
    const currentTime = Date.now();
    const interval = currentTime - startTime;
    if (interval > 2000) {
      box.remove();
      bottle = undefined;
      flow = undefined;
      flowNext = undefined;
      box = undefined;
      return;
    }
    if (interval <= 200) {
      box.style.opacity = interval * 0.01;
    } else if (interval >= 1800) {
      box.style.opacity = (2000 - interval) * 0.01;
    } else {
      box.style.opacity = 1;
      const ti = Math.min(interval - 200, 1800 - interval);
      bottle.style.transform = `translate(3px,32px) rotate(${ti / 10}deg) `;
      flow.style.width = `${ti * 0.006}px`;
      flow.style.transform = `translateX(${-ti * 0.003}px)`;
    }

    requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}
function triggerAnima() {
  if (triggerC > 0) {
    t2.style.opacity = triggerC / 50;
    cupCenter.style.color = `rgba(${80 + triggerC*(175/50)},80,80,${0.35+triggerC*(0.65/50)})`;
    triggerC--;
  } else {
    cupCenter.style.color = ''
    t2.style.opacity = 0;
  }
  requestAnimationFrame(triggerAnima);
}
function trashAnima() {
  if (trashC > 0) {
    trash.style.color = `rgba(${80 + trashC*(175/trashCMax)},80,80,${0.35+trashC*(0.65/trashCMax)})`;
    trashC--;
  } else {
    trash.style.color = ''
  }
  requestAnimationFrame(trashAnima);
}
function barAnima() {
  if (arcTime === undefined) {
    bar.style.width = "0";
  } else {
    const interval = Date.now() - arcTime;
    if (interval >= 1600) {
      arcTime = undefined;
      bar.style.width = "0";
    } else {
      bar.style.width = `${interval / 16}%`;
    }
  }
  requestAnimationFrame(barAnima);
}

const timeline = [
  [100, 0, 1000],
  [100, 100, 1600],
  [120, 150, 2000],
  [80, 80, 2300],
  [110, 200, 2600],
  [80, 100, 3000],
  [80, 300, 3600],
  [100, 210, 4000],
];

function init() {
  for (let i = 0; i < timeline.length; i++) {
    setTimeout(() => makeACup(timeline[i][0], timeline[i][1]), timeline[i][2]);
  }
  requestAnimationFrame(triggerAnima);
  requestAnimationFrame(trashAnima);
  requestAnimationFrame(barAnima);
}

init();
