import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributesRenamed';

export const ruleName = 'ion-fab-attributes-renamed';

const replacementMap = new Map([
  ['center', 'horizontal="center"'],
  ['start', 'horizontal="start"'],
  ['end', 'horizontal="end"'],
  ['top', 'vertical="top"'],
  ['bottom', 'vertical="bottom"'],
  ['middle', 'vertical="center"']
]);

const IonFabAttributesRenamedTemplateVisitor = createAttributesRenamedTemplateVisitorClass(['ion-fab'], replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-fab have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonFabAttributesRenamedTemplateVisitor
      })
    );
  }
}
