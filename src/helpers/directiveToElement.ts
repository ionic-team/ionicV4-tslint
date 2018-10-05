import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export function generateDescription(directive: string, resultantElement: string) {
  return `${directive} is now an ${resultantElement} element instead of an Angular directive.`;
}
export type ReplacementLevel = 'parent' | 'same' | 'child';

export function createDirectiveToElementTemplateVisitorClass(directive: string, resultantElement: string, level: ReplacementLevel) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      const foundAttr = element.attrs.find(attr => attr.name === directive);

      if (foundAttr) {
        const attributeStart = foundAttr.sourceSpan.start.offset;
        const attributeLength = directive.length;
        const attributePosition = this.getSourcePosition(attributeStart);

        const fixes = [Lint.Replacement.deleteFromTo(attributePosition - 1, attributePosition + attributeLength)];

        switch (level) {
          case 'parent':
            const parentOpenTag = `<${resultantElement}>\n`;
            const parentCloseTag = `\n</${resultantElement}>`;

            const angleBracketStartPosition = this.getSourcePosition(element.sourceSpan.start.offset);
            const closingAngleBracketEndPosition = this.getSourcePosition(element.endSourceSpan.end.offset);

            fixes.push(
              Lint.Replacement.replaceFromTo(angleBracketStartPosition, angleBracketStartPosition, parentOpenTag),
              Lint.Replacement.replaceFromTo(closingAngleBracketEndPosition, closingAngleBracketEndPosition, parentCloseTag)
            );
            break;
          case 'same':
            const tagNameLength = element.name.length;
            const tagNameStartPosition = this.getSourcePosition(element.sourceSpan.start.offset) + 1;
            const closingTagNameStartPosition = this.getSourcePosition(element.endSourceSpan.start.offset) + 2;

            fixes.push(
              Lint.Replacement.replaceFromTo(tagNameStartPosition, tagNameStartPosition + tagNameLength, resultantElement),
              Lint.Replacement.replaceFromTo(closingTagNameStartPosition, closingTagNameStartPosition + tagNameLength, resultantElement)
            );
            break;
          case 'child':
            const childOpenTag = `>\n<${resultantElement}>`;
            const childCloseTag = `</${resultantElement}>\n<`;

            const angleBracketEndPosition = this.getSourcePosition(element.sourceSpan.end.offset);
            const closingAngleBracketStartPosition = this.getSourcePosition(element.endSourceSpan.start.offset);

            fixes.push(
              Lint.Replacement.replaceFromTo(angleBracketEndPosition - 1, angleBracketEndPosition, childOpenTag),
              Lint.Replacement.replaceFromTo(closingAngleBracketStartPosition, closingAngleBracketStartPosition + 1, childCloseTag)
            );
            break;
        }

        this.addFailureAt(attributeStart, attributeLength, generateDescription(directive, resultantElement), fixes);
      }

      super.visitElement(element, context);
    }
  };
}

export function createDirectiveToElementRuleClass(
  ruleName: string,
  directive: string,
  resultantElement = directive,
  level: ReplacementLevel = 'same'
) {
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
          templateVisitorCtrl: createDirectiveToElementTemplateVisitorClass(directive, resultantElement, level)
        })
      );
    }
  };
}
