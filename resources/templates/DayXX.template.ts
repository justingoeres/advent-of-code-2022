import {LinesReader} from '../../common/reader/LinesReader';

export class Day${AOC_DAY} {
    reader: LinesReader;
    input: any;

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInputPart1();
    }

    doPart1(): number {
        /*
            DESCRIPTION
        */

        return 0;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    parseInputPart1(): void {
        this.input = this.reader.lines.map((line: string): any => {
            return 'something';
        });
    }

}
