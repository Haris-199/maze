class CellPriorityQueue {
    
    constructor() {
        this.heap = []
        this.size = 0;

    }

    extractMin() {

    }

    insert(cell) {

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
            heapify(smallest);
        }
    }

    buildHeap(arr) {
        this.heap = [...arr];
        this.size = this.heap.length;
        for (let i = Math.floor(this.size / 2); i >= 0; i--)
            this.heapify(i);
    }

    updateKey(index, newKey) {

    }

}
