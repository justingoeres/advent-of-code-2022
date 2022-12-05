import {Day05} from '../src/2022/day05/Day05';

describe('Day 3: NAME', () => {

    let day05: Day05 = new Day05('data/day05/input.txt');
    let day05Example: Day05 = new Day05('data/day05/example.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day05Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day05Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day05.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day05.doPart2()).toBe(0);
    });
});

