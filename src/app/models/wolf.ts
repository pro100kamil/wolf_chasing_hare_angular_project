import {Animal} from "./animal";
import {Hare} from "./hare";
import {Injectable} from "@angular/core";
import {TimerService} from "../services/timer.service";

export class Wolf implements Animal {
    minX = 0;
    minY = 0;
    end = false;

    constructor(public hare: Hare,
                public curX: number,
                public curY: number,
                public maxX: number,
                public maxY: number,
                public speed: number,
                public radius: number) {
    }

    move() {
        if (this.end) return;
        // let yW = this.hare.curY - this.curY;
        // let yH = this.hare.curY;
        // let xW = this.curX;
        // let xH = this.hare.curX;
        // let v = this.speed;

        let yW = this.hare.curY - this.curY;
        let yH = this.hare.curY;
        let xW = this.curX;
        let xH = this.hare.curX;
        let v = this.speed;

        let dx = 0, dy = 0;
        if (Math.abs(xH - xW) < 1) {  // < eps
            if (Math.abs(yW) < 1) {
                if (this.hare.end) return;
                dx = 0;
                dy = 0;
                this.hare.stop();
                TimerService.end();
                this.end = true;
            }
            else {
                dx = 0;
                dy = yW >= yH ? -v : v;
            }
            console.log("!! xh <= xW");

        } else {
            let tgAlpha = yW / (xH - xW);
            let alpha = Math.atan(tgAlpha);
            // if (alpha < 0) alpha += Math.PI / 2;

            dx = v * Math.cos(alpha);
            dy = v * Math.sin(alpha);

        }

        if (this.minX <= this.curX + dx - this.radius && this.curX + dx + this.radius <= this.maxX) {
            this.curX += dx;
        }
        if (this.minY <= this.curY + dy - this.radius && this.curY + dy + this.radius <= this.maxY) {
            this.curY += dy;
        }

        console.log(this.curX, this.curY);

    }
}
