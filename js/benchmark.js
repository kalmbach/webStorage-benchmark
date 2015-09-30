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

    if (webSQLAdapter.isValid) {
      webSQLAdapter.set(key, value, function(e) {
        if (e !== null) {
          alert("set: " + e.message + "(" + e.code +")");
        } else {
          webSQLAdapter.get(key, function(e) {
            if (e !== null) {
              alert("set: " + e.message + "(" + e.code +")");
            } else {
              webSQLAdapter.remove(key, function(e) {
                if (e !== null) {
                  alert("set: " + e.message + "(" + e.code +")");
                } else {
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
      timespan.textContent = "Web Sql Storage is not available in this browser."
      setTimeout(localStorageBenchmark, 1000);
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

    if (localStorageAdapter.isValid) {
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

                  if(i < 50) {
                    r();
                  } else {
                    setTimeout(indexedDBBenchmark, 1000);
                  }
                }
              });
            }
          });
        }
      });
    } else {
      timespan.textContent = "Web Sql Storage is not available in this browser."
      setTimeout(indexedDBBenchmark, 1000);
    }

  };

  r();
}

function indexedDBBenchmark() {
  var pgbar = document.querySelector('#indexeddb-benchmark-pgbar');
  var timespan = document.querySelector('#indexeddb-time-span');
  var startTime = new Date();
  var i = 0;

  function r() {
    var key = uuid();
    var value = "Donec fringilla lacinia nisl eget sollicitudin. Ut sit amet\
                 consectetur lorem, et facilisis neque. Ut malesuada felis sed\
                 neque blandit, vel tempor elit lobortis. Vivamus suscipit risus\
                 est, in molestie nunc egestas et. Integer faucibus turpis sed nullam";

    if (indexedDBAdapter.isValid) {
      indexedDBAdapter.set(key, value, function(e) {
        if (e == null) {
          indexedDBAdapter.get(key, function(e) {
            if (e == null) {
              indexedDBAdapter.remove(key, function(e) {
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
    } else {
      timespan.textContent = "Web Sql Storage is not available in this browser."
    }
  };

  r();
}

setTimeout(webSqlBenchmark, 1000);
