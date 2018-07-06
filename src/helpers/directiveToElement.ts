import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export function generateDescription(directive: string, resultantElement: string) {
  return `${directive} is now an ${resultantElement} element instead of an Angular directive.`;
}

export function createDirectiveToElementTemplateVisitorClass(directive: string, resultantElement: string) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      const foundAttr = element.attrs.find(attr => attr.name === directive);

      if (foundAttr) {
        const start = foundAttr.sourceSpan.start.offset;
        const absolutePosition = this.getSourcePosition(start - 1);

        this.addFailureAt(start, directive.length, generateDescription(directive, resultantElement));
      }

      super.visitElement(element, context);
    }
  };
}

export function createDirectiveToElementRuleClass(ruleName: string, directive: string, resultantElement = directive) {
  return class extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
      ruleName: ruleName,
      type: 'functionality',
      description: generateDescription(directive, resultantElement),
      options: null,
      optionsDescription: 'Not configurable.',
      typescriptOnly: false,
      hasFix: true
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
      return this.applyWithWalker(
        new NgWalker(sourceFile, this.getOptions(), {
          templateVisitorCtrl: createDirectiveToElementTemplateVisitorClass(directive, resultantElement)
        })
      );
    }
  };
}
