import {LinesReader} from '../../common/reader/LinesReader';
import {Rucksack} from './Rucksack';
import {sumReduce} from '../../common/Utils';

export class Day03 {
    reader: LinesReader;
    allRucksacks: Rucksack[] = [];
    groupedRucksacks: Rucksack[][] = [];

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
            this.calculateScore(rucksack.findItemMatch())
        ).reduce(sumReduce);

        return totalScore;
    }

    doPart2(): number {
        /*
            Find the item type that corresponds to the badges of each three-Elf group.
            What is the sum of the priorities of those item types?
        */
        this.makeGroupedRucksacks();

        // Find all the common items
        const commonItems: string[] = this.groupedRucksacks.map((group: Rucksack[]) =>
            this.findCommonItem(group));

        const totalScore: number = commonItems.map((item: string): number => this.calculateScore(item))
            .reduce((sum, current) => sum + current);

        return totalScore;
    }

    parseInputPart1(): void {
        this.allRucksacks = this.reader.lines.map((line: string): Rucksack => {
            return new Rucksack(line);
        });
    }

    makeGroupedRucksacks(): void {
        // Go through all the rucksacks and group them by 3's.
        // NOTE: This *consumes* the allRucksacks array, so run part 1 first ;)
        this.groupedRucksacks = [];
        while (this.allRucksacks.length) {
            this.groupedRucksacks.push((this.allRucksacks.splice(0, 3)));
        }
    }

    findCommonItem(group: Rucksack[]): string {
        // Find the single common item among all three rucksacks in this group
        const [elf1, elf2, elf3]: Rucksack[] = group;

        // 1. Find all matches between sacks 1 and 2
        const firstMatches: string = elf1.findCommonItems(elf2);
        // make a temporary rucksack just for further matching
        const tempRucksack: Rucksack = new Rucksack(firstMatches);
        // 2. Find all the matches between that and 3
        const commonItem: string = elf3.findCommonItems(tempRucksack);
        // There should only ever be ONE commonItem, so...
        return commonItem.charAt(0);
    }

    calculateScore(item: string): number {
        /*
            Lowercase item types a through z have priorities 1 through 26.
            Uppercase item types A through Z have priorities 27 through 52.
         */
        const priorities: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const score: number = priorities.search(item) + 1;
        return score;
    }
}
