import {LinesReader} from '../../common/reader/LinesReader';
import {Monkey} from './Monkey';
import {multiplyReduce, sumReduce} from '../../common/Utils';

export class Day11 {
    reader: LinesReader;
    monkeys: Monkey[] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInput();
    }

    doPart1(): number {
        /*
            Figure out which monkeys to chase by counting how many items they inspect over 20 rounds.
             What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
        */
        for (let round = 0; round < 20; round++) {
            this.doRound();
        }
        // calculate the two highest monkey businesses & return the answer
        const result: number = this.monkeys.map((monkey) => monkey.inspectionCount)
            .sort((n1, n2) => n2 - n1)
            .splice(0, 2).reduce(multiplyReduce);
        return result;
    }

    doPart2(): number {
        /*
            Worry levels are no longer divided by three after each item is inspected;
            you'll need to find another way to keep your worry levels manageable.
            Starting again from the initial state in your puzzle input, what is the level
            of monkey business after 10000 rounds?
        */
        // Clear out the monkeys and (re-)parse the input
        this.monkeys = [];
        this.parseInput();
        const printRounds: Set<number> = new Set([1, 20, 1000, 2000, 3000, 4000, 5000]);
        for (let round = 0; round < 10000; round++) {
            this.doRound(false);
            // let output: String = '== After round ' + (round + 1) + ' ==\n';
            // const stats: string[] = this.monkeys.map((monkey, i) => 'Monkey' + i + ' has items: ' + monkey.items);
            // console.log(output.concat(stats.join('\n')));

            if (printRounds.has(round + 1)) {
                let output: String = '== After round ' + (round + 1) + ' ==\n';
                const stats: string[] = this.monkeys.map((monkey, i) => 'Monkey' + i + ' inspected items ' + monkey.inspectionCount + ' times.');
                console.log(output.concat(stats.join('\n')));
            }
        }
        // calculate the two highest monkey businesses & return the answer
        const result: number = this.monkeys.map((monkey) => monkey.inspectionCount)
            .sort((n1, n2) => n2 - n1)
            .splice(0, 2).reduce(multiplyReduce);
        return result;
    }

    doRound(reduceWorry: boolean = true): void {
        // go through the monkeys in order
        // for each monkey
        for (const monkey of this.monkeys) {
            let item: bigint;
            // for each held item
            while (item = monkey.items.shift() as bigint) {
                // inspect (do operation)
                item = monkey.operation(item);
                monkey.inspectionCount++;
                if (reduceWorry) { // boredom (divide by 3)
                    item = BigInt(Math.floor(Number(item) / 3));
                }
                // do test
                let target: number = (!(item % monkey.test)) ? monkey.trueTarget : monkey.falseTarget;
                // throw based on test result
                this.monkeys[target].addItem(item as bigint);
            }
        }
    }

    // doRoundPart2(): void {
    //     // go through the monkeys in order
    //     // for each monkey
    //     for (const monkey of this.monkeys) {
    //         let item;
    //         // for each held item
    //         while (item = monkey.items.shift()) {
    //             // inspect (do operation)
    //             item = monkey.operation(item);
    //             monkey.inspectionCount++;
    //             item = Math.floor(item / 3);
    //             // do test
    //             let target: number = (item % monkey.test == 0) ? monkey.trueTarget : monkey.falseTarget;
    //             // throw based on test result
    //             this.monkeys[target].addItem(item);
    //         }
    //     }
    // }

    parseInput(): void {
        /*
                Monkey 0:
                Starting items: 73, 77
                Operation: new = old * 5
                Test: divisible by 11
                If true: throw to monkey 6
                If false: throw to monkey 5

                etc.
        */

        let monkey: Monkey = this.monkeys[0];

        const newMonkeyRegex = /Monkey/;
        const itemsRegex: RegExp = /Starting items: (\d.*)$/;
        const operationRegex: RegExp = /Operation: new = old (.) (\d+|old)/;
        const testRegex = /Test: divisible by (\d+)/;
        const throwRegex = /If (true|false): throw to monkey (\d)/;
        for (const line of this.reader.lines) {
            // Make a monkey out of each section
            if (newMonkeyRegex.test(line)) {
                monkey = new Monkey();
            } else if (itemsRegex.test(line)) {
                const match = line.match(itemsRegex) as RegExpMatchArray;
                monkey.addItems(match[1]);
            } else if (operationRegex.test(line)) {
                const match = line.match(operationRegex) as RegExpMatchArray;
                switch (match[1]) {
                    case '+':
                        monkey.operation = Monkey.createAddOp(BigInt(parseInt(match[2])));
                        break;
                    case '*':
                        monkey.operation = (match[2] == 'old')
                            ? Monkey.createSquaredOp()
                            : Monkey.createMultiplyOp(BigInt(parseInt(match[2])));
                        break;
                }
            } else if (testRegex.test(line)) {
                const match = line.match(testRegex) as RegExpMatchArray;
                monkey.test = BigInt(parseInt(match[1]));
            } else if (throwRegex.test(line)) {
                const match = line.match(throwRegex) as RegExpMatchArray;
                const target = parseInt(match[2]);
                (match[1] == 'true') ? monkey.trueTarget = target : monkey.falseTarget = target;
            } else {
                // finished a monkey!
                this.monkeys.push(monkey);
                monkey = new Monkey();
            }
        }
        // push the leftover monkey
        this.monkeys.push(monkey);
    }

}
