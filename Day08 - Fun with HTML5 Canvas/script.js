const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
// ADD
const buttons = document.querySelectorAll("button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return
  // console.log(e);
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

// ADD
function checkButton() {
  // console.log(this.innerText);
  if (this.innerText === "Clear") {
    ctx.clearRect(0, 0, 1500, 1500);
    ctx.globalCompositeOperation = "source-over";
  }
  else if (this.innerText === "Lighter") {
    ctx.globalCompositeOperation = "lighter";
  }
  else if (this.innerText === "Multiply") {
    ctx.globalCompositeOperation = "multiply";
  }
}



canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
// ADD
buttons.forEach(button => button.addEventListener("click", checkButton));
