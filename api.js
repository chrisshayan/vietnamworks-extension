/**
 * Created by chris on 7/14/15.
 */

window.VietnamWorksJobAlert = (function() {
  var defaults = {
      url: 'http://www.vietnamworks.com/',
      fetchUrl: 'https://api.vietnamworks.com/jobs/search',
      keyword: '',
      category: 0,
      jobLevel: 0,
      location: 0,
      salary: 0,
      interval: 60,
      numberMatchingJobs: 0,
      utm: 'utm_source=JobAlertEmail&utm_medium=chrome&utm_campaign=viewall',
      md5: ''
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

    return function (method, url, headers, body, cb) {
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

        if(body) {
            xhr.send(
                JSON.stringify(body)
            );
        } else {
            xhr.send();
        }
    };
})();


function fetchJobs() {
    var headers = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Content-md5": VietnamWorksJobAlert.settings.get('md5')
    };

    var body = {
        "job_title": String(VietnamWorksJobAlert.settings.get('keyword')),
        "job_category": String(VietnamWorksJobAlert.settings.get('category')),
        "job_level": String(VietnamWorksJobAlert.settings.get('jobLevel')),
        "job_location": String(VietnamWorksJobAlert.settings.get('location')),
        "job_salary": String(VietnamWorksJobAlert.settings.get('salary'))
    };

    xhr('POST', VietnamWorksJobAlert.settings.get('fetchUrl'), headers, body, function (data, status, response) {
        var content = JSON.parse(data);
        var condition = status == 200 && content.meta.message != 'Failed';
        if(condition && content.data.total > 0) {
            VietnamWorksJobAlert.settings.set('numberMatchingJobs', content.data.total);

            chrome.browserAction.setBadgeBackgroundColor({color:[65, 131, 196, 255]});
            chrome.browserAction.setBadgeText(
                {text: String(VietnamWorksJobAlert.settings.get('numberMatchingJobs'))}
            );

            showHideViewAllButton();
        } else if(condition && content.data.total == 0) {
            chrome.browserAction.setBadgeText(
                {text: ''}
            );

        }

        console.log(content);
    });
}

chrome.alarms.create({periodInMinutes: VietnamWorksJobAlert.settings.get('interval')});
chrome.alarms.onAlarm.addListener(fetchJobs);


