import * as Lint from 'tslint';
import * as ts from 'typescript';

export const ruleName = 'ion-datetime-capitalization-changed';
export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName,
    type: 'functionality',
    description: 'Updates the Datetime import',
    rationale: 'Datetime exported symbol has changed',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: true
  };

  static RuleFailure = 'outdated import path';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new UpdateImportsWalker(sourceFile, this.getOptions()));
  }
}

class UpdateImportsWalker extends Lint.RuleWalker {
  visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (ts.isStringLiteral(node.moduleSpecifier) && node.importClause) {
      const specifier = node.moduleSpecifier;
      const path = (specifier as ts.StringLiteral).text;
      const start = specifier.getStart() + 1;
      const end = specifier.text.length;
      const replacementStart = start;
      const replacementEnd = specifier.text.length;
      let replacement = null;

      // Try to find updated symbol names.
      ImportReplacements.forEach(r => (r.path === path ? this._migrateExportedSymbols(r, node) : void 0));

      // Try to migrate entire import path updates.
      if (ImportMap.has(path)) {
        replacement = ImportMap.get(path);
      }
      if (replacement !== null) {
        return this.addFailureAt(start, end, Rule.RuleFailure, this.createReplacement(replacementStart, replacementEnd, replacement));
      }
    }
  }

  private _migrateExportedSymbols(re: ImportReplacement, node: ts.ImportDeclaration) {
    const importClause = node.importClause as ts.ImportClause;
    const bindings = importClause.namedBindings as ts.NamedImports | null;
    if (!bindings || bindings.kind !== ts.SyntaxKind.NamedImports) {
      return;
    }

    bindings.elements.forEach((e: ts.ImportSpecifier | null) => {
      if (!e || e.kind !== ts.SyntaxKind.ImportSpecifier) {
        return;
      }

      let toReplace = e.name;
      // We don't want to introduce type errors so we alias the old new symbol.
      let replacement = `${re.newSymbol} as ${re.symbol}`;
      if (e.propertyName) {
        toReplace = e.propertyName;
        replacement = re.newSymbol;
      }

      if (toReplace.getText() !== re.symbol) {
        return;
      }

      return this.addFailureAt(
        toReplace.getStart(),
        toReplace.getWidth(),
        'imported symbol no longer exists',
        this.createReplacement(toReplace.getStart(), toReplace.getWidth(), replacement)
      );
    });
  }
}

const ImportMap = new Map([['ionic-angular', '@ionic/angular']]);

interface ImportReplacement {
  path: string;
  symbol: string;
  newPath: string;
  newSymbol: string;
}

const ImportReplacements = [
  {
    path: 'ionic-angular',
    symbol: 'DateTime',
    newPath: '@ionic/angular',
    newSymbol: 'Datetime'
  },
  {
    path: '@ionic/angular',
    symbol: 'DateTime',
    newPath: '@ionic/angular',
    newSymbol: 'Datetime'
  }
];
