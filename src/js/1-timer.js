// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const labels = [...document.querySelectorAll('.label')];
const valueTime = [...document.querySelectorAll('.value')];

labels.forEach(item => (item.textContent = item.textContent.toUpperCase()));

let userSelectedDate;
let dateNow;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    dateNow = new Date();
    if (userSelectedDate < dateNow) {
      //window.alert('Please choose a date in the future');
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      btnStart.disabled = false;
      valueTime.forEach((item, index) => (valueTime[index].textContent = '00'));
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onClickStart);

function onClickStart(event) {
  btnStart.disabled = true;
  selector.disabled = true;
  let diffDate = userSelectedDate - dateNow;
  let difference = convertMs(diffDate);

  if (diffDate > 0) {
    const timerId = setInterval(() => {
      countDown(diffDate);
      diffDate -= 1000; // Коректно обчислюємо залишок часу

      if (diffDate <= 0) {
        valueTime.forEach(item => (item.textContent = '00')); // Обнуляємо таймер
        selector.disabled = false;
        clearInterval(timerId); // Зупиняємо таймер, коли час вийшов
        return;
      }
    }, 1000);
  }
}

function countDown(value) {
  const minusSecond = convertMs(value);
  Object.values(minusSecond).forEach(
    (value, index) => (valueTime[index].textContent = value)
  );
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
