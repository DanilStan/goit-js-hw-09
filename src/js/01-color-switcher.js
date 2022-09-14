const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
buttonStop.disabled = true;

buttonStart.addEventListener('click', onButtonStart);
buttonStop.addEventListener('click', onButtonStop);

function onButtonStart() {
  document.body.style.backgroundColor = getRandomHexColor();
  buttonStatus(true, false);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStop() {
  buttonStatus(false, true);
  document.body.style.backgroundColor = '#fff';
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function buttonStatus(open, close) {
  buttonStart.disabled = open;
  buttonStop.disabled = close;
}
