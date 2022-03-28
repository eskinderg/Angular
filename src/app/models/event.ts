export class Event {
  id: number;
  title: string = '';
  complete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
