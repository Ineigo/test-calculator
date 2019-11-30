import parseToString, { priority } from './parser';
import calc from './calc';
import calculator from '.';

describe('calculator', () => {
    it.each([
        ['2+3', 5],
        ['3^3', 27],
        ['(9-2+1)*5', 40],
        ['9/(3 + (2 * 2) - 4)', 3],
        ['(9/(3 + (2 * 2) - 4) + 2)^2', 25],
        ['(12-12', null],
        ['asdadasd', null],
        ['a+b', null],
    ])('%s = %s', (input, expected) => {
        expect(calculator(input)).toBe(expected);
    });
});

describe('calc', () => {
    it.each([
        ['2 2 +', 4],
        ['1 2 + 4 * 3 +', 15],
        ['3 4 2 * 1 5 - 2 ^ / +', 3.5],
        [undefined, null],
    ])('%s = %s', (input, expected) => {
        expect(calc(input)).toBe(expected);
    });
});

describe('priority', () => {
    it('(,) = 0', () => {
        expect(priority('(')).toBe(0);
        expect(priority(')')).toBe(0);
    });
    it('+,- = 1', () => {
        expect(priority('+')).toBe(1);
        expect(priority('-')).toBe(1);
    });
    it('*,/ = 2', () => {
        expect(priority('*')).toBe(2);
        expect(priority('/')).toBe(2);
    });
    it('^ = 2', () => {
        expect(priority('^')).toBe(3);
    });
});

describe('parser', () => {
    it.each([
        ['2+2', '2 2 +'],
        ['(1+2)*4+3', '1 2 + 4 * 3 +'],
        ['3 + 4 * 2 / (1 - 5)^2', '3 4 2 * 1 5 - 2 ^ / +'],
        [null, null],
    ])('%s => %s', (input, expected) => {
        // Act
        const result = parseToString(input);

        // Assert
        expect(result).toBe(expected);
    });
});
