class Cell {

    constructor(id) {
        this.setId = id;
        this.index = id;
        this.x = (this.index % cols) * W;
        this.y = floor(this.index / cols) * H;
        this.sides = [true, true, true, true];
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
        // textAlign(CENTER);
        // textSize((W+H)/4);
        // stroke(250);
        // fill(250);
        // text(this.setId, this.x + W/2, this.y + H/2);
    }

}
