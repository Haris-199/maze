const GRID = [];
let wallsSequence = [];
const sets = [];
const W = 40;
const H = W;
let rows, cols, cellCount;

let state = 0;

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
    GRID[0].distance = 0;

    wallsSequence = wallsSequence.filter((t={}, a => !(t[a] = a in t)));
    for (let i = 0; i < wallsSequence.length; i++) {
        let rand = Math.floor(Math.random() * wallsSequence.length);
        let temp = wallsSequence[i];
        wallsSequence[i] = wallsSequence[rand];
        wallsSequence[rand] = temp;
    }

    // console.log(GRID)
    let pq = new CellPriorityQueue();
    GRID[3].distance = 10;
    GRID[13].distance = 1;
    GRID[23].distance = 21;
    GRID[5].distance = 9;
    GRID[15].distance = 9;
    GRID[50].distance = 2;
    GRID[34].distance = 92;
    GRID[1].distance = 9;
    GRID[4].distance = 5;
    pq.buildHeap(GRID);
    console.log(pq);
    console.log(pq.extractMin());
    console.log(pq);

}

let iter = 0;
function draw() {
    background(50);

    for (let i = 0; i < cellCount; i++) {
        GRID[i].show();
    }

    if (state === 0) {
        let len = wallsSequence.length;
        let index1 = wallsSequence[iter][0];
        let index2 = wallsSequence[iter][1];
        let cell1 = GRID[index1];
        let cell2 = GRID[index2];
        let set1 = sets[cell1.setId];
        let set2 = sets[cell2.setId];

        if (set1 != set2) {
            let temp = cell2.setId;
            set2.forEach( item => {item.setId = cell1.setId} );
            sets[cell1.setId] = sets[cell1.setId].union(sets[temp]);
            sets[temp].clear();

            if (cell2.index - cell1.index == 1) {
                cell1.sides[1] = false;
                cell2.sides[3] = false;
            } else if (cell2.index - cell1.index == cols) {
                cell1.sides[2] = false;
                cell2.sides[0] = false;
            }
        }
        iter++;
        if (iter === len) {
            state = 1;
            iter = 0;
        }
    }
}
