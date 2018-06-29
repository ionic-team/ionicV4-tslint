import * as Lint from 'tslint';
import * as ts from 'typescript';
export const ruleName = 'ion-item-option-method-get-sliding-percent-renamed';
export const ruleMessage = '"getSlidingPercent" has been renamed to "getSlidingRatio"';

class GetSlidingPercentRenamedWalker extends Lint.RuleWalker {
  visitCallExpression(node: ts.CallExpression) {
    const expression = node.expression as any;
    if (expression.name && expression.name.text === 'getSlidingPercent') {
      const replacement = new Lint.Replacement(expression.name.getStart(), expression.name.getWidth(), 'getSlidingRatio');
      this.addFailure(this.createFailure(expression.name.getStart(), expression.name.getWidth(), ruleMessage, replacement));
    }
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'getSlidingPercent is now called getSlidingRatio.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new GetSlidingPercentRenamedWalker(sourceFile, this.getOptions()));
  }
}
