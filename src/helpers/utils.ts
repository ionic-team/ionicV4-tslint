import * as ast from '@angular/compiler';

export function isElementAst(node: ast.TemplateAst): node is ast.ElementAst {
  const n = node as ast.ElementAst;
  return n && typeof n.children === 'object' && typeof n.name === 'string' && typeof n.attrs === 'object';
}
