// script/index.js
//
// This script sets up the main UI to respond to changes in the user's algorithm
// selection.
//
// Requires: script/algorithms.js
// Use this script **after** all relevant HTML elements are loaded.

(function(global) {
  /// HTML elements ///

  var algorithmSelectionEl = document.getElementById("algorithm-selection");
  var visualizerEl = document.getElementById("visualizer");

  /// Functions ///

  // getSelectedAlgorithm :: () -> String
  //  Returns the name of the currently selected algorithm as determined by the
  //  #algorithm-selection HTML element.
  var getSelectedAlgorithm = function() {
    return algorithmSelectionEl.value;
  };

  // loadAlgorithm :: (name :: String) -> ()
  //  Loads the algorithm with the given name in the visualization iframe.
  //  Requires that the visualization iframe is already loaded.
  var loadAlgorithm = function(name) {
    visualizerEl.contentWindow.postMessage({
      type: "load-algorithm",
      value: name
    }, global.location.origin);
  };
  
  /// Event listeners ///

  // Load currently selected algorithm once visualizer iframe loads.
  // Also, only listen for changes in the selected algorithm once the iframe
  // loads (since we can't change the actual simulation until then anyway).
  visualizerEl.addEventListener("load", function() {
    loadAlgorithm(getSelectedAlgorithm());
    algorithmSelectionEl.addEventListener("change", function(event) {
      loadAlgorithm(event.target.value);
    });
  });
})(window);
