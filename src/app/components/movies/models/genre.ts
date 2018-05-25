export class Genre {
  id: number;
  name: string = '';
  total_results: string = '';
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
