class CellPriorityQueue {
    
    constructor() {
        this.heap = []
        this.size = 0;
    }

    heapify(index) {
        let left = index * 2 + 1;
        let right = left + 1;
        
        let smallest = index;

        if (left < this.size && this.heap[smallest].distance > this.heap[left].distance)
            smallest = left;
        if (right < this.size && this.heap[smallest].distance > this.heap[right].distance)
            smallest = right;

        if (smallest != index) {
            let temp = this.heap[index];
            this.heap[index] = this.heap[smallest];
            this.heap[smallest] = temp;
            this.heapify(smallest);
        }
    }

    buildHeap(arr) {
        this.heap = [...arr];
        this.size = this.heap.length;
        for (let i = Math.floor(this.size / 2); i >= 0; i--)
            this.heapify(i);
    }

    extractMin() {
        if (this.size > 0) {
            let min = this.heap[0];
            this.heap[0] = this.heap[--this.size];
            this.heap.pop();
            this.heapify(0);
            return min;
        }
    }

    updateKey(cell, newKey) {
        cell.distance = newKey;

        let index = this.heap.indexOf(cell);
        let parentIndex = Math.floor((index - 1) / 2);
        
        let child = cell;
        let parent = this.heap[parentIndex];

        while (index != 0 && parent.distance > child.distance) {
            let temp = this.heap[index];
            this.heap[index] = this.heap[parentIndex];
            this.heap[parentIndex] = temp;

            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);

            child = this.heap[index];
            parent = this.heap[parentIndex];
        }
    }

}
