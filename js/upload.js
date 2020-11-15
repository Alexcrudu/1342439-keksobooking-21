'use strict';

(function () {
  const LOAD_URL = 'https://21.javascript.pages.academy/keksobooking';


  const upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('При отправке данных произошла ошибка.', 'Статус ответа: ' + xhr.status);
      }

    });

    xhr.open('POST', LOAD_URL);
    xhr.send(data);
  };

  window.upload = {
    upload,
  };
})();
