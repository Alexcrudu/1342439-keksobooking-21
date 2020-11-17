'use strict';

(function () {
  const TYPE_ANY = 'any';
  const filterForm = document.querySelector('.map__filters');
  const type = filterForm.querySelector('#housing-type');
  const price = filterForm.querySelector('#housing-price');
  const PriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    High: 'high'
  };

  const PriceRange = {
    LOW: 1000,
    HIGH: 50000
  };
  const rooms = filterForm.querySelector('#housing-rooms');
  const guests = filterForm.querySelector('#housing-guests');
  const checkboxes = document.querySelectorAll('.map__checkbox');


  const typeFilter = function (offers) {
    const filtered = [];
    offers.forEach((offer) => {
      if (offer.offer.type === type.value || type.value === TYPE_ANY) {
        filtered.push(offer);
      }
    });

    return filtered;
  };

  const priceFilter = function (offers) {
    const filtred = [];
    offers.forEach((offer) => {
      switch (price.value) {
        case PriceValue.LOW:
          return offer.offer.price < PriceRange.LOW;
        case PriceValue.MIDDLE:
          return offer.offer.price >= PriceRange.LOW && offer.offer.price <= PriceRange.HIGH;
        case PriceValue.HIGH:
          return offer.offer.price >= PriceRange.HIGH;
      }
      filtred.push(offer);
      return offer;
    });
    return filtred;
  };

  const roomsFilter = function (offers) {
    const filtered = [];
    offers.forEach((offer) => {
      if (offer.offer.rooms === Number(rooms.value) || rooms.value === TYPE_ANY) {
        filtered.push(offer);
      }
    });
    return filtered;
  };

  const guestsFilter = function (offers) {
    const filtered = [];
    offers.forEach((offer) => {
      if (offer.offer.guests === Number(guests.value) || guests.value === TYPE_ANY) {
        filtered.push(offer);
      }
    });
    return filtered;
  };

  const featuresFilter = function (offers) {
    const checked = document.querySelectorAll('input:checked');
    const filtered = [];
    const selectedFeatures = [];

    checked.forEach((element) => {
      selectedFeatures.push(element.value);
    });

    if (!checked.length) {
      return offers;
    }

    offers.forEach((offer) => {
      const itemExists = filtered.find((filteredItem) => offer.offer.address === filteredItem.offer.address);

      const matches = selectedFeatures.every((featureItem) => {
        return offer.offer.features.includes(featureItem);
      });

      if (matches && !itemExists) {
        filtered.push(offer);
      }

    });

    return filtered;
  };

  const updatePins = function () {
    window.data.offers = typeFilter(window.data.rawOffers);
    window.data.offers = priceFilter(window.data.offers);
    window.data.offers = roomsFilter(window.data.offers);
    window.data.offers = guestsFilter(window.data.offers);
    window.data.offers = featuresFilter(window.data.offers);

    window.pin.addPins();
  };


  type.addEventListener('change', function () {
    window.util.debounce(updatePins());
  });

  price.addEventListener('change', function () {
    window.util.debounce(updatePins());
  });

  rooms.addEventListener('change', function () {
    window.util.debounce(updatePins());
  });

  guests.addEventListener('change', function () {
    window.util.debounce(updatePins());
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('input', function () {
      window.util.debounce(updatePins());
    });
  });
})();
