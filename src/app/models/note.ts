export class Note {
    header: string;
    text: string;
    colour: string;
    left: number;
    top: number;
    selection: string;
    width: number;
    height: number;
    note_id: string;
    user_id: string;
    dirty: boolean;
    date_created: Date;
    date_modified: Date;
    local_date_modified: Date;
    date_archived: Date;
    date_deleted: Date;
    last_modified_date: Date;
    date_sync: Date;
    sync: boolean;
    pin_order: number;
    archived: boolean;
    pinned: boolean;
    active: boolean;
    spell_check: boolean;
    owner: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
