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
            Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
        */
        let maxCalories = 0;
        let elfCalories = 0;

        const allElfCalories: number[] = [];

        this.reader.lines.forEach(function (line) {
            if (line.match(/^\d+/)) {
                // This line is a number, add it up!
                elfCalories += parseInt(line);
            } else {
                // This line is blank; compare this elf's total to the max
                maxCalories = elfCalories > maxCalories ? elfCalories : maxCalories;
                // And push it onto the array of all elves
                allElfCalories.push(elfCalories);
                elfCalories = 0;
            }
        });
        // this.allElfCalories = allElfCalories;
        return maxCalories;
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
        this.reader.lines.map((line: string): Rucksack => {
            return new Rucksack(line);
        });
    }
}
