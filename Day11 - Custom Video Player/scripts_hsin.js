const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const screenButton = player.querySelector(".fullScreen");

// Modify
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  const icon = video.paused
    ? `<i class="fas fa-pause"></i>`
    : `<i class="fas fa-play"></i>`;
  toggle.innerHTML = icon;
  video[method]();
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen(); // Chrome, Safari & Opera
  } else if (video.msRequestFullscreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.mozRequestFullScreen) {
    video.msRequestFullscreen(); // IE/Edge
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// ADD
screenButton.addEventListener("click", fullScreen);
