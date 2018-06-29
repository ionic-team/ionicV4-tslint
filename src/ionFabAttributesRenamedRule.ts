import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-fab-attributes-renamed';

function generateErrorMessage(attrName: string, replacement: string) {
  return `The ${attrName} attribute of ion-fab has been renamed. Use ${replacement} instead.`;
}

const attrMap = new Map([
  ['center', 'horizontal="center"'],
  ['start', 'horizontal="start"'],
  ['end', 'horizontal="end"'],
  ['top', 'vertical="top"'],
  ['bottom', 'vertical="bottom"'],
  ['middle', 'vertical="center"']
]);

class IonFabAttributesRenamedTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name === 'ion-fab') {
      for (const attr of element.attrs) {
        const replacement = attrMap.get(attr.name);

        if (replacement) {
          const start = attr.sourceSpan.start.offset;
          const length = attr.name.length;
          const position = this.getSourcePosition(start);

          this.addFailureAt(start, length, generateErrorMessage(attr.name, replacement), [
            Lint.Replacement.replaceFromTo(position, position + length, replacement)
          ]);
        }
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-fab have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonFabAttributesRenamedTemplateVisitor
      })
    );
  }
}
