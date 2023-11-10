import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export function findDecoratorArguments(
    decorators: TSESTree.Decorator[] | undefined,
    name: string
): TSESTree.CallExpressionArgument[] | undefined {
    if (decorators) {
        for (const decorator of decorators) {
            if (
                decorator.expression.type === AST_NODE_TYPES.CallExpression &&
                decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
                decorator.expression.callee.name === name
            ) {
                return decorator.expression.arguments;
            }
        }
    }
    return undefined;
}

export function findParentClass(
    node: TSESTree.PropertyDefinition
): TSESTree.ClassDeclaration | undefined {
    let parentClass = node.parent;
    while (parentClass) {
        if (parentClass.type === AST_NODE_TYPES.ClassDeclaration) {
            return parentClass;
        }
        parentClass = parentClass.parent;
    }
    return undefined;
}

export function parseObjectLiteral(objectLiteral: TSESTree.Node): Record<string, unknown> {
    const parsedObject: Record<string, unknown> = {};
    if (objectLiteral.type === AST_NODE_TYPES.ObjectExpression) {
        for (const prop of objectLiteral.properties) {
            if (
                prop.type === AST_NODE_TYPES.Property &&
                prop.key.type === AST_NODE_TYPES.Identifier &&
                prop.value.type === AST_NODE_TYPES.Literal
            ) {
                parsedObject[prop.key.name] = prop.value.value;
            }
        }
    }
    return parsedObject;
}
