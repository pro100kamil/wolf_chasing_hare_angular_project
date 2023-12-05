import {Animal} from "./animal";
import {Injectable} from "@angular/core";


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

    move() {
        let newX = this.curX + this.speed;
        if (this.minX <= newX - this.radius && newX + this.radius <= this.maxX) {
            this.curX += this.speed;
        }
    }
}
