import {Day10} from '../src/2022/day10/Day10';

describe('Day 10: Cathode-Ray Tube', () => {

    // let day10Example: Day10 = new Day10('data/day10/example.txt');
    let day10: Day10 = new Day10('data/day10/input.txt');

    // test('Example: Signal Strength', () => {
    //     expect(day10Example.doPart1()).toBe(13140);
    // });

    test('Parts 1 & 2: Signal Strength', () => {
        expect(day10.doPart1()).toBe(14520);
        // Part 2 answer: PZBGZEJB
    });
});

