const t1 = document.querySelector(".cvs2 .t1");
const t2 = document.querySelector(".cvs2 .t2-2");
const basketball = document.querySelector(".cvs2 .basketball");
const bar = document.querySelector(".cvs2 .bar");
const timer = document.querySelector(".cvs2 .timer");
const wave = document.querySelector(".cvs2 .wave");

let startTime = Date.now();
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
    startTime = Date.now();
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
      triggerC=50
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
    bouncing = false;
  }
  basketball.style.transform = `translateY(${200 - h}px)`;
  bar.style.width = `0`;
  bar.style.backgroundColor = '';
  timer.innerHTML = ` `;
  requestAnimationFrame(bounceAni);
}

init();

function makeCircle(isRed) {
  let circle = document.createElement('div');
  circle.classList.add('bounce-circle');
  if(isRed){
    circle.classList.add('bounce-circle-red');
  }
  
  wave.appendChild(circle);
  const sT = Date.now();
  function a() {
    if (!circle) return;
    circle.style.transform = `scale(${(Date.now() - sT)/4})`;
    requestAnimationFrame(a);
  }
  requestAnimationFrame(a);
  setTimeout(() => {
    wave.removeChild(circle);
    circle = undefined;
  }, 500);
}
