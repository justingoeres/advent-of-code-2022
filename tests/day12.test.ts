import {Day12} from '../src/2022/day12/Day12';

describe('Day 12: NAME', () => {

    let day12Example: Day12 = new Day12('data/day12/example.txt');
    let day12: Day12 = new Day12('data/day12/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day12Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day12Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day12.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day12.doPart2()).toBe(0);
    });
});

