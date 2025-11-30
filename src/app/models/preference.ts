export class Preference {
    pref_id?: number;
    user_id: string;
    dark_mode: boolean;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
