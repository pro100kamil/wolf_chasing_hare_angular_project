export interface Animal {
    curX: number;
    curY: number;
    speed: number;

    move(fps: number): void;
}
