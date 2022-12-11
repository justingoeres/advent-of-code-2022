import {Day11} from '../src/2022/day11/Day11';

describe('Day 11: NAME', () => {

    let day11Example: Day11 = new Day11('data/day11/example.txt');
    let day11: Day11 = new Day11('data/day11/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day11Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day11Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day11.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day11.doPart2()).toBe(0);
    });
});

