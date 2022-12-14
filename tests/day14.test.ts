import {Day14} from '../src/2022/day14/Day14';

describe('Day 14: NAME', () => {

    let day14Example: Day14 = new Day14('data/day14/example.txt');
    let day14: Day14 = new Day14('data/day14/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day14Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day14Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day14.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day14.doPart2()).toBe(0);
    });
});

