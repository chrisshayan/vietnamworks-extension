/**
 * Created by chris on 7/14/15.
 */

window.VietnamWorksJobAlert = (function() {
  var defaults = {
      url: 'http://www.vietnamworks.com/',
      fetchUrl: 'https://api-staging.vietnamworks.com/jobs/search',
      keyword: '',
      interval: 60,
      md5: '2ed19d9c84fa9280fe6fa1a9e58de807a9d076646de8327c53fc8ed64ca4e268'
  };

  var api = {
      settings: {
          get: function(name) {
              var item = localStorage.getItem(name);
              if (item === null) {
                  return ({}.hasOwnProperty.call(defaults, name) ? defaults[name] : void 0);
              } else if (item === 'true' || item === 'false') {
                  return (item === 'true');
              }
              return item;
          },
          set: localStorage.setItem.bind(localStorage),
          reset: localStorage.clear.bind(localStorage)
      }
  };

  return api;
})();


var xhr = (function () {
    var xhr = new XMLHttpRequest();

    return function (method, url, headers, cb) {
        if (!cb && typeof headers === 'function') {
            cb = headers;
            headers = null;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                cb(xhr.responseText, xhr.status, xhr);
                return;
            }
        };

        xhr.open(method, url);

        if (headers) {
            Object.keys(headers).forEach(function (k) {
                xhr.setRequestHeader(k, headers[k]);
            });
        }

        xhr.setRequestHeader('If-Modified-Since', '');
        xhr.send();
    };
})();


function fetchJobs() {
    var options = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Content-md5": VietnamWorksJobAlert.settings.get('md5'),
        "job_title": VietnamWorksJobAlert.settings.get('keyword')
    };

    xhr('GET', VietnamWorksJobAlert.settings.get('fetchUrl'), options, function (data, status, response) {
        console.log(data);
        console.log(status);
        console.log(response);
        chrome.browserAction.setBadgeText({text: VietnamWorksJobAlert.settings.get('keyword')});
    });
}


