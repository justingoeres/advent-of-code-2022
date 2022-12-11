import {LinesReader} from '../../common/reader/LinesReader';
import {Monkey} from './Monkey';
import {multiplyReduce, sumReduce} from '../../common/Utils';

export class Day11 {
    reader: LinesReader;
    monkeys: Monkey[] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInputPart1();
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
        const result:number = this.monkeys.map((monkey) => monkey.inspectionCount)
            .sort((n1, n2) => n2 - n1)
            .splice(0, 2).reduce(multiplyReduce);
        return result;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    doRound(): void {
        // go through the monkeys in order
        // for each monkey
        for (const monkey of this.monkeys) {
            let item;
            // for each held item
            while (item = monkey.items.shift()) {
                // inspect (do operation)
                item = monkey.operation(item);
                monkey.inspectionCount++;
                // boredom (divide worry by three)
                item = Math.floor(item / 3);
                // do test
                let target: number = (item % monkey.test == 0) ? monkey.trueTarget : monkey.falseTarget;
                // throw based on test result
                this.monkeys[target].addItem(item);
            }
        }
    }


    parseInputPart1(): void {
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
                        monkey.operation = Monkey.createAddOp(parseInt(match[2]));
                        break;
                    case '*':
                        monkey.operation = (match[2] == 'old')
                            ? Monkey.createSquaredOp()
                            : Monkey.createMultiplyOp(parseInt(match[2]));
                        break;
                }
            } else if (testRegex.test(line)) {
                const match = line.match(testRegex) as RegExpMatchArray;
                monkey.test = parseInt(match[1]);
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
