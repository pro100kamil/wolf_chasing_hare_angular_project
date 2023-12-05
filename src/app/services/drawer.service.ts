import {Injectable} from '@angular/core';
import {Animal} from "../models/animal";
import {Hare} from "../models/hare";
import {Wolf} from "../models/wolf";
import {Configuration} from "../models/configuration";
import {TimerService} from "./timer.service";

@Injectable({
    providedIn: 'root'
})
export class DrawerService {
    // canvas: HTMLElement | null;

    canvas: any;
    ctx: any;
    hare: Hare = <Hare><unknown>null;
    wolf: Wolf = <Wolf><unknown>null;

    hareSpeed: number = 1;
    wolfSpeed: number = 2;
    // startX = 100;
    // startY = 200;
    // radius = 10;
    // private hareY: number = 0;
    // private hareDx: number = 2;
    // private hareDy: number = -2;

    constructor(
        public configuration: Configuration
    ) {}

    start(hare: Hare, wolf: Wolf) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.hare = hare;
        this.wolf = wolf;

        TimerService.start();
        // this.hareX = this.canvas?.width / 2;
        // this.hareY = this.canvas.height - 30;
        // this.hareDx = dx;
        // this.hareDy = dy;
    }

    drawHare() {
        this.ctx.beginPath();
        this.ctx.arc(this.hare.curX, this.hare.curY, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = this.configuration.hareColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawWolf() {
        this.ctx.beginPath();
        this.ctx.arc(this.wolf.curX, this.wolf.curY, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = this.configuration.wolfColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.hare.move();
        this.drawHare();
        //TODO чтобы скорость не зависела от fps

        this.wolf.move();
        this.drawWolf();



    }
}
