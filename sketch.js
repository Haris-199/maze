const GRID = [];
const w = 40;
const h = w;
let cellCount;

function setup() {
    createCanvas(400, 400);
    
    cellCount = (width / w) * (height / 40);
    
    for (let i = 0; i < cellCount; i++) {
        GRID[i] = new Cell(i);
    }
}

function draw() {
    background(50);
}
