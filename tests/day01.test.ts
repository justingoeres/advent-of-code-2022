import {Day01} from '../src/2022/day01/Day01';

describe('Day 1: Calorie Counting', () => {

    let day01: Day01 = new Day01('data/day01/input.txt');

    test('Day 1 Part 1: Max Calories carried by any elf', () => {
        expect(day01.doPart1()).toBe(74198);
    });

    test('Day 1 Part 2: Calories carried by top 3 elves', () => {
        expect(day01.doPart2()).toBe(209914);
    });
});

