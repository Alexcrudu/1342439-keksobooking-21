'use strict';

(function () {

  const LOCATION_MIN = 350;
  const LOCATION_MAX = 600;
  const PRICE_MIN = 50;
  const PRICE_MAX = 150;
  const ROOMS_MIN = 20;
  const ROOMS_MAX = 80;
  const GUESTS_MIN = 1;
  const GUESTS_MAX = 8;
  const FEATURES = ['wifi', "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const ROOM_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const DESCRIPTION = ['симбиоз природы и современного дизайна', 'стоит посреди просторного садово-паркового ансамбля', 'К услугам гостей отель предлагает уютные комфортабельные двухместные номера и номера повышенной комфортности', 'Отель сочетает в себе уют домашнего очага и комфорт современной обстановки', 'Основная часть номерного фонда была полностью реновирована'];
  const MAP_PIN_WIDTH = 62;
  const MAP_WIDTH = 1200;
  const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const MAX_COORDINATE_X = MAP_WIDTH - MAP_PIN_WIDTH;
  const MIN_COORDINATE_X = 0 + MAP_PIN_WIDTH;
  const MAX_COORDINATE_Y = 630;
  const MIN_COORDINATE_Y = 130;


  function getRandomAvatar(index) {
    index += 1;
    return `img/avatars/user0${index}.png`;
  }

  let translate = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  function generateOffer(index) {
    return {
      "author": {
        "avatar": getRandomAvatar(index)
      },
      "offer": {
        "title": `Title ${index}`,
        "address": {
          location: {
            x: window.util.getRandomInteger(LOCATION_MIN, LOCATION_MAX),
            y: window.util.getRandomInteger(LOCATION_MIN, LOCATION_MAX)
          }
        },
        "price": window.util.getRandomInteger(PRICE_MIN, PRICE_MAX),
        "type": translate[window.util.getRandomArrayItem(ROOM_TYPE)],
        "rooms": window.util.getRandomInteger(ROOMS_MIN, ROOMS_MAX),
        "guests": window.util.getRandomInteger(GUESTS_MIN, GUESTS_MAX),
        "checkin": window.util.getRandomTime(),
        "checkout": window.util.getRandomTime(),
        "features": window.util.getRandomFeatures(FEATURES),
        "description": window.util.getRandomArrayItem(DESCRIPTION),
        "photos": window.util.getRandomFeatures(PHOTOS),
      },
      "location": {
        "x": window.util.getRandomInteger(MIN_COORDINATE_X, MAX_COORDINATE_X),
        "y": window.util.getRandomInteger(MIN_COORDINATE_Y, MAX_COORDINATE_Y
        ),
      }
    };
  }

  function getOffers() {
    const array = [];

    for (let i = 0; i < 8; i++) {
      array.push(generateOffer(i));
    }
    return array;
  }

  window.data = {
    offers: getOffers(),
  };
})();
