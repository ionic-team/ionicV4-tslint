import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createParametersRenamedClass } from './helpers/parametersRenamed';

export const ruleName = 'ion-action-sheet-method-create-parameters-renamed';

const parameterMap = new Map([['title', 'header'], ['subTitle', 'subHeader']]);
const Walker = createParametersRenamedClass('create', 'ActionSheetController', parameterMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'ActionSheetController now takes in different parameters to its create method.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}
