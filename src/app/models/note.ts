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


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
