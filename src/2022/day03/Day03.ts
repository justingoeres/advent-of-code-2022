import {LinesReader} from '../../common/reader/LinesReader';
import {Rucksack} from './Rucksack';

export class Day03 {
    reader: LinesReader;
    allRucksacks: Rucksack[] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInputPart1();
    }

    doPart1(): number {
        /*
            Find the item type that appears in both compartments of each rucksack.
            What is the sum of the priorities of those item types?
        */

        const totalScore = this.allRucksacks.map((rucksack: Rucksack): number =>
            this.calculateScore(rucksack)
        ).reduce((sum, current) => sum + current);

        return totalScore;
    }

    // doPart2(): number {
    //     /*
    //         Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
    //     */
    //     const sorted = this.allElfCalories.sort().reverse();
    //     const [a, b, c] = sorted;
    //     return a + b + c;
    // }

    parseInputPart1(): void {
        this.allRucksacks = this.reader.lines.map((line: string): Rucksack => {
            return new Rucksack(line);
        });
    }

    calculateScore(rucksack: Rucksack): number {
        /*
            Lowercase item types a through z have priorities 1 through 26.
            Uppercase item types A through Z have priorities 27 through 52.
         */
        const priorities: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const score: number = priorities.search(rucksack.findItemMatch()) + 1;
        return score;
    }
}
