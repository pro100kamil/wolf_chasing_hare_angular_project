import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DrawerService} from "./services/drawer.service";
import {FormsModule} from "@angular/forms";
import {Hare} from "./models/hare";
import {Wolf} from "./models/wolf";
import {Configuration} from "./models/configuration";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'project';
    fps = 100;
    MILLISECONDS2SECONDS = 1000;

    constructor(public drawer: DrawerService,
                public configuration: Configuration) {
    }

    onCanvasClick($event: MouseEvent) {
        // console.log(this.drawer.hare.x);
        // console.log(this.drawer.hare.dx);
    }

    ngOnInit() {
        let hare = new Hare(
            this.configuration.centerX,
            this.configuration.centerY,
            this.configuration.canvasWidth,
            this.configuration.canvasHeight,
            this.configuration.hareDefaultSpeed,
            this.configuration.radius
        );

        let wolf = new Wolf(
            hare,
            this.configuration.centerX,
            this.configuration.wolfDefaultY,
            this.configuration.canvasWidth,
            this.configuration.canvasHeight,
            this.configuration.hareDefaultSpeed,
            this.configuration.radius
        );

        this.drawer.start(hare, wolf);
    }

    ngAfterViewInit(): void {
        this.drawer.draw();
        setInterval(() => {
            this.drawer.draw();
        }, this.MILLISECONDS2SECONDS / this.fps);
    }

    onRestartButtonClick($event: MouseEvent) {
        let hare = new Hare(
            this.configuration.centerX,
            this.configuration.centerY,
            this.configuration.canvasWidth,
            this.configuration.canvasHeight,
            this.configuration.hareDefaultSpeed,
            this.configuration.radius
        );

        let wolf = new Wolf(
            hare,
            this.configuration.centerX,
            this.configuration.wolfDefaultY,
            this.configuration.canvasWidth,
            this.configuration.canvasHeight,
            this.configuration.hareDefaultSpeed,
            this.configuration.radius
        );

        this.drawer.start(hare, wolf);

    }
}
