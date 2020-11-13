'use strict';

(function () {
  const mapFilters = document.querySelector('.map__filters-container');
  const similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;
  const body = document.querySelector('body');
  const ESC = 'Esc';

  const createCard = function (offer) {
    const fragment = document.createDocumentFragment();
    const cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').innerHTML = offer.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = offer.offer.address.location.x + ' ' + offer.offer.address.location.x;
    cardElement.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').innerHTML = offer.offer.type;
    cardElement.querySelector('.popup__text--capacity').innerHTML = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = offer.offer.features;
    cardElement.querySelector('.popup__description').innerHTML = offer.offer.description;
    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
    fragment.appendChild(cardElement);


    const photosContainer = cardElement.querySelector('.popup__photos');
    photosContainer.innerHTML = '';
    offer.offer.photos.forEach((photo) => {
      let img = document.createElement("img");
      img.classList.add('popup__photo');
      img.src = photo;
      img.style.width = PHOTO_WIDTH + 'px';
      img.style.height = PHOTO_HEIGHT + 'px';
      photosContainer.appendChild(img);
    });

    window.pin.map.insertBefore(fragment, mapFilters);
  };


  function removeCard() {
    const currentCard = document.querySelector(`.map__card`);
    if (currentCard) {
      currentCard.remove();
      window.pin.disablePin();
    }
  }

  window.pin.map.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin--main') || evt.target.closest('.map__pin--main')) {
      return;
    } else if (evt.target.classList.contains('map__pin') || evt.target.closest('.map__pin')) {
      const index = evt.target.classList.contains('map__pin') ? evt.target.dataset.index : evt.target.closest('.map__pin').dataset.index;

      removeCard();
      window.card.createCard(window.data.offers[index]);
    }
  });


  window.pin.map.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin--main') || evt.target.closest('.map__pin--main')) {
      return;
    } else if (evt.key === window.map.ENTER || evt.target.classList.contains('map__pin') || evt.target.closest('.map__pin')) {
      const index = evt.target.classList.contains('map__pin') ? evt.target.dataset.index : evt.target.closest('.map__pin').dataset.index;

      removeCard();
      window.card.createCard(window.data.offers[index]);
    }
  });

  window.pin.map.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
    // evt.target.closest('.map__card').classList.add('hidden');
      removeCard();
    }
  });

  body.addEventListener('keydown', function (evt) {
    if (evt.key === ESC || evt.target.classList.contains('popup__close')) {
    // evt.target.closest('.map__card').classList.add('hidden');
      removeCard();
    }
  });


  window.card = {
    createCard
  };

})();
