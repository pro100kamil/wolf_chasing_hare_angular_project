import {Injectable} from "@angular/core";
import {TimerService} from "../services/timer.service";

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    fps = 100;
    MILLISECONDS2SECONDS = 1000;

    canvasWidth= 1000;
    canvasHeight = 500;

    centerX = 200;
    centerY = 250;
    // (centerX;centerY) - point with (0;0) math coordinates

    radius = 10;

    // hareColor = "#c4c4c4";
    // wolfColor = "#100d0d";

    hareColor = "#51ff16";
    wolfColor = "#ff0202";

    hareDefaultSpeed = 70;     //pixels/second
    wolfDefaultSpeed = 70;     //pixels/second

    wolfDefaultY = this.centerY - 200;
}
