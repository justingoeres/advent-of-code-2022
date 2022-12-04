import {Day${AOC_DAY}} from '../src/2022/day${AOC_DAY}/Day${AOC_DAY}';

describe('Day 3: NAME', () => {

    let day${AOC_DAY}: Day${AOC_DAY} = new Day${AOC_DAY}('data/day${AOC_DAY}/input.txt');
    let day${AOC_DAY}Example: Day${AOC_DAY} = new Day${AOC_DAY}('data/day${AOC_DAY}/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day${AOC_DAY}Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day${AOC_DAY}Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day${AOC_DAY}.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day${AOC_DAY}.doPart2()).toBe(0);
    });
});

