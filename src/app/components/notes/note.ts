export class Note {
    text: string;
    colour: string;
    left: number;
    top: number;
    id: number;
    dirty: boolean;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
