'use strict';

(function () {

  const TIME_MIN = 12;
  const TIME_MAX = 14;
  const DEBOUNCE_INTERVAL = 500;

  const getRandomInteger = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomTime = function () {
    return `${window.util.getRandomInteger(TIME_MIN, TIME_MAX)} :00`;
  };

  const getRandomArrayItem = function (array) {
    return array[window.util.getRandomInteger(0, array.length - 1)];
  };

  const getRandomFeatures = function (text) {
    const featuresResult = [];
    for (let i = 0; i < window.util.getRandomInteger(0, text.length); i++) {
      let featuresIndex = window.util.getRandomInteger(1, text.length);
      featuresResult.push(text[featuresIndex - 1]);
      text.splice(featuresIndex, 1);
    }
    return featuresResult;
  };

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    getRandomInteger,
    getRandomTime,
    getRandomArrayItem,
    getRandomFeatures,
    debounce,
  };

})();
