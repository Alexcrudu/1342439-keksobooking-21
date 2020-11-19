'use strict';

(function () {
  const TYPE_ANY = 'any';
  const filterForm = document.querySelector('.map__filters');
  const type = filterForm.querySelector('#housing-type');
  const price = filterForm.querySelector('#housing-price');
  const PriceValue = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  const PriceRange = {
    LOW: 10000,
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
    const filtered = [];
    offers.forEach((offer) => {
      const offerPrice = parseInt(offer.offer.price, 10);
      let condition;


      switch (price.value) {
        case PriceValue.ANY:
          condition = true;
          break;
        case PriceValue.LOW:
          condition = offerPrice < PriceRange.LOW;
          break;
        case PriceValue.MIDDLE:
          condition = offerPrice >= PriceRange.LOW && offerPrice <= PriceRange.HIGH;
          break;
        case PriceValue.HIGH:
          condition = offerPrice >= PriceRange.HIGH;
          break;
      }
      if (condition) {
        filtered.push(offer);
      }

    });
    return filtered;
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
    let clonedOffers = window.data.offers.slice();
    clonedOffers = typeFilter(clonedOffers);
    clonedOffers = priceFilter(clonedOffers);
    clonedOffers = roomsFilter(clonedOffers);
    clonedOffers = guestsFilter(clonedOffers);
    clonedOffers = featuresFilter(clonedOffers);

    window.pin.addPins(clonedOffers);
  };


  type.addEventListener('change', function () {
    window.card.removeInfo();
    window.util.debounce(updatePins)();
  });

  price.addEventListener('change', function () {
    window.card.removeInfo();
    window.util.debounce(updatePins)();
  });

  rooms.addEventListener('change', function () {
    window.card.removeInfo();
    window.util.debounce(updatePins)();
  });

  guests.addEventListener('change', function () {
    window.card.removeInfo();
    window.util.debounce(updatePins)();
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('input', function () {
      window.card.removeInfo();
      window.util.debounce(updatePins)();
    });
  });

  window.filters = {
    form: filterForm,
  };

})();
