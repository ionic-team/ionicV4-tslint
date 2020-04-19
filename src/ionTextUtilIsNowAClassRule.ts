import { createDirectiveToClassRuleClass } from './helpers/directiveToClass';

const transformations = new Map([
  ['text-left', 'ion-text-left'],
  ['text-right', 'ion-text-right'],
  ['text-start', 'ion-text-start'],
  ['text-end', 'ion-text-end'],
  ['text-center', 'ion-text-center'],
  ['text-justify', 'ion-text-justify'],
  ['text-wrap', 'ion-text-wrap'],
  ['text-nowrap', 'ion-text-nowrap']
]);
const directiveCategory = 'text';
const className = 'ion-text';
export const ruleName = 'ion-text-util-is-now-a-class';
export const Rule = createDirectiveToClassRuleClass(ruleName, transformations, directiveCategory, className);
