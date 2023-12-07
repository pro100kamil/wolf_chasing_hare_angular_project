import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DrawerService} from "./services/drawer.service";
import {FormsModule} from "@angular/forms";
import {Configuration} from "./configuration/configuration";
import {AnimalFactoryService} from "./services/animal-factory.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
    protected readonly Math = Math;
    protected readonly Configuration = Configuration;

    title = 'project';

    wolfStartY = Configuration.wolfDefaultY;
    wolfSpeed = Configuration.wolfDefaultSpeed;
    hareSpeed = Configuration.hareDefaultSpeed;

    hare = this.animalFactory.getNewHare(this.hareSpeed);
    wolf = this.animalFactory.getNewWolf(this.hare, this.wolfStartY, this.wolfSpeed);

    constructor(public drawer: DrawerService,
                public animalFactory: AnimalFactoryService) {
    }

    ngOnInit() {


    }

    ngAfterViewInit(): void {
        this.drawer.init();
        this.drawer.setAnimals(this.hare, this.wolf);
        setInterval(() => {
            this.drawer.draw();
        }, Configuration.MILLISECONDS2SECONDS / Configuration.fps);
    }

    start() {
        Configuration.move = true;
        Configuration.startPosition = false;
    }

    restart() {
        Configuration.move = false;
        Configuration.startPosition = true;

        this.hare = this.animalFactory.getNewHare(this.hareSpeed);
        this.wolf = this.animalFactory.getNewWolf(this.hare, this.wolfStartY, this.wolfSpeed);

        this.drawer.setAnimals(this.hare, this.wolf);
    }


    onStartButtonClick($event: MouseEvent) {
        this.start();
    }

    onRestartButtonClick($event: MouseEvent) {
        this.restart();
    }

    onApplyButtonClick($event: MouseEvent) {
        this.hare.speed = this.hareSpeed;

        this.wolf.curY = Configuration.centerY - this.wolfStartY;
        this.wolf.startY = this.wolfStartY;
        this.wolf.speed = this.wolfSpeed;
    }

    hasChanges() {
        return this.hareSpeed !== this.hare.speed ||
            this.wolfSpeed !== this.wolf.speed ||
            this.wolfStartY !== this.wolf.startY;
    }

    getCurrentDistance(): number {
        let dist = Math.pow(Math.pow(this.hare.curX - this.wolf.curX, 2) +
            Math.pow(this.hare.curY - this.wolf.curY, 2), 0.5);
        if (dist < Configuration.eps) return 0;
        return dist;
    }

    getExpectedTime(): number {
        let V = this.wolf.speed;
        let u = this.hare.speed;
        if (u >= V)
            return Infinity;
        else
            return this.wolf.startY * V / (V * V - u * u);
    }
}
