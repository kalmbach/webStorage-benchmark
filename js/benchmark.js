"use strict";

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

function webSqlBenchmark() {
  var pgbar = document.querySelector('#websql-benchmark-pgbar');
  var timespan = document.querySelector('#websql-time-span');
  var startTime = new Date();
  var i = 0;

  function r() {
    var key = uuid();
    var value = "Donec fringilla lacinia nisl eget sollicitudin. Ut sit amet\
                 consectetur lorem, et facilisis neque. Ut malesuada felis sed\
                 neque blandit, vel tempor elit lobortis. Vivamus suscipit risus\
                 est, in molestie nunc egestas et. Integer faucibus turpis sed nullam";

    if (webStorage.isValid) {
      webStorage.set(key, value, function(e) {
        if (e == null) {
          webStorage.get(key, function(e) {
            if (e == null) {
              webStorage.remove(key, function(e) {
                if(e == null) {
                  i++;

                  var progress_label;
                  var totalTime = (new Date()) - startTime;
                  var averageTime = Math.round(totalTime / i * 100) / 100;

                  progress_label = "Operations: " + i;
                  progress_label += ", Total Time: " + totalTime + "ms";
                  progress_label += ", Average Time: " + averageTime + "ms";

                  pgbar.setAttribute('data-progrecss', i * 2);
                  timespan.textContent = progress_label;

                  if(i < 50) {
                    r();
                  } else {
                    setTimeout(localStorageBenchmark, 1000);
                  }
                }
              });
            }
          });
        }
      });
    } else {
      timespan.textContect = "Web Sql Storage is not available in this browser."
      setTimeout(localStoragBenchmark, 1000);
    }
  };

  r();
}

function localStorageBenchmark() {
  var pgbar = document.querySelector('#localstorage-benchmark-pgbar');
  var timespan = document.querySelector('#localstorage-time-span');
  var startTime = new Date();
  var i = 0;

  function r() {
    var key = uuid();
    var value = "Donec fringilla lacinia nisl eget sollicitudin. Ut sit amet\
                 consectetur lorem, et facilisis neque. Ut malesuada felis sed\
                 neque blandit, vel tempor elit lobortis. Vivamus suscipit risus\
                 est, in molestie nunc egestas et. Integer faucibus turpis sed nullam";

    localStorageAdapter.set(key, value, function(e) {
      if (e == null) {
        localStorageAdapter.get(key, function(e) {
          if (e == null) {
            localStorageAdapter.remove(key, function(e) {
              if(e == null) {
                i++;

                var progress_label;
                var totalTime = (new Date()) - startTime;
                var averageTime = Math.round(totalTime / i * 100) / 100;

                progress_label = "Operations: " + i;
                progress_label += ", Total Time: " + totalTime + "ms";
                progress_label += ", Average Time: " + averageTime + "ms";

                pgbar.setAttribute('data-progrecss', i * 2);
                timespan.textContent = progress_label;

                if(i < 50) { r(); }
              }
            });
          }
        });
      }
    });
  };

  r();
}


setTimeout(webSqlBenchmark, 1000);
