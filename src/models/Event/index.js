const required = () => { throw new Error('Missing required parameter'); };

export default class Event {
  constructor({
    category = required(),
    type,
    code = required(),
    startDate = required(),
    endDate = startDate,
  } = {}) {
    this.category = category;
    this.type = type;
    this.code = code;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static from(resource) {
    const { resourceType: category } = resource;
    switch (category) {
      case 'MedicationRequest': {
        const {
          medicationCodeableConcept: code,
          authoredOn,
        } = resource;
        const startDate = new Date(authoredOn);
        return new Event({ category, code, startDate });
      }
      case 'Condition': {
        const {
          code,
          onsetDateTime,
          abatementDateTime,
        } = resource;
        const startDate = new Date(onsetDateTime);
        const endDate = new Date(abatementDateTime);
        return new Event({ category, code, startDate, endDate });
      }
      case 'Encounter': {
        const {
          type: [code],
          period: { start, end } = {},
        } = resource;
        const startDate = new Date(start);
        const endDate = new Date(end);
        return new Event({ category, code, startDate, endDate });
      }
      default:
        throw new Error(`Category '${category}' is not supported at this time.`);
    }
  }
};
