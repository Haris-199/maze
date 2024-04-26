const CELLS = [];
let wallsSequence = [];
const sets = [];
const W = 10;
const H = W;
let rows, cols, cellCount;
const PQ = new CellPriorityQueue();
let stack = [];
let start, end;
let state = 0;

function setup() {
    createCanvas(400, 400);

    rows = floor(height / H);
    cols = floor(width / W);
    cellCount = rows * cols;

    for (let i = 0; i < cellCount; i++) {
        CELLS[i] = new Cell(i);
        
        sets[i] = new Set();
        sets[i].add(CELLS[i]);

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

    start = CELLS[0];
    end = CELLS[cellCount - 1];

    start.distance = 0;
    PQ.buildHeap(CELLS);
    stack.push(start);

    wallsSequence = wallsSequence.filter((t={}, a => !(t[a] = a in t)));
    for (let i = 0; i < wallsSequence.length; i++) {
        let rand = Math.floor(Math.random() * wallsSequence.length);
        let temp = wallsSequence[i];
        wallsSequence[i] = wallsSequence[rand];
        wallsSequence[rand] = temp;
    }
}

let iter = 0;
let visited = [];
function draw() {
    background(50);

    CELLS.forEach(cell => cell.show());

    // State 0: Generate maze
    // State 1: Find shortest path with Dijkstra's algorithm
    // State 2: Find shortest path with DFS
    // State 3: Draw path
   
    if (state === 0) {
        let len = wallsSequence.length;
        let index1 = wallsSequence[iter][0];
        let index2 = wallsSequence[iter][1];
        let cell1 = CELLS[index1];
        let cell2 = CELLS[index2];
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
            state = 2;
            iter = 0;
        }
    } else if (state === 1) {
        current = PQ.extractMin();
        if (current) {
            visited[current.index] = true;
            current.neighbours().forEach( cell => {
                if (current.distance + 1 < cell.distance) {
                    cell.previous = current;
                    PQ.updateKey(cell, current.distance + 1);
                }
            });
            if (visited[end.index]) {
                state = 3;
            }
        }
    } else if (state === 2) {
        if (stack.length > 0) {
            cell = stack.pop();
            if (!visited[cell.index]) {
                visited[cell.index] = true;
                cell.neighbours().reverse().forEach( n => {
                    if (!visited[n.index]) {
                        n.previous = cell;
                        stack.push(n);
                    }
                });
            }
        }
        if (visited[end.index]) {
            state = 3;
        }
    } else if (state === 3) {
        let cell = end;
        noFill();
        stroke(200, 20, 100);
        strokeWeight(3);
        beginShape();
        while (cell != undefined) {
            vertex(cell.x + W/2, cell.y + H/2);
            cell = cell.previous;
        }
        endShape();
        strokeWeight(1);
    }
}
