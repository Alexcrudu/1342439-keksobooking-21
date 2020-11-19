'use strict';

(function () {
  const PHOTO_WIDTH = 45;
  const PHOTO_HEIGHT = 40;
  const ESC = 'Escape';
  const mapFilters = document.querySelector('.map__filters-container');
  const similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  const body = document.querySelector('body');

  const houseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
  };

  const createCard = function (offer) {
    const fragment = document.createDocumentFragment();
    const cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = houseType[offer.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;
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
    showActiveFeatures(offer.offer.features);
  };

  const showActiveFeatures = function (features) {

    const featuresElements = document.querySelectorAll('.popup__feature');

    featuresElements.forEach((el) => {
      const classEl = el.classList[1].split('--')[1];

      if (!features.includes(classEl)) {
        el.style.display = 'none';
      }

    });
  };

  const removeCard = function () {
    const currentCard = document.querySelector(`.map__card`);
    if (currentCard) {
      currentCard.remove();
      window.pin.disable();
    }
  };

  window.pin.map.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin--main') || evt.target.closest('.map__pin--main')) {
      return;
    } else if (evt.target.classList.contains('map__pin') || evt.target.closest('.map__pin')) {
      const index = evt.target.classList.contains('map__pin') ? evt.target.dataset.index : evt.target.closest('.map__pin').dataset.index;
      removeCard();
      window.card.createInfo(window.data.offers[index]);
    }
  });


  window.pin.map.addEventListener('keydown', function (evt) {
    if (evt.key === window.map.ENTER && evt.target.classList.contains('map__pin')) {
      const index = evt.target.classList.contains('map__pin') ? evt.target.dataset.index : evt.target.closest('.map__pin').dataset.index;

      removeCard();
      window.card.createInfo(window.data.offers[index]);
    }
  });

  window.pin.map.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      removeCard();
    }
  });

  body.addEventListener('keydown', function (evt) {
    if (evt.key === ESC) {
      removeCard();
    }
  });


  window.backend.load(window.pin.onSuccess);

  window.card = {
    createInfo: createCard,
    removeInfo: removeCard,
    ESC
  };

})();
