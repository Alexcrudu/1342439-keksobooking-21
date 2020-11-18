'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_GUESTS_NUMBER = 3;
  const ZERO = 0;
  const MAX_PRICE = 1000000;
  const ROOMS_FOR_GUEST = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  const TYPE_PRICE = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  const roomsNummber = document.querySelector('#room_number');
  const guestsNummber = document.querySelector('#capacity');
  const titleInput = document.querySelector('#title');
  const resetButton = window.map.form.querySelector('.ad-form__reset');
  const timeinInput = document.querySelector('#timein');
  const timeoutInput = document.querySelector('#timeout');
  const priceInput = document.querySelector('#price');
  const typeInput = document.querySelector('#type');

  const addGuestsToRooms = function (value) {
    Array.from(guestsNummber.options).forEach((option) => {
      option.disabled = !ROOMS_FOR_GUEST[value].includes(option.value);
    });

    guestsNummber.value = value > MAX_GUESTS_NUMBER ? ZERO : value;
  };

  addGuestsToRooms(roomsNummber.value);

  roomsNummber.addEventListener('change', (evt) => {
    addGuestsToRooms(evt.target.value);
  });

  titleInput.addEventListener('input', function () {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });


  timeinInput.addEventListener('change', function () {
    if (timeinInput.value !== timeoutInput.value) {
      timeoutInput.value = timeinInput.value;
    }
  });

  timeoutInput.addEventListener('change', function () {
    if (timeoutInput.value !== timeinInput.value) {
      timeinInput.value = timeoutInput.value;
    }
  });

  const validateMaxPrice = function () {
    if (priceInput.value > MAX_PRICE) {
      priceInput.setCustomValidity('Слишком большая стоимость');
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  };

  priceInput.addEventListener('input', validateMaxPrice);

  const validatePrice = function () {
    priceInput.placeholder = TYPE_PRICE[typeInput.value];
    priceInput.setAttribute('min', TYPE_PRICE[typeInput.value]);
  };
  const validateMinPrice = function () {
    if (priceInput.value < TYPE_PRICE[typeInput.value]) {
      priceInput.setCustomValidity('Минимальная стоимость' + '' + TYPE_PRICE[typeInput.value]);
    }

    priceInput.reportValidity();
  };

  typeInput.addEventListener('input', function () {
    validatePrice();
    validateMinPrice();
  });

  priceInput.addEventListener('input', function () {
    validatePrice();
    validateMinPrice();
  });

  const showSuccessMessage = () => {
    const messageElement = document.querySelector('#success').cloneNode(true).content.querySelector('.success');
    const closeMessage = () => {
      messageElement.remove();
      document.removeEventListener('keydown', onPupEsc);
    };
    window.map.disable();

    const onPupEsc = (evt) => {
      if (evt.key === window.card.ESC) {
        closeMessage();
      }
    };

    document.addEventListener('keydown', onPupEsc);
    messageElement.addEventListener('click', () => {
      closeMessage();
    });

    document.body.appendChild(messageElement);
  };

  const showErrorMessage = (errorMessage) => {
    const errorElement = document.querySelector('#error').cloneNode(true).content.querySelector('.error');
    const errorMessageElement = errorElement.querySelector('.error__message');
    errorMessageElement.textContent = errorMessage;

    const closeMessage = () => {
      errorElement.remove();
      document.removeEventListener('keydown', onPopupEsc);
    };

    errorElement.addEventListener('click', () => {
      closeMessage();
    });

    const onPopupEsc = (evt) => {
      if (evt.key === window.card.ESC) {
        closeMessage();
      }
    };

    document.addEventListener('keydown', onPopupEsc);
    document.body.appendChild(errorElement);
  };

  const resetForm = () => {
    window.map.disable();
    window.card.removeInfo();
    titleInput.value = ' ';
    window.map.form.reset();
    priceInput.placeholder = TYPE_PRICE[typeInput.value];
    window.map.inputAddress.value = (window.map.PinMain.offsetLeft - window.data.MAP_PIN_WIDTH / 2) + ', ' + (window.map.PinMain.offsetTop + window.data.MAP_PIN_HEIGHT);

  };

  const submitForm = function (evt) {
    evt.preventDefault();
    window.backend.upload(showSuccessMessage, showErrorMessage, new FormData(window.map.form));
    resetForm();
  };

  window.map.form.addEventListener('submit', submitForm);

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
})();
