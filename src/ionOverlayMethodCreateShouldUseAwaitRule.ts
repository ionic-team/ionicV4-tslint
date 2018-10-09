import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';
import { isValidForRule } from './helpers/parametersRenamed';
export const ruleName = 'ion-overlay-method-create-should-use-await';
export const ruleMessage = `The create method of overlay controllers now returns a promise. 
Please ensure that you are handling this promise correctly.`;

const matchingControllers = [
  'PopoverController',
  'ModalController',
  'ActionSheetController',
  'LoadingController',
  'ToastController',
  'AlertController'
];

class CreateMethodShouldUseAwaitWalker extends Lint.RuleWalker {
  visitCallExpression(node: ts.CallExpression) {
    if (node.arguments.length > 0) {
      const firstArgument = node.arguments[0];

      if (isValidForRule(node, 'create', ...matchingControllers) && tsutils.isObjectLiteralExpression(firstArgument)) {
        if (
          !tsutils.isAwaitExpression(node.parent) &&
          (!tsutils.isPropertyAccessExpression(node.parent) ||
            !tsutils.isCallExpression(node.parent.parent) ||
            !tsutils.isPropertyAccessExpression(node.parent.parent.expression) ||
            node.parent.parent.expression.name.text !== 'then')
        ) {
          this.addFailureAtNode(node, ruleMessage);
        }
      }
    }

    super.visitCallExpression(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'You must await the create method for the following controllers: ' + matchingControllers.join(', '),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new CreateMethodShouldUseAwaitWalker(sourceFile, this.getOptions()));
  }
}
