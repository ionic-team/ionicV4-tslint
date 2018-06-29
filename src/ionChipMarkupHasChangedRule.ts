import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-chip-markup-has-changed';

class IonChipMarkupChangedTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-chip') {
      element.children.forEach(child => {
        if (child instanceof ast.ElementAst && child.name === 'ion-button') {
          const start = child.sourceSpan.start.offset;
          this.addFailure(
            this.createFailure(start + 1, child.name.length, 'Inside of ion-chip, ion-chip-button must be used instead of ion-button.')
          );
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
    description: 'Buttons in Ion Chip have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonChipMarkupChangedTemplateVisitor
      })
    );
  }
}
