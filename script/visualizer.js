(function(global) {
  /// JavaScript types and values ///
  var Array = global.Array;
  var Math = global.Math; var Object = global.Object;
  var undefined;

  /// HTML elements ///
  var canvasEl = document.getElementById("visualization");

  /// Functions ///

  // parseMessage :: (msg :: Message) -> ()
  //  Runs the action associated with msg, if it exists. If not, prints an error
  //  to the console.
  var parseMessage = function(msg) {
    if (Object.prototype.hasOwnProperty.call(messages, msg.type)) {
      messages[msg.type](msg.value);
    }
    else {
      global.console.error("Invalid message", msg);
    }
  };

  // loadAlgorithm :: (name :: String) -> ()
  //  Load a visualization of the algorithm with the given name on the canvas.
  //  Requires an object `algorithms :: [String: Algorithm]` to already be
  //  loaded in the global scope. Prints an error to the console if the
  //  algorithm does not exist.
  var loadAlgorithm = function(name) {
    if (Object.prototype.hasOwnProperty.call(global.algorithms, name)) {
      if (currentIntervalID !== null) {
        global.clearInterval(currentIntervalID);
      }
      var algorithm = new global.algorithms[name](getRandomData(numberOfData));
      var iterationsPerInterval =
        Math.ceil(50 / algorithm.getStepDelay(numberOfData));
      var intervalLength =
        iterationsPerInterval * algorithm.getStepDelay(numberOfData);
      currentIntervalID = global.setInterval(function(algorithm) {
        visualizeData(algorithm.getData());
        if (algorithm.isDone()) {
          algorithm.reset(getRandomData(numberOfData));
        }
        else {
          for (var i = 0; i < iterationsPerInterval; ++i) {
            algorithm.step();
            if (algorithm.isDone()) {
              break;
            }
          }
        }
      }, intervalLength, algorithm);
    }
    else {
      global.console.error("Invalid algorithm", name);
    }
  };

  // getRandomData :: (size :: UInt) -> [UInt]
  //  Returns an array of `size` random datums, each an integer in the interval
  //  [0, maxDatumValue).
  var getRandomData = function(size) {
    var data = new Array(size);
    for (var i = 0; i < size; ++i) {
      data[i] = (Math.random() * maxDatumValue) | 0;
    }
    return data;
  };

  // visualizeData :: (data :: [UInt]) -> ()
  //  Visualizes `data` as hues on the canvas.
  //  Requires that `data` is not empty.
  var visualizeData = function(data) {
    var context = canvasEl.getContext("2d");
    var width = canvasEl.width;
    var height = canvasEl.height;
    for (var i = 0; i < data.length; ++i) {
      context.fillStyle = "hsl(" + (data[i] | 0) + ", 50%, 50%)";
      context.fillRect(i / data.length * width, 0, width / data.length, height);
    }
  };
  
  /// Variables ///
  var maxDatumValue = 360;
  var messages = {
    "load-algorithm": loadAlgorithm
  };
  var numberOfData = (canvasEl.width / 5) | 0;
  var currentIntervalID = null;
  
  /// Event listeners ///
  global.addEventListener("message", function(event) {
    parseMessage(event.data);
  });

  // Fit canvas to frame size
  canvasEl.width = canvasEl.offsetWidth;
  canvasEl.height = canvasEl.offsetHeight;
})(window);
