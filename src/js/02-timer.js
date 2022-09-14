import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector('button[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userTime = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      calendar.disabled = false;
      userTime = selectedDates[0].getTime();
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};
calendar.disabled = true;
flatpickr('#datetime-picker', options);

calendar.addEventListener('click', onClickButtonStart);

function onClickButtonStart() {
  calculateTime();
  intervalId = setInterval(() => {
    calculateTime();
  }, 1000);
}

function calculateTime() {
  calendar.disabled = true;
  const currentDate = new Date();
  const resoultTime = userTime - currentDate;
  const totalTime = convertMs(resoultTime);
  markupAttributeTimer(totalTime);
}

function markupAttributeTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
