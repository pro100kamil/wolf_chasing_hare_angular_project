import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Configuration {
    static move = false;            //есть ли движение в данный момент
    static startPosition = true;    //находятся ли объекты в стартовой позиции

    static fps = 100;
    static MILLISECONDS2SECONDS = 1000;

    static canvasWidth= 1000;
    static canvasHeight = 500;

    static centerX = 50;
    static centerY = Configuration.canvasHeight - 50;
    // (centerX;centerY) - point with (0;0) math coordinates

    static radius = 25;

    // hareColor = "#c4c4c4";
    // wolfColor = "#100d0d";

    static hareColor = "#51ff16";
    static wolfColor = "#ff0202";
    // static wolfColor = "pink";
    static wolfTrajectoryColor = "red";

    static hareDefaultSpeed = 50;     //pixels/second
    static wolfDefaultSpeed = 80;     //pixels/second

    static wolfDefaultY = 350;          //кол-во пикселей над зайцем

    static eps = 1;
}
