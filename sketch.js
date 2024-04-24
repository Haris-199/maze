const GRID = [];
const W = 40;
const H = W;
let rows, cols, cellCount;

function setup() {
    createCanvas(400, 400);

    rows = floor(height / H);
    cols = floor(width / W);
    cellCount = rows * cols;

    for (let i = 0; i < cellCount; i++) {
        GRID[i] = new Cell(i);
    }
}

function draw() {
    background(50);
    for (let i = 0; i < cellCount; i++) {
        GRID[i].show();
    }
}
