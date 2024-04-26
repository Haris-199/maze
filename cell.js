class Cell {

    constructor(id) {
        this.setId = id;
        this.index = id;
        this.x = (this.index % cols) * W;
        this.y = floor(this.index / cols) * H;
        this.sides = [true, true, true, true];
        this.distance = Infinity;
        this.previous;
    }

    show() {
        noFill();
        stroke(200);
        if (this.sides[0])
            line(this.x, this.y, this.x + W, this.y); // top
        if (this.sides[1])
            line(this.x + W, this.y, this.x + W, this.y + H); // right
        if (this.sides[2])
            line(this.x + W, this.y + H, this.x, this.y + H); // bottom
        if (this.sides[3])
            line(this.x, this.y + H, this.x, this.y); // left
        if (this.index === 0 || this.index === cellCount - 1) {
            fill(0, 200, 0, 50);
            noStroke();
            rect(this.x, this.y, W, H);
        }
        if (visited[this.index]) {
            textAlign(CENTER);
            textSize((W+H)/4);
            stroke(250);
            fill(250);
            text(this.distance, this.x + W/2, this.y + H/2 + (W+H)/16);
        }
    }

    neighbours() {
        let n = [];
        let topId = this.index - cols;
        let rightId = this.index + 1;
        let bottomId = this.index + cols;
        let leftId = this.index - 1;

        if (this.index - cols >= 0) {
            let top = CELLS[topId];
            if (!(this.sides[0] || top.sides[2]))
                n.push(top);
        }
        if ((this.index + 1) % cols != 0) {
            let right = CELLS[rightId];
            if (!(this.sides[1] || right.sides[3]))
                n.push(right);
        }
        if (this.index + cols < cellCount) {
            let bottom = CELLS[bottomId];
            if (!(this.sides[2] || bottom.sides[0]))
                n.push(bottom);
        }
        if (this.index % cols != 0) {
            let left = CELLS[leftId];
            if (!(this.sides[3] || left.sides[1]))
                n.push(left);
        }

        return n;
    }

}
