import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

import { createDirectiveToElementTemplateVisitorClass, generateDescription } from './helpers/directiveToElement';

export const ruleName = 'ion-item-is-now-an-element';
const directive = 'ion-item';

const IonItemIsNowAnElementTemplateVisitor = createDirectiveToElementTemplateVisitorClass(directive);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: generateDescription(directive),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  constructor(options: IOptions) {
    options.ruleSeverity = 'error';
    super(options);
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonItemIsNowAnElementTemplateVisitor
      })
    );
  }
}
