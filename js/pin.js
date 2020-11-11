'use strict';

(function () {
  const similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.pin = {
    map: document.querySelector('.map'),

    addPins: function () {
      const fragment = document.createDocumentFragment();
      window.data.offers.forEach((offer, index) => {
        let mapElement = similarPinTemplate.cloneNode(true);
        mapElement.dataset.index = index;

        mapElement.style.left = offer.location.x - window.map.MAP_PIN_WIDTH / 2 + 'px';
        mapElement.style.top = offer.location.y - window.map.MAP_PIN_HEIGHT / 2 + 'px';
        mapElement.querySelector('img').src = offer.author.avatar;
        mapElement.querySelector('img').alt = offer.offer.title;
        fragment.appendChild(mapElement);
      });

      window.pin.map.appendChild(fragment);
    },

    disablePin: function () {
      const activePinElement = similarPinTemplate.querySelector(`.map__pin--active`);
      if (activePinElement) {
        activePinElement.classList.remove(`map__pin--active`);
      }
    }
  };
})();
