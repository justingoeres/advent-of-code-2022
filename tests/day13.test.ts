import {Day13} from '../src/2022/day13/Day13';

describe('Day 13: Distress Signal', () => {

    let day13Example: Day13 = new Day13('data/day13/example.txt');

    test('Example Part 1: Sum of correctly-ordered pair indexes', () => {
        expect(day13Example.doPart1()).toBe(13);
    });

    // test('Example Part 2: PART2_RESULT', () => {
    //     expect(day13Example.doPart2()).toBe(0);
    // });

    let day13: Day13 = new Day13('data/day13/input.txt');

    test('Part 1: Sum of correctly-ordered pair indexes', () => {
        expect(day13.doPart1()).toBe(6272);
    });

    // test('Part 2: PART2_RESULT', () => {
    //     expect(day13.doPart2()).toBe(0);
    // });
});

