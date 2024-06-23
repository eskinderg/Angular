export class Event {
    id: number;
    title: string = '';
    complete = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
