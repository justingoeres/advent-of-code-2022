import {Day12} from '../src/2022/day12/Day12';

describe('Day 12: Hill Climbing Algorithm', () => {

    let day12Example: Day12 = new Day12('data/day12/example.txt');
    let day12: Day12 = new Day12('data/day12/input.txt');

    test('Example Part 1: Fastest route up', () => {
        expect(day12Example.doPart1()).toBe(31);
    });

    test('Example Part 2: Fastest route down', () => {
        expect(day12Example.doPart2()).toBe(29);
    });

    test('Part 1: Fastest route up', () => {
        expect(day12.doPart1()).toBe(462);
    });

    test('Part 2: Fastest route down', () => {
        expect(day12.doPart2()).toBe(451);
    });
});

