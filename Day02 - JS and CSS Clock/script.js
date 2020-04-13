const secondsHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hoursHand = document.querySelector('.hour-hand');

// ADD
const today = document.createElement("div");
today.classList.add("time");
document.body.appendChild(today);

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + 90;
  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;

  // ADD
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  today.innerHTML = `${year}/${month}/${date}  ${hours}:${mins}:${seconds}`;
}

setInterval(setDate, 1000);