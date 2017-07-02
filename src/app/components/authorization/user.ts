
export class User {

  given_name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
