import {Day07} from '../src/2022/day07/Day07';

describe('Day 7: NAME', () => {

    let day07: Day07 = new Day07('data/day07/input.txt');
    let day07Example: Day07 = new Day07('data/day07/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day07Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day07Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day07.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day07.doPart2()).toBe(0);
    });
});

