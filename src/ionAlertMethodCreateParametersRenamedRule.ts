import * as Lint from 'tslint';
import { Replacement } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-alert-method-create-parameters-renamed';

/**
 * This rule helps with the conversion of the AlertController API.
 */
class AlertMethodCreateParametersRenamedWalker extends Lint.RuleWalker {
  private details = {
    actionControllerVariableName: '',
    foundPropertyArray: []
  };

  visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
    debugger;

    for (let element of node.parameters) {
      const typeName = element.type.getFullText().trim();
      if (typeName === 'AlertController') {
        this.details.actionControllerVariableName = (element.name as any).escapedText;
        this.tryAddFailure();
        break;
      }
    }
  }

  visitCallExpression(node: ts.CallExpression) {
    const expression = node.expression as any;

    if (expression.name && expression.name.text === 'create') {
      for (let argument of (node.arguments[0] as any).properties) {
        const name = argument.name.text;

        switch (name) {
          case 'title':
          case 'subTitle':
            argument.parentVariableName = (node.expression as any).expression.text;
            this.details.foundPropertyArray.push(argument);
            this.tryAddFailure();
            break;
        }
      }
    }
  }

  private tryAddFailure() {
    // Don't process until the actionControllerVariableName has been found

    if (!this.details.actionControllerVariableName) {
      return;
    }

    for (let i = this.details.foundPropertyArray.length - 1; i >= 0; i--) {
      let argument = this.details.foundPropertyArray[i];

      const replacementParam = argument.name.text === 'title' ? 'header' : 'subHeader';

      console.log(this.details.actionControllerVariableName, argument.parentVariableName);
      if (this.details.actionControllerVariableName && this.details.actionControllerVariableName === argument.parentVariableName) {
        const errorMessage = `The ${argument.name.text} field has been replaced by ${replacementParam}.`;

        const replacement = new Replacement(argument.name.getStart(), argument.name.getWidth(), replacementParam);

        this.addFailure(this.createFailure(argument.name.getStart(), argument.name.getWidth(), errorMessage, [replacement]));
        this.details.foundPropertyArray.splice(i, 1);
      }
    }
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'AlertController now takes in different parameters to its create method.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new AlertMethodCreateParametersRenamedWalker(sourceFile, this.getOptions()));
  }
}
