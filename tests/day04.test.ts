import {Day04} from '../src/2022/day04/Day04';

describe('Day 3: NAME', () => {

    let day04: Day04 = new Day04('data/day04/input.txt');
    let day04Example: Day04 = new Day04('data/day04/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day04Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day04Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day04.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day04.doPart2()).toBe(0);
    });
});

