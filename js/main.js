'use strict';

const FEATURES = ['wifi', "dishwasher", "parking", "washer", "elevator", "conditioner"];
const DESCRIPTION = ['симбиоз природы и современного дизайна', 'стоит посреди просторного садово-паркового ансамбля', 'К услугам гостей отель предлагает уютные комфортабельные двухместные номера и номера повышенной комфортности', 'Отель сочетает в себе уют домашнего очага и комфорт современной обстановки', 'Основная часть номерного фонда была полностью реновирована'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LOCATION_MIN = 350;
const LOCATION_MAX = 600;
const PRICE_MIN = 50;
const PRICE_MAX = 150;
const ROOM_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_MIN = 20;
const ROOMS_MAX = 80;
const GUESTS_MIN = 1;
const GUESTS_MAX = 8;
const TIME_MIN = 12;
const TIME_MAX = 14;
const MAP_HEIGHT = 750;
const MAP_WIDTH = 1200;
const MAP = document.querySelector('.map');
const SIMILAR_PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
const MAP_PIN_WIDTH = '50';
const MAP_PIN_HEIGHT = 70;


MAP.classList.remove('map--faded');


function getRandomAvatar(index) {
  index += 1;
  return `img/avatars/user0${index}.png`;
}

function getRandomFeatures(text) {
  const featuresResult = [];
  for (let i = 0; i < getRandomInt(0, text.length); i++) {
    let featuresIndex = getRandomInt(0, text.length);
    featuresResult.push(text[featuresIndex - 1]);
    text.splice(featuresIndex, 1);
  }

  return featuresResult;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime() {
  let time = getRandomInt(TIME_MIN, TIME_MAX) + ':00';
  return time;
}

function getRandomArrayItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function generateOffer(index) {
  return {
    "author": {
      "avatar": getRandomAvatar(index)
    },
    "offer": {
      "title": `Title ${index}`,
      "address": {
        location: {
          x: getRandomInt(LOCATION_MIN, LOCATION_MAX),
          y: getRandomInt(LOCATION_MIN, LOCATION_MAX)
        }
      },
      "price": getRandomInt(PRICE_MIN, PRICE_MAX),
      "type": getRandomArrayItem(ROOM_TYPE),
      "rooms": getRandomInt(ROOMS_MIN, ROOMS_MAX),
      "guests": getRandomInt(GUESTS_MIN, GUESTS_MAX),
      "checkin": getRandomTime(),
      "checkout": getRandomTime(),
      "features": getRandomFeatures(FEATURES),
      "description": getRandomArrayItem(DESCRIPTION),
      "photos": getRandomFeatures(PHOTOS),
    },
    "location": {
      "x": getRandomInt(0, MAP_WIDTH),
      "y": getRandomInt(0, MAP_HEIGHT),
    }
  };
}

function generateArray() {
  const array = [];

  for (let i = 0; i < 8; i++) {
    array.push(generateOffer(i));
  }
  return array;
}

const fragment = document.createDocumentFragment();
const offers = generateArray();
offers.forEach((offer) => {
  let mapElement = SIMILAR_PIN_TEMPLATE.cloneNode(true);

  mapElement.style.left = offer.location.x - MAP_PIN_WIDTH / 2 + 'px';
  mapElement.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
  mapElement.querySelector('img').src = offer.author.avatar;
  mapElement.querySelector('img').alt = offer.offer.title;
  fragment.appendChild(mapElement);
});

MAP.appendChild(fragment);


