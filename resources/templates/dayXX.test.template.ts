import {Day${AOC_DAY}} from '../src/${AOC_YEAR}/day${AOC_DAY}/Day${AOC_DAY}';

describe('Day ${AOC_PRETTY_DAY}: NAME', () => {

    let day${AOC_DAY}Example: Day${AOC_DAY} = new Day${AOC_DAY}('data/day${AOC_DAY}/example.txt');
    let day${AOC_DAY}: Day${AOC_DAY} = new Day${AOC_DAY}('data/day${AOC_DAY}/input.txt');

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

