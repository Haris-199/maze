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
        let smallest = index;
        
        while (index < Math.floor(this.size / 2)) {
            console.log(this.heap, index);
            let left = index * 2 + 1;
            let right = left + 1;

            if (left < this.size && this.heap[smallest].distance > this.heap[left].distance)
                smallest = left;
            if (right < this.size && this.heap[smallest].distance > this.heap[right].distance)
                smallest = right;

            if (smallest === index) 
                break;

            let temp = this.heap[index];
            this.heap[index] = this.heap[smallest];
            this.heap[smallest] = temp;

            index = smallest;
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
