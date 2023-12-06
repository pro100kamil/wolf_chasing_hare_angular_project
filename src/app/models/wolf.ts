import {Animal} from "./animal";
import {Hare} from "./hare";
import {Injectable} from "@angular/core";
import {TimerService} from "../services/timer.service";
import {Configuration} from "./configuration";

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

    move(fps: number) {
        let yW = this.hare.curY - this.curY;
        let yH = this.hare.curY;
        let xW = this.curX;
        let xH = this.hare.curX;
        let v = this.speed / fps;

        let dx = 0, dy = 0;
        if (Math.abs(xH - xW) < 1) {  // < eps
            if (Math.abs(yW) < 1) {
                dx = 0;
                dy = 0;
                Configuration.move = false;
                TimerService.end();
            }
            else {
                dx = 0;
                dy = yW >= yH ? -v : v;
            }
        } else {
            let tgAlpha = yW / (xH - xW);
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
    }
}
