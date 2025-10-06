import { Pipe, PipeTransform, signal, effect } from '@angular/core';

@Pipe({
    name: 'dateago',
    standalone: true,
    pure: false // let the signal drive updates
})
export class AgoDatePipe implements PipeTransform {
    private now = signal(new Date());
    private timer: any;

    constructor() {
        // set up a reactive effect to auto-update periodically
        effect(() => {
            // clear any old timer when interval changes
            if (this.timer) clearInterval(this.timer);

            // default to 30s updates
            let intervalTime = 30_000;
            const ageInSeconds = Math.floor((+new Date() - +this.now()) / 1000);

            // dynamically adjust interval
            if (ageInSeconds < 60) intervalTime = 5_000;
            else if (ageInSeconds > 3600) intervalTime = 300_000;

            this.timer = setInterval(() => this.now.set(new Date()), intervalTime);
            return () => clearInterval(this.timer);
        });
    }

    transform(value: any): any {
        if (!value) return value;

        // read the signal to make it reactive
        const current = this.now();
        const seconds = Math.floor((+current - +new Date(value)) / 1000);

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
