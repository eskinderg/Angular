export class User {
    given_name: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
