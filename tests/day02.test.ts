import {Day02} from '../src/2022/day02/Day02';

describe('Day 2: Rock Paper Scissors', () => {

    let day02: Day02 = new Day02('data/day02/input.txt');
    let day02Example: Day02 = new Day02('data/day02/example.txt');

    test('Example Part 1: Total Score', () => {
        expect(day02Example.doPart1()).toBe(15);
    });

    test('Example Part 2: Total Score', () => {
        expect(day02Example.doPart2()).toBe(12);
    });

    test('Part 1: Total Score', () => {
        expect(day02.doPart1()).toBe(15691);
    });

    test('Part 2: Total Score', () => {
        expect(day02.doPart2()).toBe(12989);
    });
});

