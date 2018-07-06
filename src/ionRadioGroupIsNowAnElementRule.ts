import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'radio-group';

export const ruleName = 'ion-radio-group-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive, 'ion-radio-group');
