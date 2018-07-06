import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

import { isElementAst } from './helpers/utils';

export const ruleName = 'ion-item-ion-label-required';

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-item') {
      const ionLabelElement = element.children.find((e): e is ast.ElementAst => isElementAst(e) && e.name === 'ion-label');

      if (!ionLabelElement) {
        const start = element.sourceSpan.start.offset;
        const length = element.name.length;
        const position = this.getSourcePosition(start) + length + 1;

        this.addFailureAt(start + 1, length, 'The ion-item requires an ion-label component. It is no longer automatically added.');
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'The ion-item requires an ion-label component. It is no longer automatically added.',
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
