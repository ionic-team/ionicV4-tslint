import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-item-option-markup-has-changed';
export const ruleMessage = 'Inside of ion-item-options, ion-item-option must be used instead of ion-button.';

class IonItemOptionMarkupChangedTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-item-options') {
      element.children.forEach(child => {
        if (
          (child instanceof ast.ElementAst && child.name === 'ion-button') ||
          (child instanceof ast.ElementAst && child.name === 'button' && !!child.attrs.find(attr => attr.name === 'ion-button'))
        ) {
          const start = child.sourceSpan.start.offset;
          this.addFailure(this.createFailure(start + 1, child.name.length, ruleMessage));
        }
      });
    }
    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Buttons in ion-item-options have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonItemOptionMarkupChangedTemplateVisitor
      })
    );
  }
}
