import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributeEventsRenamed';

export const ruleName = 'ion-menu-events-renamed';

const replacementMap = new Map([
  ['ionOpen', 'ionDidOpen'],
  ['ionClose', 'ionDidClose']
]);

const TemplateVisitor = createAttributesRenamedTemplateVisitorClass(undefined, replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Events for ion-menu have changed',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: TemplateVisitor
      })
    );
  }
}
