import * as ast from '@angular/compiler';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-navbar-is-now-ion-toolbar';
const InvalidSyntaxBoxOpen = '<ion-navbar>';
const InvalidSyntaxBoxClose = '</ion-navbar>';
const InvalidSyntaxBoxRe = new RegExp('<ion-navbar[^>]*>((.|\n)*?)</ion-navbar>');
const ValidSyntaxOpen = `<ion-toolbar>
  <ion-buttons slot="start">
    <ion-back-button></ion-back-button>
  </ion-buttons>`;

const ValidSyntaxClose = `\n</ion-toolbar>`;

const getReplacements = (text: ast.ElementAst, absolutePosition: number) => {
  const content: string = text.sourceSpan.start.file.content;

  const results = InvalidSyntaxBoxRe.exec(content);

  let match = undefined;
  const newLineRegex = new RegExp(/\n/g, 'g');

  const newlineLocations = [];

  do {
    match = newLineRegex.exec(content);

    if (match) {
      newlineLocations.push(match.index);
    }
  } while (match);

  let startingLine = text.sourceSpan.start.line;
  let endingLine = text.endSourceSpan.end.line;

  let endingCol = text.endSourceSpan.end.col;

  let length = 0;

  if (endingLine > startingLine) {
    for (let i = startingLine; i <= endingLine; i++) {
      if (i === startingLine) {
        length += newlineLocations[i] - text.sourceSpan.start.col;
      } else if (i - 1 === endingLine) {
        length += text.endSourceSpan.end.col - 1;
      } else {
        length += getLineLength(newlineLocations, i);
      }
    }
  } else {
    length = text.endSourceSpan.end.col - text.sourceSpan.start.col;
  }

  return [new Lint.Replacement(absolutePosition, length, `${ValidSyntaxOpen}${results[1].trim()}${ValidSyntaxClose}`)];
};

class IonNavbarIsNowIonToolbarTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ast.ElementAst, context: any): any {
    if (element.name) {
      let error = null;

      if (element.name === 'ion-navbar') {
        error = 'ion-navbar is no longer used. Please use ion-toolbar.';
      }

      if (error) {
        const expr: any = (<any>element.sourceSpan).toString();
        const internalStart = expr.indexOf(InvalidSyntaxBoxOpen) + 1;
        const start = element.sourceSpan.start.offset + internalStart;
        const absolutePosition = this.getSourcePosition(start - 1);

        this.addFailure(this.createFailure(start, expr.trim().length, error, getReplacements(element, absolutePosition)));
      }
    }

    super.visitElement(element, context);
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Ion Navbar has been removed and Ion Toolbar is now the recommended component.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonNavbarIsNowIonToolbarTemplateVisitor
      })
    );
  }
}
function getLineLength(newlineLocations: any[], i: number) {
  if (i > 0) {
    return newlineLocations[i] - newlineLocations[i - 1];
  }

  return newlineLocations[i];
}
