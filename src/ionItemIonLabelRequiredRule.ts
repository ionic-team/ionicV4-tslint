import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createIonLabelRequiredTemplateVisitorClass } from './helpers/ionLabelRequired';

export const ruleName = 'ion-item-ion-label-required';

const TemplateVisitor = createIonLabelRequiredTemplateVisitorClass('ion-item');

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'The ion-item requires an ion-label component. It is no longer automatically added.',
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
