import { createElementRenameRuleClass } from './helpers/elementRename';

export const ruleName = 'ion-navbar-is-now-ion-toolbar';

export const Rule = createElementRenameRuleClass(ruleName, 'ion-navbar', 'ion-toolbar');
