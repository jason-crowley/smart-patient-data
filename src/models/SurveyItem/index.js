// const required = () => throw new Error('Missing required parameter');

export default class SurveyItem {
  // Specify defaults and required parameters
  constructor({
    type = 'unknown',
    itemId = 'unknown',
    label = '',
    text = '',
    items = [],
    ...restProps
  } = {}) {

    // Initialize fields
    this.type = type;
    this.itemId = itemId;
    this.label = label;
    this.text = text;
    this.items = items;
    Object.assign(this, restProps);

    // FHIR Questionnaire Rules
    if ((type === 'group' && !this.items.length) || (type === 'display' && this.items.length))
      throw new Error('Group items must have nested items, display items cannot have nested items');
    if (type === 'question' && this.answerOption && this.answerValueSet)
      throw new Error('A question cannot have both answerOption and answerValueSet');
    if (type !== 'choice' && type !== 'open-choice' && this.answerValueSet)
      throw new Error('Only \'choice\' and \'open-choice\' items can have answerValueSet');
    if (type === 'display' && (this.required || this.repeats))
      throw new Error('Required and repeat aren\'t permitted for display items');
    if ((type === 'group' || type === 'display') && this.initial)
      throw new Error('Initial values can\'t be specified for groups or display items');
    if (type === 'display' && this.readOnly)
      throw new Error('Read-only can\'t be specified for "display" items');
    if (type !== 'question' && this.maxLength)
      throw new Error('Maximum length can only be declared for simple question types');
    if (false) // To add later
      throw new Error('If one or more answerOption is present, initial[x] must be missing');
    if (this.enableWhen && this.enableWhen.length > 0 && !this.enableBehavior)
      throw new Error('If there are more than one enableWhen, enableBehavior must be specified');
    if (!this.repeats && this.initial && this.initial.length > 1)
      throw new Error('Can only have multiple initial values for repeating items');

    // Custom configuration based on type
    switch (type) {
      case 'group':
      case 'display':
      case 'question':
        break;
      case 'boolean':
      case 'decimal':
      case 'integer':
      case 'date':
      case 'dateTime':
      case 'time':
      case 'string':
      case 'text':
      case 'url':
      case 'choice':
      case 'open-choice':
      case 'attachment':
      case 'reference':
      case 'quantity':
        throw new Error('Not supported at this time');
      default:
        throw new Error();
    }
  }

  toFhir() {
    // Exclude 'index' from fhirProps and bind all aliased FHIR properties
    const { index, itemId, label, items, ...fhirProps } = this;
    return {
      ...fhirProps,
      resourceType: 'Questionnaire',
      linkId: itemId,
      prefix: label,
      item: items.map(item => item.toFhir()),
    };
  }
};
