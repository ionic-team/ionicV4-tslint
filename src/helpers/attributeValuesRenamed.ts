import * as ast from '@angular/compiler';
import * as Lint from 'tslint';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';

function generateErrorMessage(elementName: string, attrName: string, attrValue: string, replacement: string) {
  return `The ${attrName}="${attrValue}" attribute/value of ${elementName} should be written as ${replacement}.`;
}

export function createAttributeValuesRenamedTemplateVisitorClass(elementName: string, replacementMap: Map<string, Map<string, string>>) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      if (element.name === elementName) {
        for (const attr of element.attrs) {
          const attrValueMap = replacementMap.get(attr.name);

          if (attrValueMap) {
            const replacementValue = attrValueMap.get(attr.value);

            if (replacementValue) {
              const start = attr.sourceSpan.start.offset;
              const end = attr.sourceSpan.end.offset;
              const position = this.getSourcePosition(start);
              const replacement = `${attr.name}="${replacementValue}"`;

              this.addFailureAt(start, end - start, generateErrorMessage(elementName, attr.name, attr.value, replacement), [
                Lint.Replacement.replaceFromTo(position, position + end - start, replacement)
              ]);
            }
          }
        }
      }

      super.visitElement(element, context);
    }
  };
}
