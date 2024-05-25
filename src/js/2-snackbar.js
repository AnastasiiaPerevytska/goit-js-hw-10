import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const delayInput = document.querySelector('input[name="delay"]');
  const stateRadios = document.querySelectorAll('input[name="state"]');

  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();

    const delay = parseInt(delayInput.value, 10);
    let selectedState = '';

    stateRadios.forEach(radio => {
      if (radio.checked) {
        selectedState = radio.value;
      }
    });

    processPromise(delay, selectedState)
      .then(message => showToast('success', 'Success', message))
      .catch(error => showToast('error', 'Error', error))
      .finally(() => {
        form.reset();
      });
  }

  function processPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  }

  function showToast(type, title, message) {
    iziToast[type]({ title, message });
  }
});