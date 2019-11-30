import parser from './parser';
import calc from './calc';
const input = process.argv.slice(2).shift();

export default function calculator(input) {
    return calc(parser(input));
}

console.log(calculator(input));