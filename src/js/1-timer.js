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

labels.forEach(item => (item.textContent = item.textContent.toUpperCase()));

let userSelectedDate;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const dateNow = new Date();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < dateNow) {
      //window.alert('Please choose a date in the future');
      iziToast.show({
        icon: 'x',
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onClickStart);

function onClickStart(event) {
  console.log(btnStart);
}
