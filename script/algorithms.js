// interface Algorithm {
//   :: (data :: [UInt]) -> Algorithm
//   getData :: () -> [UInt]
//   getStepDelay :: (size :: UInt) -> UInt
//   isDone :: () -> Bool
//   reset :: (data :: [UInt]) -> ()
//   step :: () -> ()
// }

(function(global) {
  /// Algorithms ///

  // SelectionSort
  var SelectionSort = function(data) {
    this.reset(data);
  };
  SelectionSort.prototype.getData = function() {
    return this.data;
  };
  SelectionSort.prototype.getStepDelay = function(size) {
    return 10000 / size / size;
  };
  SelectionSort.prototype.isDone = function() {
    return this.done;
  };
  SelectionSort.prototype.reset = function(data) {
    this.smallestIndex = null;
    this.data = data;
    this.done = false;
    this.i = 0;
    this.j = 0;
  };
  SelectionSort.prototype.step = function() {
    if (this.smallestIndex === null ||
        this.data[this.j] < this.data[this.smallestIndex]) {
      this.smallestIndex = this.j;
    }
    ++this.j;
    if (this.j >= this.data.length) {
      // Place the smallest element at the lowest index
      var temp = this.data[this.i];
      this.data[this.i] = this.data[this.smallestIndex];
      this.data[this.smallestIndex] = temp;

      // Increment and reset loop counters
      ++this.i;
      this.j = this.i;
      this.smallestIndex = null;
    }
    if (this.i >= this.data.length) {
      this.done = true;
    }
  };

  global.algorithms = {
    "selection": SelectionSort
  };
})(window);
