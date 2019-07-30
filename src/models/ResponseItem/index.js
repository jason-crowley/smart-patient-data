const required = () => { throw new Error('Missing required parameter'); };

export default class ResponseItem {
  constructor({
    id = required(),
    date = required(),
    value = required(),
    code = required(),
  } = {}) {
    this.id = id;
    this.date = date;
    this.value = value;
    this.code = code;
  }
};
