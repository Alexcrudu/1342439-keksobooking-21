'use strict';

(function () {
  window.map = {
    form: document.querySelector('.ad-form'),
    MAP_PIN_WIDTH: 62,
    MAP_PIN_HEIGHT: 62,
    mapPinMain: document.querySelector('.map__pin--main')
  };

  const inputAddress = document.querySelector('#address');
  const headerForm = document.querySelector('.ad-form-header');
  const elementForm = document.querySelector('.ad-form__element');
  const PIN_WIDTH_INACTIVE = 200;
  const PIN_HEIGHT_INACTIVE = 200;
  const PIN_POINT = 22;
  let mainPinLeft = 570;
  let mainPinTop = 375;

  headerForm.classList.add('disable');
  elementForm.classList.add('disable');
  inputAddress.value = (mainPinLeft + PIN_WIDTH_INACTIVE / 2) + ', ' + (mainPinTop + PIN_HEIGHT_INACTIVE / 2);

  const activeMap = function () {
    window.pin.map.classList.remove('map--faded');
    headerForm.classList.remove('disable');
    elementForm.classList.remove('disable');
    window.map.form.classList.remove('ad-form--disabled');
    inputAddress.value = (mainPinLeft - window.map.MAP_PIN_WIDTH / 2) + ', ' + (mainPinTop + window.map.MAP_PIN_HEIGHT + PIN_POINT);
    window.pin.addPins();
  };


  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activeMap();
    }
  });

  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    inputAddress.value = startCoords.x + ' ' + (startCoords.y + window.map.MAP_PIN_HEIGHT + PIN_POINT);

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
        const maxCoordinateX = 1200 - window.map.MAP_PIN_WIDTH / 2;
        const minCoordinateX = 0 - window.map.MAP_PIN_WIDTH / 2;
        const maxCoordinateY = 630;
        const minCoordinateY = 130 - window.map.MAP_PIN_HEIGHT;

        if (
          window.map.mapPinMain.offsetLeft - shift.x > minCoordinateX &&
          window.map.mapPinMain.offsetLeft - shift.x <= maxCoordinateX
        ) {
          window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';
        }

        if (
          window.map.mapPinMain.offsetTop - shift.y > minCoordinateY &&
          window.map.mapPinMain.offsetTop - shift.y <= maxCoordinateY) {
          window.map.mapPinMain.style.top = window.map.mapPinMain.offsetTop - shift.y + 'px';
        }

        inputAddress.value = (window.map.mapPinMain.offsetLeft - shift.x) + ' ' + (window.map.mapPinMain.offsetTop - shift.y + window.map.MAP_PIN_HEIGHT + PIN_POINT);
      };
      movePin();
    };


    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
