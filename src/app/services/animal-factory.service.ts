import {Injectable} from '@angular/core';
import {Configuration} from "../configuration/configuration";
import {Hare} from "../models/hare";
import {Wolf} from "../models/wolf";

@Injectable({
    providedIn: 'root'
})
export class AnimalFactoryService {
    getNewHare(speed: number): Hare {
        return new Hare(
            Configuration.centerX,
            Configuration.centerY,
            Configuration.canvasWidth,
            Configuration.canvasHeight,
            speed,
            Configuration.radius
        );
    }

    getNewWolf(hare: Hare, wolfStartY: number, speed: number): Wolf {
        return new Wolf(
            hare,
            wolfStartY,
            Configuration.centerX,
            Configuration.centerY - wolfStartY,
            Configuration.canvasWidth,
            Configuration.canvasHeight,
            speed,
            Configuration.radius
        );
    }
}
