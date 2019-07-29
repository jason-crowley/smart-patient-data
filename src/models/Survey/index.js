// const required = () => throw new Error('Missing required parameter');

export default class Survey {
  // Specify defaults and required parameters
  constructor({
    title = '',
    name = title,
    status = 'unknown',
    experimental = false,
    date = new Date().toISOString(),
    publisher = '',
    description = '',
    items = [],
    ...restProps
  } = {}) {

    // Initialize fields
    this.title = title;
    this.name = name;
    this.status = status;
    this.experimental = experimental;
    this.date = date;
    this.publisher = publisher;
    this.description = description;
    this.items = items;
    Object.assign(this, restProps);
  }

  toFhir() {
    const { items, ...fhirProps } = this;
    return {
      ...fhirProps,
      item: items.map(item => item.toFhir()),
    };
  }
};
