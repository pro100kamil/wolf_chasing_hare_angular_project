import {Animal} from "./animal";
import {Injectable} from "@angular/core";
import {Configuration} from "./configuration";
import {TimerService} from "../services/timer.service";


export class Hare implements Animal{
    minX = 0;
    minY = 0;

    constructor(public curX: number,
                public curY: number,
                public maxX: number,
                public maxY: number,
                public speed: number,
                public radius: number
    ) {}

    move(fps: number) {
        let newX = this.curX + this.speed / fps;
        if (this.minX <= newX - this.radius && newX + this.radius <= this.maxX) {
            this.curX = newX;
        } else {
            Configuration.move = false;
            TimerService.end();
        }
    }
}
