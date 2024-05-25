import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
let selectedDate = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function handleDateSelection(date) {
  if (date < new Date()) {
    refs.start.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }
  selectedDate = date;
  refs.start.disabled = false;
}

refs.start.addEventListener('click', startTimer);

function startTimer() {
  if (!selectedDate) {
    return;
  }

  intervalId = setInterval(updateTimer, 1000);
  refs.start.disabled = true;
  refs.input.disabled = true;
}

function updateTimer() {
  const differenceInTime = selectedDate - new Date();

  if (differenceInTime <= 0) {
    clearInterval(intervalId);
    refs.input.disabled = false;
    return;
  }

  const timeLeft = convertMs(differenceInTime);
  displayTimer(timeLeft);
}

function displayTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = minutes;
  refs.secs.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}