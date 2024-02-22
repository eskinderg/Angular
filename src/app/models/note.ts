export class Note {
  header: string;
  text: string;
  colour: string;
  left: number;
  top: number;
  selection: string;
  width: number;
  height: number;
  id: number;
  dirty: boolean;
  dateCreated: Date;
  dateModified: Date;
  dateArchived: Date;
  pinOrder: Date;
  archived: boolean;
  active: boolean;
  spellCheck: boolean;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
