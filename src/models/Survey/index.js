// const required = () => { throw new Error('Missing required parameter'); };

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

    // Check for uniqueness in itemIds
    const itemStack = [...items];
    const seenIds = new Set();
    while (itemStack.length) {
      const { itemId, items } = itemStack.pop();
      if (seenIds.has(itemId))
        throw new Error(`Item id ${itemId} is not unique.`);
      seenIds.add(itemId);
      itemStack.push(...items);
    }
  }

  toFhir() {
    const { items, ...fhirProps } = this;
    return {
      ...fhirProps,
      resourceType: 'Questionnaire',
      item: items.map(item => item.toFhir()),
    };
  }
};
