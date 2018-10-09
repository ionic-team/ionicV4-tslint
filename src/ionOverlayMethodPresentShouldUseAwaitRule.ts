import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';
export const ruleName = 'ion-overlay-method-present-should-use-await';
export const ruleMessage = `The present method of overlay controllers now returns a promise. 
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
    let expression = node.expression;

    if (tsutils.isPropertyAccessExpression(expression) && expression.name.text === 'present') {
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

    super.visitCallExpression(node);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'You must await the present method for the following controllers: ' + matchingControllers.join(', '),
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new CreateMethodShouldUseAwaitWalker(sourceFile, this.getOptions()));
  }
}
