import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayINPUT = document.querySelector('[name="delay"]');
const stepINPUT = document.querySelector('[name="step"]');
const amountINPUT = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  let delay;
  for (let position = 0; position < amountINPUT.value; position++) {
    delay = position == 0 ? parseInt(delayINPUT.value) : delay + parseInt(stepINPUT.value);
    createPromise(position + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});
