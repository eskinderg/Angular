export class Genre {
    id: number;
    name: string = '';
    total_results: string = '';
    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
