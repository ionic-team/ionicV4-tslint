import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributesRenamed';

export const ruleName = 'ion-label-attributes-renamed';

const replacementMap = new Map([['fixed', 'position="fixed"'], ['floating', 'position="floating"'], ['stacked', 'position="stacked"']]);

const IonButtonAttributesAreRenamedTemplateVisitor = createAttributesRenamedTemplateVisitorClass(['ion-label'], replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-label have been renamed.',
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
