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
const valueTime = [...document.querySelectorAll(".value")];

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
    dateNow = new Date();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < dateNow) {
      //window.alert('Please choose a date in the future');
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      btnStart.disabled = false;
      valueTime.forEach((item,index) => valueTime[index].textContent = "00");
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onClickStart);

function onClickStart(event) {
  console.log(btnStart);
  btnStart.disabled = true;

  const difference = convertMs(userSelectedDate - dateNow);
  Object.values(difference).forEach((value,index) => valueTime[index].textContent = value
  )
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
