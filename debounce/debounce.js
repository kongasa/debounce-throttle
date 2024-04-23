const t1 = document.querySelector(".cvs .t1");
const t2 = document.querySelector(".cvs .t2-2");
const basketball = document.querySelector(".cvs .basketball");
const bar = document.querySelector(".cvs .bar");
const timer = document.querySelector(".cvs .timer");
const wave = document.querySelector(".cvs .wave");

let startTime = undefined;
let v = 0;
let h = 200; // px
const a = -1;
let bouncing = false;
let c = 0;
let triggerC = 0;
let closeToZero = 0;

function init() {
  v = 0;
  h = 200;
  bouncing = true;
  c = 0;
  bar.style.width = "0%";
  bar.style.backgroundColor = "#50505050";
  setTimeout(() => {
    requestAnimationFrame(bounceAni);
  }, 1000);
}

function bounceAni(time) {
  if (bouncing) {
    const t = time * 0.0001;
    v = v + a * t;
    h = h + v * t;
    if (h <= 0) {
      startTime = Date.now();
      v = -v * 0.9;
      h = 0;
      c = 20;
      makeCircle();
    }
  }
  if (c > 0) {
    t1.style.color = "black";
    c--;
  } else {
    t1.style.color = "";
  }
  if (triggerC > 0) {
    t2.style.color = "red";
    t2.style.opacity = triggerC / 50;
    if (triggerC === 50) {
      makeCircle(true);
    }
    triggerC--;
  } else {
    t2.style.color = "";
  }

  if (bouncing && Math.abs(h) <= 1 && Math.abs(v) < 0.5) {
    t1.innerHTML =
      "<span style='color: red;'>stopped</span><span style='color: black;'> on the ground</span>";
    startTime = Date.now();
    setTimeout(() => {
      triggerC = 50;
    }, 2000);
    bouncing = false;
  }
  basketball.style.transform = `translateY(${200 - h}px)`;
  if (startTime!==undefined) {
    const perc = Math.min(100, (Date.now() - startTime) / 20);
    bar.style.width = `${perc}%`;
    bar.style.backgroundColor = `rgba(${(perc * 175) / 255 + 80}, 80, 80,${
      ((perc * 175) / 255 + 80) / 255
    })`;
    const dur = Math.round((Date.now() - startTime) / 100) / 10;
    timer.innerHTML = `${dur > 3 ? "3+" : dur}s`;
  }

  requestAnimationFrame(bounceAni);
}

init();

function makeCircle(isRed) {
  let circle = document.createElement("div");
  circle.classList.add("bounce-circle");
  if (isRed) {
    circle.classList.add("bounce-circle-red");
  }

  wave.appendChild(circle);
  const sT = Date.now();
  function a() {
    if (!circle) return;
    circle.style.transform = `scale(${(Date.now() - sT) / 4})`;
    requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
  setTimeout(() => {
    wave.removeChild(circle);
    circle = undefined;
  }, 500);
}
