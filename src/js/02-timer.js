import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const start = document.querySelector('[data-start]');
start.disabled = true;

const datetimePicker = document.querySelector('#datetime-picker');

const daysDisp = document.querySelector('[data-days]');
const hoursDisp = document.querySelector('[data-hours]');
const minutesDisp = document.querySelector('[data-minutes]');
const secondsDisp = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    start.disabled = true;

    const date = new Date();
    if (selectedDates[0] <= date) {
      window.alert('Please choose a date in the future');
      return;
    }

    start.disabled = false;
  },
};

const picker = flatpickr('#datetime-picker', options);

start.addEventListener('click', () => {
  start.disabled = true;
  datetimePicker.disabled = true;

  let timer = setInterval(() => {
    const date = new Date();
    const currentTimer = new Date(picker.selectedDates[0] - date);

    if (currentTimer < 0) {
      clearInterval(timer);
      datetimePicker.disabled = false;
      updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    updateDisplay(convertMs(currentTimer));
  }, 1000);
});

//Трошки зменьшив підрахунки
function convertMs(ms) {
  const sec = ms / 1000;
  const min = sec / 60;
  const hour = min / 60;

  const days = Math.floor(hour / 24);
  const hours = Math.floor(hour % 24);
  const minutes = Math.floor(min % 60);
  const seconds = Math.floor(sec % 60);

  return { days, hours, minutes, seconds };
}

function updateDisplay({ days, hours, minutes, seconds }) {
  daysDisp.textContent = addLeadingZero(days);
  hoursDisp.textContent = addLeadingZero(hours);
  minutesDisp.textContent = addLeadingZero(minutes);
  secondsDisp.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
