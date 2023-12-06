import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DrawerService} from "./services/drawer.service";
import {FormsModule} from "@angular/forms";
import {Hare} from "./models/hare";
import {Wolf} from "./models/wolf";
import {Configuration} from "./models/configuration";
import {TimerService} from "./services/timer.service";
import {AnimalFactoryService} from "./services/animal-factory.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'project';
    wolfStartY = this.configuration.wolfDefaultY;
    expectedTime = 0;
    hare = this.animalFactory.getNewHare();
    wolf = this.animalFactory.getNewWolf(this.hare, this.wolfStartY);


    constructor(public drawer: DrawerService,
                public configuration: Configuration,
                public animalFactory: AnimalFactoryService) {
    }

    onCanvasClick($event: MouseEvent) {
        // console.log(this.drawer.hare.x);
        // console.log(this.drawer.hare.dx);
    }

    ngOnInit() {



        let V = this.configuration.wolfDefaultSpeed;
        let u = this.configuration.hareDefaultSpeed
        this.expectedTime = (-this.wolfStartY + this.configuration.centerY) * V / (V * V - u * u);



        this.drawer.start(this.hare, this.wolf);
    }

    ngAfterViewInit(): void {
        this.drawer.draw();
        setInterval(() => {
            this.drawer.draw();
        }, this.configuration.MILLISECONDS2SECONDS / this.configuration.fps);
    }

    onRestartButtonClick($event: MouseEvent) {
        // let hare = new Hare(
        //     this.configuration.centerX,
        //     this.configuration.centerY,
        //     this.configuration.canvasWidth,
        //     this.configuration.canvasHeight,
        //     this.configuration.hareDefaultSpeed,
        //     this.configuration.radius
        // );
        //
        // let wolf = new Wolf(
        //     hare,
        //     this.configuration.centerX,
        //     this.wolfStartY,
        //     this.configuration.canvasWidth,
        //     this.configuration.canvasHeight,
        //     this.configuration.wolfDefaultSpeed,
        //     this.configuration.radius
        // );

        this.hare = this.animalFactory.getNewHare();
        this.wolf = this.animalFactory.getNewWolf(this.hare, this.wolfStartY);
        this.drawer.start(this.hare, this.wolf);

    }

    protected readonly TimerService = TimerService;
    protected readonly Math = Math;
}
