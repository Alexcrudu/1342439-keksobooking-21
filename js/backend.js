'use strict';

(function () {
  const TIMEOUT = 10000;
  const RequestURL = {
    LOAD_URL: 'https://21.javascript.pages.academy/keksobooking/data',
    UPLOAD_URL: 'https://21.javascript.pages.academy/keksobooking'
  };

  const RequestMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  const status = {
    OK: 200,
    ERROR_REQUEST: 400,
    NOT_FOUND: 404,
    ERROR_SERVER: 500,
  };

  const createXhr = function (onSuccess, onError, method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === status.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус запроса: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  const load = function (onSuccess, onError) {
    createXhr(onSuccess, onError, RequestMethod.GET, RequestURL.LOAD_URL);
  };


  const upload = function (onSuccess, onError, data) {
    createXhr(onSuccess, onError, RequestMethod.POST, RequestURL.UPLOAD_URL, data);
  };

  window.backend = {
    load,
    upload
  };
})();
