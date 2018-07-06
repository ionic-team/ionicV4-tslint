import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createDirectiveToElementTemplateVisitorClass } from './helpers/directiveToElement';
import { isElementAst } from './helpers/utils';

const directive = 'ion-button';
const description = 'Buttons within ion-item-options are now ion-item-option elements instead of Angular directives.';

export const ruleName = 'ion-item-option-is-now-an-element';

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name === 'ion-item-options') {
      for (const child of element.children) {
        if (isElementAst(child)) {
          if (child.name === 'button' && child.attrs.find(attr => attr.name === directive)) {
            const start = child.sourceSpan.start.offset + 1;

            this.addFailureAt(start, child.name.length, description);
          }
        }
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: description,
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
