import {Day05} from '../src/2022/day05/Day05';

describe('Day 5: Supply Stacks', () => {

    let day05: Day05 = new Day05('data/day05/input.txt');
    let day05Example: Day05 = new Day05('data/day05/example.txt');

    test('Example Part 1: CrateMover 9000 Result', () => {
        expect(day05Example.doPart1()).toBe('CMZ');
    });

    test('Example Part 2: CrateMover 9001 Result', () => {
        expect(day05Example.doPart2()).toBe('MCD');
    });

    test('Part 1: CrateMover 9000 Result', () => {
        expect(day05.doPart1()).toBe('SBPQRSCDF');
    });

    test('Part 2: CrateMover 9001 Result', () => {
        expect(day05.doPart2()).toBe('RGLVRCQSB');
    });
});

