export class Event {
  id: number;
  title: String = '';
  complete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
