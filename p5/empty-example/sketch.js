var cols, rows;

//i, j are index; x, y are coordinates

//width of rectangle
var w = 10;
//1-D cell list
var grid = [];

var stack = [];
//current cell
var current;
function setup() {
  //size of Rectangle
  createCanvas(400, 400);

  cols = width / w;
  rows = height / w;

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      //create cell
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  frameRate(120);
}

function draw() {
  //background color
  background(0, 0, 0, 10);
  //show all cells
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  //step 1 of algorithm
  var next = current.checkNeightbors();
  if (next) {
    next.visited = true;

    //step 2 of algorithm
    stack.push(current);
    //step 3 of algorithm
    removeWalls(current, next);
    //step 4 of algorithm
    current = next;
  } else if (stack.length > 0) {
    var cell = stack.pop();
    current = cell;
  }
}

//get the index of cell in grid
function index(i, j) {
  //check edge
  if (i < 0 || j < 0 || i >= cols || j >= rows) {
    return -1;
  }
  return i + j * cols;
}
//remove the wall between a and b
function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  //b in the left of a
  if (x === 1) {
    //remove wall in left of a
    a.wall[3] = false;
    //remove wall in right of b
    b.wall[1] = false;
  }
  //b in the right of a
  else if (x === -1) {
    //remove wall in right of a
    a.wall[1] = false;
    //remove wall in left of b
    b.wall[3] = false;
  }
  //b in the top of a
  if (y === 1) {
    a.wall[0] = false;
    b.wall[2] = false;
  }
  //b in the bottom of a
  else if (y === -1) {
    a.wall[2] = false;
    b.wall[0] = false;
  }
}

//define cell object
function Cell(i, j) {
  //index of cell
  this.i = i;
  this.j = j;
  this.visited = false;
  //wall boolean
  this.wall = [true, true, true, true];
  //define show function, create 4 wall to show
  this.show = function () {
    //place of cell
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    //top line
    if (this.wall[0]) {
      line(x, y, x + w, y);
    }
    //right line
    if (this.wall[1]) {
      line(x + w, y, x + w, y + w);
    }
    //bottom line
    if (this.wall[2]) {
      line(x + w, y + w, x, y + w);
    }
    //left line
    if (this.wall[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited == true) {
      //define noStroke as rectangle dont have stroke, so we just have stroke of line in the screen
      //if we remove the stroke of the line, the wall will be completely removed
      noStroke();
      //visited color
      fill(0, 169, 255, 100);
      //visited rectangle
      rect(x, y, w, w);
    }
  };
  //check the visit status of neightbor, return a random neightbor or undefined
  this.checkNeightbors = function () {
    var neightbor = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    //check all neightbor
    if (top && !top.visited) {
      neightbor.push(top);
    }
    if (right && !right.visited) {
      neightbor.push(right);
    }
    if (bottom && !bottom.visited) {
      neightbor.push(bottom);
    }
    if (left && !left.visited) {
      neightbor.push(left);
    }

    //pick random a neightbor
    if (neightbor.length > 0) {
      var r = floor(random(0, neightbor.length));
      return neightbor[r];
    } else {
      return undefined;
    }
  };

  this.highlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(8, 2, 163, 100);
    rect(x, y, w, w);
  };
}
