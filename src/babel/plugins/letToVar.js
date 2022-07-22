function letToVar (babel) {
    const { types: t, template } = babel;
    const visitor = {
        VariableDeclaration (path) {
            if (path.get('kind').node !== 'let') return;
            path.node.kind = 'var';
        },
    };
    return { visitor };
}

module.exports = letToVar;
