function playSound(e) {
  // ADD
  let keyType = e.keyCode || this.getAttribute('data-key'); // keyboard || mouse
  // console.log(typeof keyType);
  const audio = document.querySelector(`audio[data-key="${keyType}"]`);
  const key = document.querySelector(`.key[data-key="${keyType}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');

  // ADD
  if (typeof keyType === "number") {
    key.classList.add('playing');
  } else {
    key.classList.add('click');
  }
};

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  // ADD
  this.classList.remove("playing") || this.classList.remove("click");
}




const keys = Array.from(document.querySelectorAll('.key'));
// ADD
keys.forEach(key => key.addEventListener("click", playSound));
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener('keydown', playSound);
