import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';
import { findTabAttributeMatches } from './helpers/ionTabIelpers';

export const ruleName = 'ion-tab-icon-is-now-icon';
export const ruleMessage = 'The tabIcon attribute is no longer used. Please use icon instead.';

class IonTabIconIsNowIconTemplateVisitor extends BasicTemplateAstVisitor {
  getReplacements(text: ast.AttrAst, length: number, absolutePosition: number) {
    return [Lint.Replacement.replaceFromTo(absolutePosition, absolutePosition + length, `icon`)];
  }

  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name) {
      let error = null;

      const matchingElements: ast.AttrAst[] = [];
      const matchingAttr = 'tabIcon';

      error = findTabAttributeMatches(element, matchingElements, matchingAttr, error, ruleMessage);

      matchingElements.forEach(matchedElement => {
        const absolutePosition = this.getSourcePosition(matchedElement.sourceSpan.start.offset);

        this.addFailure(
          this.createFailure(
            matchedElement.sourceSpan.start.offset,
            matchedElement.name.length,
            error,
            this.getReplacements(matchedElement, matchedElement.name.length, absolutePosition)
          )
        );
      });
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: ruleMessage,
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonTabIconIsNowIconTemplateVisitor
      })
    );
  }
}
