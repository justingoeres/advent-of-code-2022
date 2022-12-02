import {LinesReader} from '../../common/reader/LinesReader';
import {CsvFileReader} from '../../common/reader/CsvFileReader';
import {RpsRound} from './RpsRound';
import {ThrowEnum} from './ThrowEnum';

export class Day02 {
    reader: CsvFileReader;
    allRounds: RpsRound[] = [];

    constructor(inputFile: string) {
        this.reader = new CsvFileReader(inputFile, ' ');
        this.reader.read();
        this.parseInput();
    }

    doPart1(): number {
        /*
            What would your total score be if everything goes exactly according to your strategy guide?
         */
        return (this.allRounds.map((round: RpsRound): number => {
            return round.eval().p2points;
        }).reduce((sum, current) => sum + current));

        /*
            Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
        */
        // let maxCalories = 0;
        // let elfCalories = 0;
        //
        // const allElfCalories: number[] = [];
        //
        // this.reader.lines.forEach(function (line) {
        //     if (line.match(/^\d+/)) {
        //         // This line is a number, add it up!
        //         elfCalories += parseInt(line);
        //     } else {
        //         // This line is blank; compare this elf's total to the max
        //         maxCalories = elfCalories > maxCalories ? elfCalories : maxCalories;
        //         // And push it onto the array of all elves
        //         allElfCalories.push(elfCalories);
        //         elfCalories = 0;
        //     }
        // });
        // this.allElfCalories = allElfCalories;
        // return maxCalories;

    }

    doPart2(): number {
        /*
            Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
        */
        // const sorted = this.allElfCalories.sort().reverse();
        // const [a, b, c] = sorted;
        // return a + b + c;
        return 0;
    }

    parseInput(): void {
        this.allRounds = this.reader.data.map((row: string[]): RpsRound => {
            // parse each row
            return new RpsRound(ThrowEnum.fromChar(row[0]), ThrowEnum.fromChar(row[1]));
        });
    }
}
