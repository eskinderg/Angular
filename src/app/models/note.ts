export class Note {
  header: string;
  text: string;
  colour: string;
  left: number;
  top: number;
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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
