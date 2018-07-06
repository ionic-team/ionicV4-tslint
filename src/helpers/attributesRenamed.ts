import * as ast from '@angular/compiler';
import * as Lint from 'tslint';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';

function generateErrorMessage(elementName: string, attrName: string, replacement: string) {
  return `The ${attrName} attribute of ${elementName} has been renamed. Use ${replacement} instead.`;
}

export function createAttributesRenamedTemplateVisitorClass(elementNames: string[] | undefined, replacementMap: Map<string, string>) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      if (!elementNames || elementNames.includes(element.name)) {
        this.checkAttributesForReplacements(element);
      }

      super.visitElement(element, context);
    }

    private checkAttributesForReplacements(element: ast.ElementAst) {
      for (const attr of element.attrs) {
        const replacement = replacementMap.get(attr.name);

        if (replacement) {
          const start = attr.sourceSpan.start.offset;
          const length = attr.name.length;
          const position = this.getSourcePosition(start);

          this.addFailureAt(start, length, generateErrorMessage(element.name, attr.name, replacement), [
            Lint.Replacement.replaceFromTo(position, position + length, replacement)
          ]);
        }
      }
    }
  };
}
