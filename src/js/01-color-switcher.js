const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
stop.disabled = true;

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const reverseDisabled = () => {
  stop.disabled = !stop.disabled;
  start.disabled = !start.disabled;
};

start.addEventListener('click', () => {
  reverseDisabled();
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stop.addEventListener('click', () => {
  reverseDisabled();
  clearInterval(timer);
});
