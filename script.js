const buttonsDiv = document.getElementById("solve-btns");

buttonsDiv.addEventListener("click", (event) => {
    if (event.target.tagName != "BUTTON" || state != -1)
        return;

    const btn = event.target;

    CELLS.forEach( (cell) => {
        cell.previous = null;
        cell.distance = Infinity;
    });

    stack = [];
    queue = [];
    visited = [];
    pq = new CellPriorityQueue();
    
    stack.push(start);
    queue.push(start);
    start.distance = 0;

    pq.buildHeap(CELLS);

    switch (btn.classList[0]) {
        case "dijkstra":
            state = 1;
            break;
        case "dfs":
            state = 2;
            break;
        case "bfs":
            state = 3;
            break;
        case "a-star":
            // start.distance = heuristic(start);
            state = 4;
            break;
    }
});
