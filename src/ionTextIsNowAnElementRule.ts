import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'ion-text';

export const ruleName = 'ion-text-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive, undefined, 'parent');
