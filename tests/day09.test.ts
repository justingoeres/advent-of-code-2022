import {Day09} from '../src/2022/day09/Day09';

describe('Day 9: Rope Bridge', () => {

    let day09Example1: Day09 = new Day09('data/day09/example1.txt');
    let day09Example2: Day09 = new Day09('data/day09/example2.txt');
    let day09: Day09 = new Day09('data/day09/input.txt');

    test('Example Part 1: Points Visited By Tail', () => {
        expect(day09Example1.doPart1()).toBe(13);
    });

    test('Example Part 2: Points Visited By Long Tail', () => {
        expect(day09Example2.doPart2()).toBe(36);
    });

    test('Part 1: Points Visited By Tail', () => {
        expect(day09.doPart1()).toBe(6271);
    });

    test('Part 2: Points Visited By Long Tail', () => {
        expect(day09.doPart2()).toBe(2458);
    });
});

