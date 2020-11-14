'use strict';

(function () {
  const UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT = 10000;

  const status = {
    OK: 200,
    ERROR_REQUEST: 400,
    NOT_FOUND: 404,
    ERROR_SERVER: 500,
  };

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case status.OK:
          onSuccess(xhr.response);
          break;
        case status.ERROR_REQUEST:
          onError('Ошибка в запросе! ${xhr.status} ${xhr.statusText}');
          break;
        case status.NOT_FOUND:
          onError('Страница не найдена! ${xhr.status} ${xhr.statusText}');
          break;
        case status.ERROR_SERVER:
          onError('Ошибка сервера! Попробуйте позже. ${xhr.status} ${xhr.statusText}');
          break;
        default:
          onError('Статус запроса: ${xhr.status} ${xhr.statusText}');
      }


    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', UPLOAD_URL);
    xhr.send();
  };

  window.load = {
    load,
  };
})();
