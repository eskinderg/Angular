import { Pipe, PipeTransform, signal, effect } from '@angular/core';

@Pipe({
    name: 'dateago',
    standalone: true,
    pure: false
})
export class AgoDatePipe implements PipeTransform {
    private now = signal(new Date());
    private timer: any;

    constructor() {
        effect(() => {
            if (this.timer) clearInterval(this.timer);

            let intervalTime = 30_000;
            const ageInSeconds = Math.floor((Date.now() - this.now().getTime()) / 1000);

            if (ageInSeconds < 60) intervalTime = 5_000;
            else if (ageInSeconds > 3600) intervalTime = 300_000;

            this.timer = setInterval(() => this.now.set(new Date()), intervalTime);
            return () => clearInterval(this.timer);
        });
    }

    transform(value: any): any {
        if (!value) return value;

        const current = this.now();
        const inputDate = new Date(value);

        const seconds = Math.floor((current.getTime() - inputDate.getTime()) / 1000);

        if (seconds < 29) return 'just now';

        const intervals: Record<string, number> = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (const i in intervals) {
            const counter = Math.floor(seconds / intervals[i]);
            if (counter > 0) return counter === 1 ? `${counter} ${i} ago` : `${counter} ${i}s ago`;
        }

        return value;
    }
}
