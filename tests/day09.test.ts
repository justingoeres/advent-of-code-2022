import {Day09} from '../src/2022/day09/Day09';

describe('Day 9: NAME', () => {

    let day09Example: Day09 = new Day09('data/day09/example.txt');
    let day09: Day09 = new Day09('data/day09/input.txt');

    test('Example Part 1: PART1_RESULT', () => {
        expect(day09Example.doPart1()).toBe(0);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day09Example.doPart2()).toBe(0);
    });

    test('Part 1: PART1_RESULT', () => {
        expect(day09.doPart1()).toBe(0);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day09.doPart2()).toBe(0);
    });
});

