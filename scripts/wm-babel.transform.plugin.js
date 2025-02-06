const t = require("@babel/types");
const babel = require("@babel/core");
const jsx = require('@babel/plugin-syntax-jsx').default;

function isWatchableExpression(path) {
  const exp = path && path.container && path.container.value && path.container.value.expression;
  const key = path.parent && path.parent.name && path.parent.name.name;
  return exp 
    && key
    && !key.startsWith('on')
    && key !== 'fragment'
    && key !== 'listener'
    && key !== 'watcher'
    && key !== 'serviceDefinitions'
    && key !== 'styles'
    && key !== 'themeToUse'
    && key !== '$item'
    && key !== '$index'
    && t.isExpression(exp)
    && !t.isFunctionExpression(exp)
    && !t.isArrowFunctionExpression(exp)
    && !t.isBooleanLiteral(exp)
    && !t.isStringLiteral(exp)
    && !t.isNullLiteral(exp)
    && !t.isObjectExpression(exp)
    && !t.isNumericLiteral(exp);
}

function isEventCallback(path) {
  const exp = path && path.container && path.container.value && path.container.value.expression;
  const name = path && path.container && path.container.name && path.container.name.name;
  return exp && (t.isFunctionExpression(exp) || t.isArrowFunctionExpression(exp));
}

const JSXVisitor = {
  JSXExpressionContainer(path, state) {
    const exp = path.getSource();
    if (exp && isWatchableExpression(path)) {
        const tExp = `watch(() => (${exp.substring(1, exp.length -1)}))`;
        path.replaceWith(t.jsxExpressionContainer(babel.template.expression.ast(tExp)));
    } else if (exp && isEventCallback(path)) {
      path.traverse({
        'ArrowFunctionExpression|FunctionExpression':  function(path, state) {
          const container = path.get('body');
          if (container && container.node['body']) {
            container.pushContainer('body', babel.template.statement.ast('fragment.refresh();'));
          }
        }
      })
    }
  }
};
const canMemoize = (node) => {
  const attr = node.openingElement.attributes.find(a => a.name.name === 'memoize');
  return !(attr && (attr.value == null || attr.value.value === 'false')); 
};
const plugin = function() {
    return {
      inherits: jsx,
      visitor: {
        JSXElement: {
          exit(path, state) {
            const { node, parentPath } = path;
            const nodeName = node.openingElement && node.openingElement.name && node.openingElement.name.name;
            if (node.__wm_processed || !nodeName || !nodeName.startsWith('Wm')) {
              return;
            }
            const nameAttribute = t.jsxAttribute(
              t.jsxIdentifier('cname'), 
              t.stringLiteral(nodeName)
            );
            node.openingElement.attributes.push(nameAttribute);
            node.__wm_processed = true;
            path.traverse(JSXVisitor);
            if (canMemoize(node)) {
              const replacer = t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier('WmMemo'), [
                t.jsxAttribute(t.jsxIdentifier('watcher'), t.jsxExpressionContainer(t.memberExpression(t.identifier('fragment'), t.identifier('watcher')))),
                t.jsxAttribute(t.jsxIdentifier('render'), t.jsxExpressionContainer(t.arrowFunctionExpression([t.identifier('watch')], node)))
              ]), null, [], true);
              replacer.__wm_processed = true;
              path.replaceWith(replacer);
            }
          }
        }
      }
    };
};

module.exports = plugin;