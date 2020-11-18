'use strict';

(function () {
  const PIN_POINT = 22;
  const MAIN_PIN_LEFT = 570;
  const MAIN_PIN_TOP = 375;
  const ENTER = 'Enter';
  const LEFT_BUTTON = 1;
  const form = document.querySelector('.ad-form');
  const mapPinMain = document.querySelector('.map__pin--main');
  const inputAddress = document.querySelector('#address');
  const headerForm = document.querySelector('.ad-form-header');
  const elementForms = document.querySelectorAll('.ad-form__element');
  const filters = document.querySelector('.map__filters');
  const selects = filters.querySelectorAll('select');
  const features = filters.querySelector('.map__features');

  const clearPins = () => {
    const pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  const disableMap = function () {
    if (!window.pin.map.classList.contains('map--faded')) {
      window.pin.map.classList.add('map--faded');
    }
    form.classList.add('ad-form--disabled');
    filters.classList.add('ad-form--disabled');

    clearPins();
    headerForm.setAttribute('disabled', 'disabled');
    features.setAttribute('disabled', 'disabled');
    elementForms.forEach((element) => {
      element.setAttribute('disabled', 'disabled');
    });
    selects.forEach((select) => {
      select.setAttribute('disabled', 'disabled');
    });
    inputAddress.value = (MAIN_PIN_LEFT + window.data.MAP_PIN_WIDTH / 2) + ', ' + (MAIN_PIN_TOP + window.data.MAP_PIN_HEIGHT / 2);
    mapPinMain.style.top = MAIN_PIN_TOP + 'px';
    mapPinMain.style.left = MAIN_PIN_LEFT + 'px';
  };
  disableMap();

  const activeMap = function () {
    window.pin.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    headerForm.removeAttribute('disabled', 'disabled');
    features.removeAttribute('disabled', 'disabled');
    selects.forEach((select) => {
      select.removeAttribute('disabled', 'disabled');
    });
    elementForms.forEach((element) => {
      element.removeAttribute('disabled', 'disabled');
    });
    window.map.form.classList.remove('ad-form--disabled');
    inputAddress.value = (MAIN_PIN_LEFT - window.data.MAP_PIN_WIDTH / 2) + ', ' + (MAIN_PIN_TOP + window.data.MAP_PIN_HEIGHT + PIN_POINT);
    window.pin.addPins();
  };


  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === LEFT_BUTTON) {
      activeMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER) {
      activeMap();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    inputAddress.value = (startCoords.x + window.data.MAP_PIN_WIDTH / 2) + ', ' + (startCoords.y + window.data.MAP_PIN_HEIGHT + PIN_POINT);

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const movePin = function () {
        const maxCoordinateX = window.data.MAP_WIDTH - window.data.MAP_PIN_WIDTH / 2;
        const minCoordinateX = 0 - window.data.MAP_PIN_WIDTH / 2;
        const maxCoordinateY = window.data.MAX_COORDINATE_Y - window.data.MAP_PIN_HEIGHT;
        const minCoordinateY = window.data.MIN_COORDINATE_Y - window.data.MAP_PIN_HEIGHT;

        if (
          window.map.PinMain.offsetLeft - shift.x > minCoordinateX &&
          window.map.PinMain.offsetLeft - shift.x <= maxCoordinateX
        ) {
          window.map.PinMain.style.left = (window.map.PinMain.offsetLeft - shift.x) + 'px';
        }

        if (
          window.map.PinMain.offsetTop - shift.y > minCoordinateY &&
          window.map.PinMain.offsetTop - shift.y <= maxCoordinateY) {
          window.map.PinMain.style.top = window.map.PinMain.offsetTop - shift.y + 'px';
        }

        inputAddress.value = (window.map.PinMain.offsetLeft + window.data.MAP_PIN_WIDTH / 2) + ', ' + (window.map.PinMain.offsetTop);
      };
      movePin();
    };


    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      inputAddress.value = (window.map.PinMain.offsetLeft + window.data.MAP_PIN_WIDTH / 2) + ', ' + (window.map.PinMain.offsetTop + window.data.MAP_PIN_HEIGHT);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.map = {
    form,
    PinMain: mapPinMain,
    ENTER,
    inputAddress,
    headerForm,
    elementForms,
    disable: disableMap,
    clearPins
  };

})();
