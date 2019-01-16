import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import * as ast from '@angular/compiler';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import { MetadataReader } from 'codelyzer/angular/metadataReader';

export const ruleName = 'ion-tabs-refactored';

const TABS = 'ion-tabs';

const TemplateVisitor = createTabsRefactoredVisitorClass(TABS);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Tabs have been refacotred, please see this blog post: ',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: false
  };
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: TemplateVisitor
      })
    );
  }
}

function generateErrorMessage() {
  return `Tabs have gone through a significant refactor.
    Please see https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md#angular-tabs`;
}

export function createTabsRefactoredVisitorClass(tabElement: string) {
  return class extends BasicTemplateAstVisitor {
    visitElement(element: ast.ElementAst, context: any): any {
      if (element.name === tabElement) this.checkElement(element);
      super.visitElement(element, context);
    }

    private checkElement(element: ast.ElementAst) {
      const start = element.sourceSpan.start.offset + 1;
      const length = element.name.length;
      this.addFailureAt(start, length, generateErrorMessage());
    }
  };
}
