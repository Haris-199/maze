const GRID = [];
let wallsSequence = [];
const sets = [];
const W = 20;
const H = W;
let rows, cols, cellCount;

function setup() {
    createCanvas(400, 400);

    rows = floor(height / H);
    cols = floor(width / W);
    cellCount = rows * cols;

    for (let i = 0; i < cellCount; i++) {
        GRID[i] = new Cell(i);
        
        sets[i] = new Set();
        sets[i].add(GRID[i]);

        let topId = i - cols;
        let rightId = i + 1;
        let bottomId = i + cols;
        let leftId = i - 1;

        if (i - cols >= 0)
            wallsSequence.push([topId, i]);
        if ((i + 1) % cols != 0)
            wallsSequence.push([i, rightId]);
        if (i + cols < cellCount)
            wallsSequence.push([i, bottomId]);
        if (i % cols != 0)
            wallsSequence.push([leftId, i]);
    }

    wallsSequence = wallsSequence.filter((t={}, a => !(t[a] = a in t)));
    generateMaze();
}

function draw() {
    background(50);
    for (let i = 0; i < cellCount; i++) {
        GRID[i].show();
    }
}

function generateMaze() {
    let len = wallsSequence.length;

    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * len);
        let temp = wallsSequence[i];
        wallsSequence[i] = wallsSequence[rand];
        wallsSequence[rand] = temp;
    }

    for (let i = 0; i < len; i++) {
        let index1 = wallsSequence[i][0];
        let index2 = wallsSequence[i][1];
        let cell1 = GRID[index1];
        let cell2 = GRID[index2];
        let set1 = sets[cell1.setId];
        let set2 = sets[cell2.setId];

        if (set1 != set2) {
            console.log("running");
            let temp = cell2.setId;
            set2.forEach( item => {item.setId = cell1.setId} );
            sets[cell1.setId] = sets[cell1.setId].union(sets[temp]);
            sets[temp].delete();

            if (cell2.index - cell1.index == 1) {
                cell1.sides[1] = false;
                cell2.sides[3] = false;
            } else if (cell2.index - cell1.index == cols) {
                cell1.sides[2] = false;
                cell2.sides[0] = false;
            }
        }
    }
}
