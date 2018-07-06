import { NgWalker } from 'codelyzer/angular/ngWalker';
import * as Lint from 'tslint';
import * as ts from 'typescript';

import { createAttributesRenamedTemplateVisitorClass } from './helpers/attributesRenamed';

export const ruleName = 'ion-col-attributes-renamed';

const formatOldAttr = (prefix: string, breakpoint: string | undefined, value: string) =>
  `${prefix}${typeof breakpoint === 'undefined' ? '' : `-${breakpoint}`}-${value}`;
const formatNewAttr = (prefix: string, breakpoint: string | undefined, value: string) =>
  `${prefix}${typeof breakpoint === 'undefined' ? '' : `-${breakpoint}`}="${value}"`;

const attrPrefixMap = new Map([['col', 'size'], ['offset', 'offset'], ['push', 'push'], ['pull', 'pull']]);
const breakpoints = [undefined, 'xs', 'sm', 'md', 'lg', 'xl'];
const values = Array(12)
  .fill(undefined)
  .map((v, i) => String(i + 1));

const replacementPairs: [string, string][] = [].concat(
  ...[...attrPrefixMap.entries()].map(([oldPrefix, newPrefix]) =>
    [].concat(...breakpoints.map(b => values.map(v => [formatOldAttr(oldPrefix, b, v), formatNewAttr(newPrefix, b, v)])))
  )
);

const replacementMap = new Map(replacementPairs);

const IonGridAttributesRenamedTemplateVisitor = createAttributesRenamedTemplateVisitorClass(['ion-col'], replacementMap);

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: ruleName,
    type: 'functionality',
    description: 'Attributes of ion-col have been renamed.',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: IonGridAttributesRenamedTemplateVisitor
      })
    );
  }
}
