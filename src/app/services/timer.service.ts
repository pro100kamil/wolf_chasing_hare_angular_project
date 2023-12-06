import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    static unknownTime = -1;

    static startTime: number;
    static endTime = TimerService.unknownTime;


    constructor() {
    }

    static start() {
        this.startTime = new Date().getTime(); //ms
        this.endTime = TimerService.unknownTime;
    }

    static end() {
        if (TimerService.endTime === TimerService.unknownTime)
            this.endTime = new Date().getTime();
    }

    static getCurrentTimeExecutionInSeconds(): number {
        if (TimerService.endTime === TimerService.unknownTime)
            return (new Date().getTime() - this.startTime) / 1000;
        return (this.endTime - this.startTime) / 1000;
    }
}
