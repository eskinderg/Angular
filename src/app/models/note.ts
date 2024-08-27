export class Note {
    header: string;
    text: string;
    colour: string;
    left: number;
    top: number;
    selection: string;
    width: number;
    height: number;
    id: string;
    dirty: boolean;
    dateCreated: Date;
    dateModified: Date;
    dateArchived: Date;
    dateSync: Date;
    pinOrder: Date;
    archived: boolean;
    pinned: boolean;
    active: boolean;
    spellCheck: boolean;
    owner: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
