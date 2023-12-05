import {Injectable} from "@angular/core";
import {TimerService} from "../services/timer.service";

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    canvasWidth= 1200;
    canvasHeight = 300;

    centerX = 200;
    centerY = 250;
    // (centerX;centerY) - point with (0;0) math coordinates

    radius = 10;

    hareColor = "#c4c4c4";
    wolfColor = "#100d0d";

    hareDefaultSpeed = 0.1;
    wolfDefaultSpeed = 0.2;

    wolfDefaultY = this.centerY - 200;
}
