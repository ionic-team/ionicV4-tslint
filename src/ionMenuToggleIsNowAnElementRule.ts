import { createDirectiveToElementRuleClass } from './helpers/directiveToElement';

const directive = 'menuToggle';

export const ruleName = 'ion-menu-toggle-is-now-an-element';
export const Rule = createDirectiveToElementRuleClass(ruleName, directive, 'ion-menu-toggle');
