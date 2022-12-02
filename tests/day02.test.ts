import {Day02} from '../src/2022/day02/Day02';
import {Day01} from '../src/2022/day01/Day01';

describe('Day 2: Rock Paper Scissors', () => {

    let day02: Day02 = new Day02('data/day02/input.txt');
    let day02Example: Day02 = new Day02('data/day02/example.txt');

    test('Example: Total Score', () => {
        // 11257 too low
        // 14176 too low
        expect(day02Example.doPart1()).toBe(15);
    });

    test('Part 1: Total Score', () => {
        // 11257 too low
        // 14176 too low
        expect(day02.doPart1()).toBe(15691);
    });

    test('Part 2: Calories carried by top 3 elves', () => {
        expect(day02.doPart2()).toBe(209914);
    });
});

