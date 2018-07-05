import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

export const ruleName = 'ion-fab-fixed-content';

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-fab') {
      const attributeFound = element.attrs.find(attr => attr.name === 'slot');

      if (!attributeFound || attributeFound.value !== 'fixed') {
        const start = element.sourceSpan.start.offset;
        const length = element.name.length;
        const position = this.getSourcePosition(start) + length + 1;

        this.addFailureAt(start + 1, length, 'The ion-fab container is no longer fixed by default. Use slot="fixed".', [
          Lint.Replacement.replaceFromTo(position, position, ' slot="fixed"')
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
    description: 'The ion-fab container is no longer fixed by default. Use slot="fixed".',
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
