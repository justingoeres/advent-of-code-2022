import {Day07} from '../src/2022/day07/Day07';

describe('Day 7: No Space Left On Device', () => {

    let day07Example: Day07 = new Day07('data/day07/example.txt');
    let day07: Day07 = new Day07('data/day07/input.txt');

    test('Example Part 1: Total Size, Directories < 100,000', () => {
        expect(day07Example.doPart1()).toBe(95437);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day07Example.doPart2()).toBe(0);
    });

    test('Part 1: Total Size, Directories < 100,000', () => {
        expect(day07.doPart1()).toBe(1297159);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day07.doPart2()).toBe(0);
    });
});

