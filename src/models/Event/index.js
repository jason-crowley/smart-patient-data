// const required = () => { throw new Error('Missing required parameter'); };

export default class Event {
  constructor({
    startDate,
    endDate,
    type,
    description,
  } = {}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.description = description;
  }
};
