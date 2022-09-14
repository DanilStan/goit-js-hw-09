import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitForm: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.submitForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delayValus = Number(refs.delay.value);
  const stepValus = Number(refs.step.value);
  for (let index = 1; index <= Number(refs.amount.value); index += 1) {
    createPromise(index, delayValus)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delayValus += stepValus;
  }
}

function createPromise(position, delay) {
  const objectTotal = { position, delay };
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(objectTotal);
      // Fulfill
    } else {
      reject(objectTotal); // Reject
    }
  });
}
