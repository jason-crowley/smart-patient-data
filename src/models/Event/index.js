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
          // category: [{}] = [{}],
          medicationCodeableConcept: code,
          authoredOn: startDate,
        } = resource;
        return new Event({ category, code, startDate });
      }
      case 'Condition': {
        const {
          code,
          onsetDateTime: startDate,
          abatementDateTime: endDate,
        } = resource;
        return new Event({ category, code, startDate, endDate });
      }
      case 'Encounter': {
        const {
          type: code,
          period: [{ start: startDate, end: endDate }] = [{}],
        } = resource;
        return new Event({ category, code, startDate, endDate });
      }
      default:
        throw new Error(`Category '${category}' is not supported at this time.`);
    }
  }
};
