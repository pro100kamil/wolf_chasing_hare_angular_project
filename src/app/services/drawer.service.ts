import {Injectable} from '@angular/core';
import {Hare} from "../models/hare";
import {Wolf} from "../models/wolf";
import {Configuration} from "../configuration/configuration";


@Injectable({
    providedIn: 'root'
})
export class DrawerService{
    canvas: any;
    ctx: any;
    hare: Hare = <Hare><unknown>null;
    wolf: Wolf = <Wolf><unknown>null;
    hareImg: HTMLImageElement = <HTMLImageElement><unknown>null;
    wolfImg: HTMLImageElement = <HTMLImageElement><unknown>null;
    curTime = 0;
    wolfTrajectory: Array<Array<number>> = [];

    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.hareImg = new Image();
        this.hareImg.src = "assets/images/hare.png";

        this.wolfImg = new Image();
        this.wolfImg.src = "assets/images/wolf.png";
    }

    setAnimals(hare: Hare, wolf: Wolf) {
        this.hare = hare;
        this.wolf = wolf;
        this.wolfTrajectory = [];
        this.curTime = 0;
    }

    drawHare() {
        this.ctx.drawImage(this.hareImg,
            this.hare.curX - Configuration.radius, this.hare.curY - Configuration.radius,
            Configuration.radius * 2, Configuration.radius * 2);
    }

    drawTrajectory() {
        this.wolfTrajectory.forEach((point) => {
            this.ctx.beginPath();
            this.ctx.arc(point[0], point[1], 1, 0, Math.PI * 2);
            this.ctx.fillStyle = Configuration.wolfTrajectoryColor;
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    drawWolf() {
        this.ctx.drawImage(this.wolfImg,
            this.wolf.curX - Configuration.radius, this.wolf.curY - Configuration.radius,
            Configuration.radius * 2, Configuration.radius * 2);
    }

    drawArrow(x: number, y: number, arrowDelta: number, direction: string): void {
        this.ctx.moveTo(x, y);
        if (direction === "right")
            this.ctx.lineTo(x - arrowDelta, y - arrowDelta);
        else
            this.ctx.lineTo(x - arrowDelta, y + arrowDelta);

        this.ctx.moveTo(x, y);
        if (direction === "right")
            this.ctx.lineTo(x - arrowDelta, y + arrowDelta);
        else
            this.ctx.lineTo(x + arrowDelta, y + arrowDelta);
    }

    drawTextWithDeltaX(text: string, x: number, y: number, delta: number = 4): void {
        //смещение по оси х для надписей на оси y
        this.ctx.fillText(text, x + delta, y);
        this.drawPoint(x, y);
    }

    drawTextWithDeltaY(text: string, x: number, y: number, delta: number = 4): void {
        //смещение по оси y для надписей на оси x
        this.ctx.fillText(text, x, y - delta);
        this.drawPoint(x, y);
    }

    drawPoint(x: number, y: number, delta: number = 2): void {
        this.ctx.rect(x - delta / 2, y - delta / 2, delta, delta);
    }

    drawAxes(radius: number, delta: number): void {
        let arrowDelta: number = 4;
        this.ctx.beginPath();

        this.ctx.fillStyle = "black";
        this.drawPoint(Configuration.centerX, Configuration.centerY, 4);

        this.ctx.moveTo(Configuration.centerX - radius - delta, Configuration.centerY);
        this.ctx.lineTo(Configuration.centerX + 2 * radius + delta, Configuration.centerY); //OX

        this.drawArrow(Configuration.centerX + 2 * radius + delta, Configuration.centerY, arrowDelta, "right");
        this.ctx.fillText("X", Configuration.centerX + 2 * radius + delta, Configuration.centerY);

        this.ctx.moveTo(Configuration.centerX, Configuration.centerY + radius + delta);
        this.ctx.lineTo(Configuration.centerX, Configuration.centerY - radius - delta); //OY
        this.drawArrow(Configuration.centerX, Configuration.centerY - radius - delta, arrowDelta, "up");
        this.ctx.fillText("Y", Configuration.centerX, Configuration.centerY - radius - delta);

        //OX
        this.drawTextWithDeltaY("200", Configuration.centerX + radius / 2, Configuration.centerY);
        this.drawTextWithDeltaY("400", Configuration.centerX + radius, Configuration.centerY);
        this.drawTextWithDeltaY("600", Configuration.centerX + 1.5 * radius, Configuration.centerY);
        this.drawTextWithDeltaY("800", Configuration.centerX + 2 * radius, Configuration.centerY);

        //OY
        this.drawTextWithDeltaX("200", Configuration.centerX, Configuration.centerY - radius / 2);
        this.drawTextWithDeltaX("400", Configuration.centerX, Configuration.centerY - radius);

        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    draw() {
        if (Configuration.move) {
            this.hare.move(Configuration.fps);

            if (Configuration.move) {       // потому что заяц может остановится при достижении границы
                this.wolfTrajectory.push([this.wolf.curX, this.wolf.curY]);
                this.wolf.move(Configuration.fps);
            }

            this.curTime += 1 / Configuration.fps;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawAxes(400, 25);

        this.drawHare();
        this.drawTrajectory();
        this.drawWolf();
    }
}
