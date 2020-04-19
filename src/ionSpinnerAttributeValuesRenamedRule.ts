import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributeValuesRenamedTemplateVisitorClass } from './helpers/attributeValuesRenamed';

export const ruleName = 'ion-spinner-attribute-values-renamed';

const replacementMap = new Map([
  [
    'name',
    new Map([
      ['ios', 'lines'],
      ['ios-small', 'lines-small']
    ])
  ]
]);
const affectedElements = ['ion-spinner', 'ion-loading', 'ion-infinite-scroll', 'ion-refresher'];

const TemplateVisitor = createAttributeValuesRenamedTemplateVisitorClass(affectedElements, replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: `Attribute values of ${affectedElements.join(', ')} have been renamed.`,
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
