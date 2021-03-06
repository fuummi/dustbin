const origin = `const fn = (a, b) => {
    const total = a + b;
    return total
}`
const ast = {
    "type": "Program",
    "start": 0,
    "end": 66,
    "body": [
        {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 66,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 66,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 8,
                        "name": "fn"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 11,
                        "end": 66,
                        "id": null,
                        "expression": false,
                        "generator": false,
                        "async": false,
                        "params": [
                            {
                                "type": "Identifier",
                                "start": 12,
                                "end": 13,
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "b"
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 66,
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "start": 27,
                                    "end": 47,
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "start": 33,
                                            "end": 46,
                                            "id": {
                                                "type": "Identifier",
                                                "start": 33,
                                                "end": 38,
                                                "name": "total"
                                            },
                                            "init": {
                                                "type": "BinaryExpression",
                                                "start": 41,
                                                "end": 46,
                                                "left": {
                                                    "type": "Identifier",
                                                    "start": 41,
                                                    "end": 42,
                                                    "name": "a"
                                                },
                                                "operator": "+",
                                                "right": {
                                                    "type": "Identifier",
                                                    "start": 45,
                                                    "end": 46,
                                                    "name": "b"
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const"
                                },
                                {
                                    "type": "ReturnStatement",
                                    "start": 52,
                                    "end": 64,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 59,
                                        "end": 64,
                                        "name": "total"
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}

const AST_DEFINATIONS_MAP = new Map() //??????map??????????????????????????????visitor,??????????????????????????????
AST_DEFINATIONS_MAP.set('Program', {
    visitor: ['body']
})
AST_DEFINATIONS_MAP.set('VariableDeclaration', {
    visitor: ['declarations']
})
AST_DEFINATIONS_MAP.set('VariableDeclarator', {
    visitor: ['id', 'init']
})
AST_DEFINATIONS_MAP.set('BlockStatement', {
    visitor: ['body']
})
AST_DEFINATIONS_MAP.set('ArrowFunctionExpression', {
    visitor: ['params', 'body']
})
AST_DEFINATIONS_MAP.set('FunctionExpression', {
    visitor: ['params', 'body']
})
AST_DEFINATIONS_MAP.set('ReturnStatement', {
    visitor: ['argument']
})
AST_DEFINATIONS_MAP.set('BinaryExpression', {
    visitor: ['left', 'right']
})
AST_DEFINATIONS_MAP.set('ExpressionStatement', {})
AST_DEFINATIONS_MAP.set('CallExpression', {})
AST_DEFINATIONS_MAP.set('MemberExpression', {})
AST_DEFINATIONS_MAP.set('Identifier', {})
AST_DEFINATIONS_MAP.set('Literal', {})

function traverse(node, visitors) {
    let defination = AST_DEFINATIONS_MAP.get(node.type) // ???map??????????????????????????????visitor
    let visitorsFn = visitors[node.type]
    if (visitorsFn !== undefined || typeof (visitorsFn) === 'function') { //?????????????????????????????????????????????
        visitors[node.type](node) //?????????????????????????????????
    }
    if (defination.visitor !== undefined) { //???visitor,?????????????????????
        defination.visitor.forEach(element => { //??????visitor??????????????????
            let prop = node[element] //????????????????????????????????????
            if (Array.isArray(prop)) { //????????????????????????
                prop.forEach(child => { //??????????????????????????????????????????????????????
                    traverse(child, visitors)
                })
            } else {
                traverse(prop, visitors) //???????????????????????????????????????
            }
        });
    }
}

const visitors = {
    VariableDeclaration(node) { //const let???var
        if (node.kind === 'const' || node.kind === 'let') {
            node.kind = 'var'
        }
    },
    ArrowFunctionExpression(node) { //???????????????????????????
        node.type = 'FunctionExpression'
    }
}

traverse(ast, visitors)

class Printer {
    constructor() {
        this.buf = '' //???????????????????????????????????????
    }
    nextline() {
        this.buf += '\n' //????????????
    }
    space() {
        this.buf += ' ' //????????????
    }
    Program(node) {
        node.body.forEach(element => {
            this[element.type](element) //??????body????????????????????????????????????
        })
    }
    VariableDeclaration(node) {
        this.buf += node.kind //????????????(const let)
        this.space() //??????
        node.declarations.forEach(element => {
            this[element.type](element) //??????body????????????????????????????????????
        })
    }
    VariableDeclarator(node) {
        this.buf += node.id.name //??????????????????
        this.space()
        this.buf += '='
        this.space()
        this[node.init.type](node.init)
        this.buf += ';'
    }
    FunctionExpression(node) { //?????????????????????????????????(init)
        this.buf += 'function (';
        node.params.forEach((element, index) => {
            this[element.type](element)
            if (index !== node.params.length - 1) {
                this.buf += ','
            }
        })
        this.buf += ') {'
        this.nextline()
        this.buf += '   '
        this[node.body.type](node.body) //???????????????????????????????????????
        this.nextline()
        this.buf += '}'
    }
    BlockStatement(node) {
        node.body.forEach(element => {
            this[element.type](element) //??????body????????????????????????????????????
        })
    }
    ExpressionStatement(node) {
        this[node.expression.type](node.expression)
    }
    CallExpression(node) {
        this[node.callee.type](node.callee)
        node.arguments.forEach(element => {
            this[element.type](element)
        })
        this.buf += ')'
    }
    MemberExpression(node) {
        this[node.object.type](node.object)
        this[node.property.type](node.property)
    }
    Literal(node) {
        this.buf += node.raw
    }
    Identifier(node) {
        this.buf += node.name
        if (node.name === "console") {
            this.buf += '.'
        }
        if (node.name === "log") {
            this.buf += '('
        }
    }
    BinaryExpression(node) { //???????????????
        this[node.left.type](node.left)
        this.buf += node.operator
        this[node.right.type](node.right)
    }
    ReturnStatement(node) {
        this.nextline()
        this.buf += '   '
        this.buf += 'return'
        this.space()
        this[node.argument.type](node.argument)
        this.buf += ';'
    }
}

class Generator extends Printer {
    generate(node) {
        this[node.type](node); //?????????????????????????????????????????????
        return this.buf;
    }
}
function generate(node) {
    return new Generator().generate(node);
}
console.log(generate(ast));