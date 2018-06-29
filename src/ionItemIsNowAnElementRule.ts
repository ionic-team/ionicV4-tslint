import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'ion-item';

export const ruleName = 'ion-item-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive);
