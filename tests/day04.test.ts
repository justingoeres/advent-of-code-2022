import {Day04} from '../src/2022/day04/Day04';

describe('Day 4: Camp Cleanup', () => {

    let day04: Day04 = new Day04('data/day04/input.txt');
    let day04Example: Day04 = new Day04('data/day04/example.txt');

    test('Example Part 1: Total pairs with containment', () => {
        expect(day04Example.doPart1()).toBe(2);
    });

    test('Example Part 2: Total pairs with overlap', () => {
        expect(day04Example.doPart2()).toBe(4);
    });

    test('Part 1: Total pairs with containment', () => {
        expect(day04.doPart1()).toBe(513);
    });

    test('Part 2: Total pairs with overlap', () => {
        // 752 wrong
        expect(day04.doPart2()).toBe(878);
    });
});

