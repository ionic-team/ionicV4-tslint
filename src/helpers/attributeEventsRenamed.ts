import * as ast from '@angular/compiler';
import * as Lint from 'tslint';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';

function generateErrorMessage(elementName: string, attrName: string, replacement: string) {
  return `The ${attrName} event of ${elementName} has been renamed. Use ${replacement} instead.`;
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
      for (const output of element.outputs) {
        const replacement = replacementMap.get(output.name);

        if (replacement) {
          const start = output.sourceSpan.start.offset + 1;
          const length = output.name.length;
          const position = this.getSourcePosition(start);

          this.addFailureAt(start, length, generateErrorMessage(element.name, output.name, replacement), [
            Lint.Replacement.replaceFromTo(position, position + length, replacement)
          ]);
        }
      }
    }
  };
}
