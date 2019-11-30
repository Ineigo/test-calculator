import { OPERATIONS } from './parser';

const methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
    '^': (a, b) => a ** b,
};

export default function calc(input) {
    if (!input) {
        return null;
    }

    const stack = [];
    for (let char of input.split(' ')) {
        if (Number.isInteger(Number(char))) {
            stack.push(Number(char));
        }

        if (OPERATIONS.includes(char)) {
            const method = methods[char];
            const b = stack.pop();
            const a = stack.pop();
            stack.push(method(a, b));
        }
    }
    return stack.pop();
}
