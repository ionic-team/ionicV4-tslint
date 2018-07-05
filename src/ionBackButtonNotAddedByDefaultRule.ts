import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

export const ruleName = 'ion-back-button-not-added-by-default';

function isElementAst(node: ast.TemplateAst): node is ast.ElementAst {
  const n = node as ast.ElementAst;
  return n && typeof n.children === 'object' && typeof n.name === 'string' && typeof n.attrs === 'object';
}

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-toolbar') {
      let found = false;
      const ionButtonsElement = element.children.find((e): e is ast.ElementAst => isElementAst(e) && e.name === 'ion-buttons');

      if (ionButtonsElement) {
        const ionBackButtonElement = ionButtonsElement.children.find(e => isElementAst(e) && e.name === 'ion-back-button');

        if (ionBackButtonElement) {
          found = true;
        }
      }

      if (!found) {
        const start = element.sourceSpan.start.offset;
        const length = element.name.length;
        const position = this.getSourcePosition(start) + length + 1;

        this.addFailureAt(start + 1, length, 'The back button in an ion-toolbar is no longer automatically added.');
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'The ion-back-button is not added by default to an ion-toolbar.',
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
