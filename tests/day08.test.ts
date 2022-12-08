import {Day08} from '../src/2022/day08/Day08';

describe('Day 8: NAME', () => {

    let day08: Day08 = new Day08('data/day08/input.txt');
    let day08Example: Day08 = new Day08('data/day08/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day08Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day08Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day08.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day08.doPart2()).toBe(0);
    });
});

