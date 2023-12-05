import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    canvasWidth= 1200;
    canvasHeight = 300;

    centerX = 200;
    centerY = 200;
    // (centerX;centerY) - point with (0;0) math coordinates

    radius = 10;

    hareColor = "#c4c4c4";
    wolfColor = "#100d0d";

    hareDefaultSpeed = 1;
    wolfDefaultSpeed = 1;

    wolfDefaultY = this.centerY - 100;
}
