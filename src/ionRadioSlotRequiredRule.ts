import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-radio-slot-required';

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-radio') {
      const attributeFound = element.attrs.find(attr => attr.name === 'slot');

      if (!attributeFound) {
        const start = element.sourceSpan.start.offset;
        const length = element.name.length;
        const position = this.getSourcePosition(start) + length + 1;

        this.addFailureAt(start + 1, length, 'The slot attribute of ion-radio is required. Use slot="start".', [
          Lint.Replacement.replaceFromTo(position, position, ' slot="start"')
        ]);
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'The slot attribute of ion-radio is now required.',
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
