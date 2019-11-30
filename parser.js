export const OPERATIONS = ['+', '-', '*', '/', '^'];

export function priority(char) {
    switch (char) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
        case '(':
        case ')':
        default:
            return 0;
    }
}

export default function parseToString(input) {
    if (!input) {
        return null;
    }
    if (input.match(/[^-0-9+/*() ^]/gi)) {
        console.log(input, input.match(/[^-0-9+/*() ^]/gi))
        return null;
    }
    input = input.replace(/\s/gi, '');
    const stack = [];
    const output = [];
    for (let char of input) {
        if (Number.isInteger(Number(char))) {
            output.push(Number(char));
        }

        if (char === '(') {
            stack.push(char);
        }

        if (OPERATIONS.includes(char)) {
            if (stack.length && priority(stack[stack.length - 1]) >= priority(char)) {
                output.push(stack.pop());
            }
            stack.push(char);
        }

        if (char === ')') {
            do {
                output.push(stack.pop());
            } while (stack.length && stack[stack.length - 1] !== '(');

            if (!stack.length) {
                return null;
            }
            stack.pop();
        }
    }
    
    if (stack.includes('(')) {
        return null;
    }

    output.push(...stack.reverse());
    return output.join(' ');
}
