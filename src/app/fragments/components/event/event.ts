export class Event {
    id: string;
    title: string = '';
    complete = false;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
