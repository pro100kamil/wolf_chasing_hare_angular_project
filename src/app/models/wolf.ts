import {Animal} from "./animal";
import {Hare} from "./hare";
import {Injectable} from "@angular/core";

export class Wolf implements Animal {
    minX = 0;
    minY = 0;

    constructor(public hare: Hare,
                public curX: number,
                public curY: number,
                public maxX: number,
                public maxY: number,
                public speed: number,
                public radius: number) {
    }

    move() {
        let yW = this.curY;
        let xW = this.curX;
        let xH = this.hare.curX;
        let v = this.speed;

        let dx = 0, dy = 0;
        if (xH == xW) {
            console.log("!! xh == xW");
            dx = 0;
            dy = v;
        } else {
            let tgAlpha = yW / (xH - xW);
            let alpha = Math.atanh(tgAlpha);

            if (isNaN(alpha)) return;

            console.log(alpha, v);

            dx = v * Math.sin(alpha);
            dy = -v * Math.cos(alpha);

            console.log(dx, dy);


        }

        if (this.minX <= this.curX + dx - this.radius && this.curX + dx + this.radius <= this.maxX) {
            this.curX += dx;
        }
        if (this.minY <= this.curY + dy - this.radius && this.curY + dy + this.radius <= this.maxY) {
            this.curY += dx;
        }

        console.log(this.curX, this.curY);

    }
}
