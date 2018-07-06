import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributesRenamed';

export const ruleName = 'ion-button-attributes-renamed';

const replacementMap = new Map([
  ['icon-left', 'slot="start"'],
  ['icon-start', 'slot="start"'],
  ['icon-right', 'slot="end"'],
  ['icon-end', 'slot="end"'],
  ['small', 'size="small"'],
  ['large', 'size="large"'],
  ['clear', 'fill="clear"'],
  ['outline', 'fill="outline"'],
  ['solid', 'fill="solid"'],
  ['full', 'expand="full"'],
  ['block', 'expand="block"']
]);

const IonButtonAttributesAreRenamedTemplateVisitor = createAttributesRenamedTemplateVisitorClass(['ion-button'], replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-button have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonButtonAttributesAreRenamedTemplateVisitor
      })
    );
  }
}
