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
const MAP_WIDTH = 1200;
const map = document.querySelector('.map');
const similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const MAX_COORDINATE_X = MAP_WIDTH - MAP_PIN_WIDTH;
const MIN_COORDINATE_X = 0 + MAP_PIN_WIDTH;
const MAX_COORDINATE_Y = 630;
const MIN_COORDINATE_Y = 130;
// const similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// const mapFilters = document.querySelector('.map__filters-container');
// const PHOTO_WIDTH = 45;
// const PHOTO_HEIGHT = 40;
const headerForm = document.querySelector('.ad-form-header');
const elementForm = document.querySelector('.ad-form__element');
const form = document.querySelector('.ad-form');
const mapPinMain = document.querySelector('.map__pin--main');
const inputAddress = document.querySelector('#address');
const PIN_WIDTH_INACTIVE = 200;
const PIN_HEIGHT_INACTIVE = 200;
let mainPinLeft = 570;
let mainPinTop = 375;
const roomsNummber = form.querySelector('#room_number');
const guestsNummber = form.querySelector('#capacity');
const roomsGuests = {
  MAX_ROOMS: 100,
  NOT_GUESTS: 0
};


function getRandomAvatar(index) {
  index += 1;
  return `img/avatars/user0${index}.png`;
}

function getRandomFeatures(text) {
  const featuresResult = [];
  for (let i = 0; i < getRandomInteger(0, text.length); i++) {
    let featuresIndex = getRandomInteger(1, text.length);
    featuresResult.push(text[featuresIndex - 1]);
    text.splice(featuresIndex, 1);
  }

  return featuresResult;
}


function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime() {
  let time = getRandomInteger(TIME_MIN, TIME_MAX) + ':00';
  return time;
}

function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
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
          x: getRandomInteger(LOCATION_MIN, LOCATION_MAX),
          y: getRandomInteger(LOCATION_MIN, LOCATION_MAX)
        }
      },
      "price": getRandomInteger(PRICE_MIN, PRICE_MAX),
      "type": translate[getRandomArrayItem(ROOM_TYPE)],
      "rooms": getRandomInteger(ROOMS_MIN, ROOMS_MAX),
      "guests": getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      "checkin": getRandomTime(),
      "checkout": getRandomTime(),
      "features": getRandomFeatures(FEATURES),
      "description": getRandomArrayItem(DESCRIPTION),
      "photos": getRandomFeatures(PHOTOS),
    },
    "location": {
      "x": getRandomInteger(MIN_COORDINATE_X, MAX_COORDINATE_X),
      "y": getRandomInteger(MIN_COORDINATE_Y, MAX_COORDINATE_Y
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

const offers = getOffers();

const addPins = function () {
  const fragment = document.createDocumentFragment();
  offers.forEach((offer) => {
    let mapElement = similarPinTemplate.cloneNode(true);

    mapElement.style.left = offer.location.x - MAP_PIN_WIDTH / 2 + 'px';
    mapElement.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
    mapElement.querySelector('img').src = offer.author.avatar;
    mapElement.querySelector('img').alt = offer.offer.title;
  });

  map.appendChild(fragment);
};

// const addCards = function (fragment) {
//   offers.forEach((offer) => {
//     createCard(offer, fragment);
//   });
// };

// const createCard = function (offer) {
//   const fragment = document.createDocumentFragment();
//   const cardElement = SimilarCardTemplate.cloneNode(true);

//   cardElement.querySelector('.popup__title').innerHTML = offer.offer.title;
//   cardElement.querySelector('.popup__text--address').innerHTML = offer.offer.address.location.x + ' ' + offer.offer.address.location.x;
//   cardElement.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').innerHTML = offer.offer.type;
//   cardElement.querySelector('.popup__text--capacity').innerHTML = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
//   cardElement.querySelector('.popup__features').innerHTML = offer.offer.features;
//   cardElement.querySelector('.popup__description').innerHTML = offer.offer.description;
//   cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
//   fragment.appendChild(cardElement);


//   const photosContainer = cardElement.querySelector('.popup__photos');
//   photosContainer.innerHTML = '';
//   offer.offer.photos.forEach((photo) => {
//     let img = document.createElement("img");
//     img.classList.add('popup__photo');
//     img.src = photo;
//     img.style.width = PHOTO_WIDTH + 'px';
//     img.style.height = PHOTO_HEIGHT + 'px';
//     photosContainer.appendChild(img);
//   });

//   map.insertBefore(fragment, mapFilters);
// };

addPins();
// createCard(offers[1]);

headerForm.classList.add('disable');
elementForm.classList.add('disable');
inputAddress.value = (mainPinLeft + PIN_WIDTH_INACTIVE / 2) + ', ' + (mainPinTop + PIN_HEIGHT_INACTIVE / 2);

const activeMap = function () {
  map.classList.remove('map--faded');
  headerForm.classList.remove('disable');
  elementForm.classList.remove('disable');
  form.classList.remove('ad-form--disabled');
  inputAddress.value = (mainPinLeft - MAP_PIN_WIDTH / 2) + ', ' + (mainPinTop + MAP_PIN_HEIGHT);
};


mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activeMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activeMap();
  }
});

const addGuestsToRooms = function (input) {
  const roomsCount = Number(roomsNummber.value);
  const guestsCount = Number(guestsNummber.value);
  if (guestsCount > roomsCount) {
    input.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else if (roomsCount === roomsGuests.MAX_ROOMS && guestsCount !== roomsGuests.NOT_GUESTS) {
    input.setCustomValidity('100 комнат не предназначены для гостей');
  } else {
    input.setCustomValidity(' ');
  }

  input.reportValidity();
};


roomsNummber.addEventListener('change', function () {
  addGuestsToRooms(roomsNummber);
});

guestsNummber.addEventListener('change', function () {
  addGuestsToRooms(guestsNummber);
});
