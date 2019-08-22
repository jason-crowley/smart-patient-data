const required = () => { throw new Error('Missing required parameter'); };

export default class ResponseItem {
  constructor({
    id = required(),
    date = required(),
    value = required(),
    unit = required(),
    code = required(),
  } = {}) {
    this.id = id;
    this.date = date;
    this.value = value;
    this.unit = unit;
    this.code = code;
  }

  static from(resource) {
    switch (resource.resourceType) {
      case 'Observation': {
        const {
          id,
          code,
          effectiveDateTime,
          valueQuantity: { value, unit } = {}
        } = resource;
        const date = new Date(effectiveDateTime);
        return new ResponseItem({ id, date, value, unit, code });
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
            if (typeof value !== 'number') return;
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
