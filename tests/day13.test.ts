import {Day13} from '../src/2022/day13/Day13';

describe('Day 13: NAME', () => {

    let day13Example: Day13 = new Day13('data/day13/example.txt');
    let day13: Day13 = new Day13('data/day13/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day13Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day13Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day13.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day13.doPart2()).toBe(0);
    });
});

