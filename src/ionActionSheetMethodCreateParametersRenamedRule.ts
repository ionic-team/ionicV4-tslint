import * as Lint from 'tslint';
import { IOptions, Replacement } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-action-sheet-method-create-parameters-renamed';

/**
 * This rule helps with the conversion of the ActionSheetController API.
 */
class ActionSheetMethodCreateParametersRenamedWalker extends Lint.RuleWalker {
  //actionControllerVariableName = undefined;
  foundPropertyArray = [];

  // TODO: Not sure if we need to track the name of the ActionSheetController variable.
  // visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
  //   debugger;
  //   for (let element of node.parameters) {
  //     const typeName = (element.type as any).typeName.text;
  //     if (typeName === 'ActionSheetController') {
  //       this.actionControllerVariableName = (element.name as any).text;
  //       this.tryAddFailure();
  //       break;
  //     }
  //   }

  //   super.visitConstructorDeclaration(node);
  // }

  visitCallExpression(node: ts.CallExpression) {
    const expression = node.expression as any;

    if (expression.name && expression.name.text === 'create') {
      for (let argument of (node.arguments[0] as any).properties) {
        const name = argument.name.text;

        switch (name) {
          case 'title':
          case 'subTitle':
            argument.parentVariableName = (node.expression as any).expression.text;
            this.foundPropertyArray.push(argument);
            this.tryAddFailure();
            break;
        }
      }
    }
  }

  private tryAddFailure() {
    for (let i = this.foundPropertyArray.length - 1; i >= 0; i--) {
      let argument = this.foundPropertyArray[i];

      const replacementParam = argument.name.text === 'title' ? 'header' : 'subHeader';

      // TODO: Determine if this needs to be added in later.
      //if (this.actionControllerVariableName && this.actionControllerVariableName === argument.parentVariableName) {
      const errorMessage = `The ${argument.name.text} field has been replaced by ${replacementParam}.`;

      const replacement = new Replacement(argument.name.getStart(), argument.name.getWidth(), replacementParam);

      this.addFailure(this.createFailure(argument.name.getStart(), argument.name.getWidth(), errorMessage, [replacement]));
      this.foundPropertyArray.splice(i, 1);

      //}
    }
  }
}

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
    return this.applyWithWalker(new ActionSheetMethodCreateParametersRenamedWalker(sourceFile, this.getOptions()));
  }
}
