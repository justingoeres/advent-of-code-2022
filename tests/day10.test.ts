import {Day10} from '../src/2022/day10/Day10';

describe('Day 10: Cathode-Ray Tube', () => {

    let day10Example: Day10 = new Day10('data/day10/example.txt');
    let day10: Day10 = new Day10('data/day10/input.txt');

    test('Example Part 1: Signal Strength', () => {
        expect(day10Example.doPart1()).toBe(13140);
    });

    test('Example Part 2: PART2_RESULT', () => {
        expect(day10Example.doPart2()).toBe(0);
    });

    test('Part 1: Signal Strength', () => {
        expect(day10.doPart1()).toBe(14520);
    });

    test('Part 2: PART2_RESULT', () => {
        expect(day10.doPart2()).toBe(0);
    });
});

