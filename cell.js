class Cell {

    constructor(id) {
        this.id = id;
        this.index = id;
        this.x = (this.index % cols) * W;
        this.y = floor(this.index / cols) * H;
        this.sides = [true, true, true, true];
    }

    show() {
        stroke(200);
        if (this.sides[0])
            line(this.x, this.y, this.x + W, this.y); // top
        if (this.sides[1])
            line(this.x + W, this.y, this.x + W, this.y + H); // right
        if (this.sides[2])
            line(this.x + W, this.y + H, this.x, this.y + H); // bottom
        if (this.sides[3])
            line(this.x, this.y + H, this.x, this.y); // left
    }

}
