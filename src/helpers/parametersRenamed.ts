import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

/**
 * Currently only supports a call exactly like this:
 *
 * ```
 * this.ctrl.foo({ prop1: <value>, prop2: <value> })
 * ```
 *
 * `this.ctrl` must refer to a provider by name in the constructor of a class
 * using Angular dependency injection
 *
 * @param methodName would be `foo` in example above
 * @param providerName the provider class name
 * @param parameterMap a map of properties to rename in the object literal above
 */
export function createParametersRenamedClass(methodName: string, providerName: string, parameterMap: Map<string, string>) {
  return class extends Lint.RuleWalker {
    visitCallExpression(node: ts.CallExpression) {
      if (node.arguments.length > 0) {
        const firstArgument = node.arguments[0];

        if (isValidForRule(node, methodName, providerName) && tsutils.isObjectLiteralExpression(firstArgument)) {
          for (const prop of firstArgument.properties) {
            if (tsutils.isPropertyAssignment(prop) || tsutils.isShorthandPropertyAssignment(prop)) {
              const propName = tsutils.getPropertyName(prop.name);
              const replacementPropName = parameterMap.get(propName);

              if (replacementPropName) {
                const replacement = tsutils.isShorthandPropertyAssignment(prop)
                  ? `${replacementPropName}: ${propName}`
                  : replacementPropName;
                this.addFailureAtNode(
                  prop.name,
                  `Property ${propName} has been renamed to ${replacementPropName}.`,
                  new Lint.Replacement(prop.name.getStart(), prop.name.getWidth(), replacement)
                );
              }
            }
          }
        }
      }

      super.visitCallExpression(node);
    }
  };
}

export function isValidForRule(node: ts.CallExpression, methodName: string, ...providerNames: string[]): boolean {
  const expression = node.expression;

  if (
    tsutils.isPropertyAccessExpression(expression) &&
    expression.name.text === methodName &&
    tsutils.isPropertyAccessExpression(expression.expression) &&
    expression.expression.expression.kind === ts.SyntaxKind.ThisKeyword
  ) {
    const classNode = findDeclarativeClass(node);
    const controllerName = expression.expression.name.text;

    if (classNode) {
      const constructorNode = classNode.members.find(n => tsutils.isConstructorDeclaration(n));

      if (constructorNode && tsutils.isConstructorDeclaration(constructorNode)) {
        const controllerParameter = constructorNode.parameters.find(
          p => tsutils.isTypeReferenceNode(p.type) && tsutils.isIdentifier(p.name) && p.name.text === controllerName
        );

        if (
          controllerParameter &&
          tsutils.isTypeReferenceNode(controllerParameter.type) &&
          tsutils.isIdentifier(controllerParameter.type.typeName) &&
          providerNames.indexOf(controllerParameter.type.typeName.text) > -1
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

function findDeclarativeClass(node: ts.Node): ts.ClassDeclaration | undefined {
  if (!node) {
    return;
  }

  if (tsutils.isClassDeclaration(node)) {
    return node;
  }

  return findDeclarativeClass(node.parent);
}
