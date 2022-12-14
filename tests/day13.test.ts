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
        // there are 150 pairs in the input
        // 614 too low
        // 4349 too low (wrong input)
        // 4627 too low
        // 6473 wrong
        expect(day13.doPart1()).toBe(0);
    });

    // test('Part 2: PART2_RESULT', () => {
    //     expect(day13.doPart2()).toBe(0);
    // });
});

