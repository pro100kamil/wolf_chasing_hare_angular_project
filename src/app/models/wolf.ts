import {Animal} from "./animal";
import {Hare} from "./hare";
import {Configuration} from "../configuration/configuration";

export class Wolf implements Animal {
    minX = 0;
    minY = 0;

    constructor(public hare: Hare,
                public startY: number,      // в математических координатах
                public curX: number,        // в канвасных координатах
                public curY: number,        // в канвасных координатах
                public maxX: number,
                public maxY: number,
                public speed: number,
                public radius: number) {
    }

    move(fps: number) {
        let yW = this.curY;
        let yH = this.hare.curY;
        let xW = this.curX;
        let xH = this.hare.curX;
        let v = this.speed / fps;

        let dx, dy;

        if (xW === xH) {
            dx = 0;
            dy = v;   // волк может находиться только над зайцем, поэтому движение вниз (в канвасной системе координат)
        } else {
            let tgAlpha = (yH - yW) / (xH - xW);
            let alpha = Math.atan(tgAlpha);

            dx = v * Math.cos(alpha);
            dy = v * Math.sin(alpha);
        }
        if (this.minX <= this.curX + dx - this.radius && this.curX + dx + this.radius <= this.maxX) {
            this.curX += dx;
        }
        if (this.minY <= this.curY + dy - this.radius && this.curY + dy + this.radius <= this.maxY) {
            this.curY += dy;
        }
        if (this.curX >= this.hare.curX || this.curY >= this.hare.curY) {
            Configuration.move = false;
            this.curX = this.hare.curX;
            this.curY = this.hare.curY;
        }
    }
}
