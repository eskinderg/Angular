export class User {
    owner: string;
    id: string;
    firstname: string;
    email: string;
    createdAt: Date;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
