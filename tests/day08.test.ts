import {Day08} from '../src/2022/day08/Day08';

describe('Day 8: Treetop Tree House', () => {

    let day08Example: Day08 = new Day08('data/day08/example.txt');
    let day08: Day08 = new Day08('data/day08/input.txt');

    test('Example Part 1: Total Trees Visible', () => {
        expect(day08Example.doPart1()).toBe(21);
    });

    test('Example Part 2: Highest Scenic Score (Scan)', () => {
        expect(day08Example.doPart2()).toBe(8);
    });

    test('Example Part 2: Highest Scenic Score (Spiral)', () => {
        expect(day08Example.doPart2Spiral()).toBe(8);
    });

    test('Part 1: Total Trees Visible', () => {
        expect(day08.doPart1()).toBe(1801);
    });

    test('Part 2: Highest Scenic Score (Scan)', () => {
        expect(day08.doPart2()).toBe(209880);
    });

    test('Part 2: Highest Scenic Score (Spiral)', () => {
        expect(day08.doPart2Spiral()).toBe(209880);
    });

});

