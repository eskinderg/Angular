export class Event {
    event_id: string;
    title: string = '';
    complete = false;
    active = true;
    user_id: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
