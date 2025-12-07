export class User {
    owner: string;
    user_id: string;
    firstname: string;
    email: string;
    created_at: Date;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
