const container = document.querySelector(".cvs2 .anima-container");
const t2 = document.querySelector(".cvs2 .t2");
let triggerC = 0;

function makeACup(top, left) {
  let bottle = document.createElement("div");
  bottle.classList.add("bottle");
  bottle.style.color = "rgba(80,80,80,0.8)";
  let cup = document.createElement("div");
  cup.classList.add("cup");
  let flow = document.createElement("div");
  flow.classList.add("flow");
  let box = document.createElement("div");
  box.classList.add("box");
  box.append(bottle, flow, cup);
  container.append(box);
  if (top !== undefined) {
    box.style.top = `${top}px`;
  }
  if (left !== undefined) {
    box.style.left = `${left}px`;
  }

  let startTime = undefined;
  box.style.opacity = 0;
  bottle.style.transform = `translate(3px,32px)`;
  cup.style.color = `rgba(80,80,80,0.35)`;

  function animation() {
    if (!(bottle && cup && flow && box)) return;
    if (startTime === undefined) {
      startTime = Date.now();
    }
    const currentTime = Date.now();
    const interval = currentTime - startTime;
    if (interval > 2000) {
      box.remove();
      bottle = undefined;
      cup = undefined;
      flow = undefined;
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
      cup.style.color = `rgba(${interval * 0.07 + 66},80,80,${
        interval * 0.00065 + 0.22
      })`;
      flow.style.width = `${ti * 0.006}px`;
      flow.style.transform = `translateX(${-ti * 0.003}px)`;
    }

    requestAnimationFrame(animation);
  }
  setTimeout(()=>{
    triggerC = 50;
  },200)
  
  requestAnimationFrame(animation);
}
function triggerAnima() {
  if(triggerC > 0){
    t2.style.opacity = triggerC/50;
    triggerC--;
  }else{
    t2.style.opacity = 0;
  }
  requestAnimationFrame(triggerAnima);
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
}

init();
