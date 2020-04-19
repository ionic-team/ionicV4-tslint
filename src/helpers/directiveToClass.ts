import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export function generateDescription(directiveCategory?: string, resultantClass?: string) {
  return `All directives of ${directiveCategory} category are now replaces with respective classes ${resultantClass}`;
}
export type ReplacementLevel = 'parent' | 'same' | 'child';

export function createDirectiveToClassTemplateVisitorClass(
  transformations: Map<string, string>,
  directiveCategory: string,
  className: string
) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      let errors = [];
      for (let [directive, resultantClass] of transformations) {
        const foundAttr = element.attrs.find(attr => attr.name === directive);

        if (foundAttr) {
          errors.push({
            attr: foundAttr,
            resultantClass: resultantClass
          });
        }
      }
      if (errors.length) {
        let fixes = [];
        let classStartPosition,
          classEndPosition,
          existingClasses = '',
          newClasses = '';
        let elementStart = element.sourceSpan.start.offset;
        let elementEnd = element.sourceSpan.end.offset;

        for (let item of errors) {
          const attributePosition: number = this.getSourcePosition(item.attr.sourceSpan.start.offset);
          const attributeEndPosition = this.getSourcePosition(item.attr.sourceSpan.end.offset);
          fixes.push(Lint.Replacement.deleteFromTo(attributePosition - 1, attributeEndPosition));
          newClasses += item.resultantClass + ' ';
        }
        const foundClassAttr = element.attrs.find(attr => attr.name === 'class');

        if (foundClassAttr) {
          classStartPosition = this.getSourcePosition(foundClassAttr.sourceSpan.start.offset);
          classEndPosition = this.getSourcePosition(foundClassAttr.sourceSpan.end.offset);
          existingClasses = foundClassAttr.value;
          if (!existingClasses.length) newClasses = newClasses.slice(0, -1);
          fixes.push(Lint.Replacement.replaceFromTo(classStartPosition, classEndPosition, `class="${newClasses}${existingClasses}"`));
        } else {
          if (element.attrs.length) {
            const lastAttribute = element.attrs[element.attrs.length - 1];
            classStartPosition = this.getSourcePosition(lastAttribute.sourceSpan.end.offset);
          } else {
            classStartPosition = this.getSourcePosition(element.sourceSpan.end.offset) - 1;
          }

          classEndPosition = classStartPosition;
          if (!existingClasses.length) newClasses = newClasses.slice(0, -1);
          fixes.push(Lint.Replacement.replaceFromTo(classStartPosition, classEndPosition, ` class="${newClasses}${existingClasses}"`));
        }

        this.addFailureAt(elementStart, elementEnd, generateDescription(directiveCategory, className), fixes);
      }

      super.visitElement(element, context);
    }
  };
}

export function createDirectiveToClassRuleClass(
  ruleName: string,
  transformations: Map<string, string>,
  directiveCategory: string,
  className: string
) {
  return class extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
      ruleName: ruleName,
      type: 'functionality',
      description: generateDescription(directiveCategory, className),
      options: null,
      optionsDescription: 'Not configurable.',
      typescriptOnly: false,
      hasFix: true
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
      return this.applyWithWalker(
        new NgWalker(sourceFile, this.getOptions(), {
          templateVisitorCtrl: createDirectiveToClassTemplateVisitorClass(transformations, directiveCategory, className)
        })
      );
    }
  };
}
