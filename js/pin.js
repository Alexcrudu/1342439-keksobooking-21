'use strict';

(function () {
  const similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  const map = document.querySelector('.map');

  const onSuccess = function (data) {
    // window.data.rawOffers = data;
    window.data.offers = data;
  };


  window.backend.load(onSuccess);

  const addPins = function (pins) {
    window.map.clearPins();
    const fragment = document.createDocumentFragment();
    pins.slice(0, 5).forEach((offer, index) => {
      const mapElement = similarPinTemplate.cloneNode(true);
      const mapElementImage = mapElement.querySelector('img');
      mapElement.dataset.index = index;

      mapElement.style.left = `${offer.location.x - window.data.MAP_PIN_WIDTH / 2}px`;
      mapElement.style.top = `${offer.location.y - window.data.MAP_PIN_HEIGHT / 2}px`;
      mapElementImage.src = offer.author.avatar;
      mapElementImage.alt = offer.offer.title;
      fragment.appendChild(mapElement);
    });

    window.pin.map.appendChild(fragment);
  };

  const disablePin = function () {
    const activePinElement = similarPinTemplate.querySelector('.map__pin--active');
    if (activePinElement) {
      activePinElement.classList.remove('map__pin--active');
    }
  };


  window.pin = {
    map,
    addPins,
    disable: disablePin,
    onSuccess
  };
})();
