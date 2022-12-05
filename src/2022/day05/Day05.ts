import {LinesReader} from '../../common/reader/LinesReader';
import {Stack} from '../../common/stack/Stack';
import {StackMove} from './StackMove';

export class Day05 {
    reader: LinesReader;
    stacks: Array<Stack<string>> = Array.of(
        new Stack<string>(), new Stack<string>(),
        new Stack<string>(), new Stack<string>(),
        new Stack<string>(), new Stack<string>(),
        new Stack<string>(), new Stack<string>(),
        new Stack<string>());  // hardcode 9 stacks
    moves: Array<StackMove> = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
    }

    doPart1(): string {
        /*
            After the CrateMover 9000 procedure completes,
            what crate ends up on top of each stack?
        */
        this.reset();

        // execute the moves
        this.moves.forEach((move) => this.doMovePart1(move));

        // Then get the results
        const result = this.getResults();
        return result;
    }

    private getResults(): string {
        const result: string = this.stacks.map((stack) => stack.pop())
            .filter((item): item is string => !!item)
            .reduce((current, next) => current.concat(next));
        return result;
    }

    doPart2(): string {
        /*
            After the CrateMover 9001 procedure completes,
            what crate ends up on top of each stack?
        */
        this.reset();

        // execute the moves
        this.moves.forEach((move) => this.doMovePart2(move));

        // Then get the results
        const result = this.getResults();
        return result;
    }

    parseInput(): void {
        // build the stacks from the first 9 lines
        const stackRegex: RegExp = new RegExp(/(?:\[[A-Z]\]|(\s{3}))\s?/, 'g');
        const itemRegex: RegExp = new RegExp(/\[([A-Z])\]/);
        const lines: string[] = this.reader.lines;

        // Count the number of levels in the starting stacks
        let count: number = 0;
        while (stackRegex.test(lines[count])) {
            count++;
        }
        // Build our stacks
        for (const line of lines.splice(0, count).reverse()) {
            // Do them in reverse, from bottom to top
            let items = line.match(stackRegex) as RegExpMatchArray;
            for (const i in items) {
                if (itemRegex.test(items[i])) {
                    // If this column is *not* blank
                    const item: string = (items[i].match(itemRegex) as RegExpMatchArray)[1];
                    this.stacks[i].push(item);
                }
            }
        }
        // We've parsed the stacks, now parse the commands
        for (const line of lines) {
            if (StackMove.MOVE_REGEX.test(line)) {
                const moveCommand: StackMove = new StackMove(line);
                this.moves.push(moveCommand);
            }
        }
    }

    doMovePart1(move: StackMove): void {
        this.moveStacktoStack(move.howMany, this.stacks[move.from - 1], this.stacks[move.to - 1]);
    }

    doMovePart2(move: StackMove): void {
        // To keep stack order intact, just move twice
        const tempStack: Stack<string> = new Stack<string>();
        this.moveStacktoStack(move.howMany, this.stacks[move.from - 1], tempStack);
        this.moveStacktoStack(move.howMany, tempStack, this.stacks[move.to - 1]);
    }

    moveStacktoStack(howMany: number, from: Stack<string>, to: Stack<string>): void {
        for (let i = 0; i < howMany; i++) {
            const item = from.pop();
            if (item) {
                to.push(item);
            }
        }
    }

    reset(): void {
        this.reader.read();
        this.stacks.forEach((stack) => stack.clear());
        this.moves = [];
        this.parseInput();
    }
}
