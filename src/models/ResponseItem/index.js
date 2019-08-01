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
      case 'Observation': {
        const {
          id,
          code,
          effectiveDateTime: date,
          valueQuantity: { value } = {}
        } = resource;
        return new ResponseItem({ id, date, code, value });
      }
      case 'QuestionnaireResponse': {
        const hits = [];
        const stack = [resource];
        const { authored: date } = resource;
        while (stack.length) {
          const { linkId: id, answer, item } = stack.pop();
          if (item) stack.push(...item);
          if (!answer) continue;
          Object.values(answer).forEach(value => {
            hits.push(new ResponseItem({ id, date, value, code: 'unknown' }));
          });
        }
        return hits;
      }
      default:
        throw new Error(
          `Type '${resource.resourceType}' is not supported at this time.`
        );
    }
  }
};
