export class Note {
    text: string;
    colour: string;
    left: number;
    top: number;
    id: string;
    dirty: boolean;
    
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}

export interface AppState {
  notes: Note[];
}
