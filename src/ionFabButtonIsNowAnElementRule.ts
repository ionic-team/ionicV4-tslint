import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'ion-fab';
const resultantElement = 'ion-fab-button';

export const ruleName = 'ion-fab-button-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive, resultantElement);
