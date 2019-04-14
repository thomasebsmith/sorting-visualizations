// interface Algorithm {
//   :: (data :: [UInt]) -> Algorithm
//   getData :: () -> [UInt]
//   getStepDelay :: (size :: UInt) -> UInt //   isDone :: () -> Bool
//   reset :: (data :: [UInt]) -> ()
//   step :: () -> ()
// }
// Note that in any case data.length must be greater than 0.

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
    return 50000 / size / size;
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

  // InsertionSort
  var InsertionSort = function(data) {
    this.reset(data);
  };
  InsertionSort.prototype.getData = function() {
    return this.data;
  };
  InsertionSort.prototype.getStepDelay = function(size) {
    return 90000 / size / size;
  };
  InsertionSort.prototype.isDone = function() {
    return this.done;
  };
  InsertionSort.prototype.reset = function(data) {
    this.data = data;
    this.done = false;
    this.i = 1;
    this.j = this.i + 1;
  };
  InsertionSort.prototype.step = function() {
    // Increment, decrement, and reset loop counters
    --this.j;
    if (this.i >= this.data.length) {
      this.done = true;
      return;
    }
    if (this.j <= 0 || this.data[this.j - 1] <= this.data[this.j]) {
      ++this.i;
      this.j = this.i;
      if (this.i >= this.data.length) {
        this.done = true;
        return;
      }
    }

    // Swap the element and its predecessor
    var temp = this.data[this.j - 1];
    this.data[this.j - 1] = this.data[this.j];
    this.data[this.j] = temp;
  };


  global.algorithms = {
    "insertion": InsertionSort,
    "selection": SelectionSort,
  };
})(window);
