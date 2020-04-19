import { createDirectiveToClassRuleClass } from './helpers/directiveToClass';

const transformations = new Map([
  ['padding', 'ion-padding'],
  ['no-padding', 'ion-no-padding'],
  ['padding-bottom', 'ion-padding-bottom'],
  ['padding-top', 'ion-padding-top'],
  ['padding-left', 'ion-padding-start'],
  ['padding-right', 'ion-padding-end'],
  ['padding-horizontal', 'ion-padding-horizontal'],
  ['padding-vertical', 'ion-padding-vertical']
]);

const directiveCategory = 'padding';
const className = 'ion-padding';
export const ruleName = 'ion-padding-util-is-now-a-class';
export const Rule = createDirectiveToClassRuleClass(ruleName, transformations, directiveCategory, className);
