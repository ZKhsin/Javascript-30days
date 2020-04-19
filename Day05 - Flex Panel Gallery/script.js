const panels = document.querySelectorAll(".panel");
// ADD
let lastClick = document.querySelector(".panels")

function toggelOpen(e) {
  // ADD
  if (this !== lastClick) {
    lastClick.classList.remove('open');
    lastClick = this;
  }

  this.classList.toggle("open");
}

function toggleActive(e) {
  // console.log(e.propertyName);
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach(panel => panel.addEventListener("click", toggelOpen))
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive))
