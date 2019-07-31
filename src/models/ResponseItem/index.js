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

  static from(resource) {
    switch (resource.resourceType) {
      case 'Observation':
        const {
          id,
          code,
          effectiveDateTime: date,
          valueQuantity: { value }
        } = resource;
        return new ResponseItem({ id, date, code, value });
      default:
        throw new Error(
          `Type '${resource.resourceType}' is not supported at this time.`
        );
    }
  }
};
