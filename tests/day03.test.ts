import {Day03} from '../src/2022/day03/Day03';

describe('Day 3: Rucksack Reorganization', () => {

    let day03: Day03 = new Day03('data/day03/input.txt');
    let day03Example: Day03 = new Day03('data/day03/example.txt');

    test('Example Part 1: Total Priorities', () => {
        expect(day03Example.doPart1()).toBe(15);
    });

    // test('Example Part 2: Total Score', () => {
    //     expect(day03Example.doPart2()).toBe(12);
    // });

    test('Part 1: Total Priorities', () => {
        expect(day03.doPart1()).toBe(15691);
    });

    // test('Part 2: Total Score', () => {
    //     expect(day03.doPart2()).toBe(12989);
    // });
});

