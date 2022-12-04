import {LinesReader} from '../../common/reader/LinesReader';
import {CsvFileReader} from '../../common/reader/CsvFileReader';
import {Ranges} from './Ranges';
import {ElfRange} from './ElfRange';

export class Day04 {
    reader: LinesReader;
    ranges: Ranges[] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInputPart1();
    }

    doPart1(): number {
        /*
            In how many assignment pairs does one range fully contain the other?
        */
        const total: number = this.ranges
            .filter((element) => element.hasContainment())
            .length;
        return total;
    }

    doPart2(): number {
        /*
            In how many assignment pairs do the ranges overlap?
        */
        const total: number = this.ranges
            .filter((element) => element.hasOverlap())
            .length;
        return total;
    }

    parseInputPart1(): void {
        this.ranges = this.reader.lines.map((line: string): any => {
            return new Ranges(line);
        });
    }

}
