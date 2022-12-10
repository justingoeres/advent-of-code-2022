import {Day10} from '../src/2022/day10/Day10';

describe('Day 10: NAME', () => {

    let day10Example: Day10 = new Day10('data/day10/example1.txt');
    let day10: Day10 = new Day10('data/day10/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day10Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day10Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day10.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day10.doPart2()).toBe(0);
    });
});

