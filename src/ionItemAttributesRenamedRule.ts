import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributesRenamed';

export const ruleName = 'ion-item-attributes-renamed';

const replacementMap = new Map([
  ['item-start', 'slot="start"'],
  ['item-left', 'slot="start"'],
  ['item-end', 'slot="end"'],
  ['item-right', 'slot="end"']
]);

const IonItemAttributesRenamedTemplateVisitor = createAttributesRenamedTemplateVisitorClass('ion-item', replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-item have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonItemAttributesRenamedTemplateVisitor
      })
    );
  }
}
