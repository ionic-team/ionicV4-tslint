import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

export const ruleName = 'ion-icon-attribute-is-active-removed';

class TemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name && element.name === 'ion-icon') {
      const attributeFound = element.attrs.find(attr => attr.name === 'isActive');

      if (attributeFound) {
        const start = attributeFound.sourceSpan.start.offset;
        const end = attributeFound.sourceSpan.end.offset;

        this.addFailureAt(start, end - start, 'The isActive attribute of ion-icon has been removed.');
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'The isActive attribute of ion-icon has been removed.',
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
