import {Day06} from '../src/2022/day06/Day06';

describe('Day 6: NAME', () => {

    let day06: Day06 = new Day06('data/day06/input.txt');
    let day06Example: Day06 = new Day06('data/day06/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day06Example.doPart1()).toBe(10);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day06Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day06.doPart1()).toBe(1198);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day06.doPart2()).toBe(0);
    });
});

