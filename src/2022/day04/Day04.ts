import {Ranges} from './Ranges';
import {InputReader} from '../../common/reader/InputReader';

export class Day04 {
    reader: InputReader<Ranges>;

    constructor(inputFile: string) {
        this.reader = new InputReader<Ranges>(inputFile, new Day04Parser());
        this.reader.read();
    }

    doPart1(): number {
        /*
            In how many assignment pairs does one range fully contain the other?
        */
        const total: number = this.reader.input
            .filter((element) => element.hasContainment())
            .length;
        return total;
    }

    doPart2(): number {
        /*
            In how many assignment pairs do the ranges overlap?
        */
        const total: number = this.reader.input
            .filter((element) => element.hasOverlap())
            .length;
        return total;
    }
}

class Day04Parser implements AoCParser<Ranges> {
    parseLine(line: string): Ranges {
        // Pattern to match on each line
        const regex: RegExp = new RegExp(/(\d+)-(\d+),(\d+)-(\d+)/);
        // Do the match
        const match = line.match(regex) as RegExpMatchArray;
        // Create the result object from the match fields
        return new Ranges(parseInt(match[1]), parseInt(match[2]),
            parseInt(match[3]), parseInt(match[4]));
    }
}
