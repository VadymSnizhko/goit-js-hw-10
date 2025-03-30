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
let timerId; // Додамо змінну для зберігання ID таймера

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    dateNow = new Date(); // Оновлюємо поточний час при закритті календаря
    console.log('onClose - userSelectedDate:', userSelectedDate);
    console.log('onClose - dateNow:', dateNow);
    if (userSelectedDate < dateNow) {
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true; // Блокуємо кнопку, якщо дата в минулому
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
  console.log('onClickStart - userSelectedDate:', userSelectedDate);
  console.log('onClickStart - dateNow:', dateNow);
  let diffDate = userSelectedDate - dateNow;
  console.log('onClickStart - diffDate:', diffDate);

  if (diffDate > 0) {
    countDown(diffDate);
    timerId = setInterval(() => {
      diffDate -= 1000;

      if (diffDate <= 0) {
        valueTime.forEach(item => (item.textContent = '00'));
        selector.disabled = false;
        clearInterval(timerId);
        return;
      }

      countDown(diffDate);
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
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
