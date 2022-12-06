import {LinesReader} from '../../common/reader/LinesReader';
import {SingleLineReader} from '../../common/reader/SingleLineReader';

export class Day06 {
    reader: SingleLineReader;
    input: any;

    constructor(inputFile: string) {
        this.reader = new SingleLineReader(inputFile);
        this.reader.read();
        // this.parseInputPart1();
    }

    doPart1(): number {
        /*
            How many characters need to be processed before the first start-of-packet marker is detected?
        */

        for (var i = 0; i < this.reader.line.length; i++) {
            // get the next 4-character buffer
            const buffer = this.reader.line.slice(i, i + 4);

            // is it a valid start of packet?
            if (this.isStartOfPacket(buffer)) break;
        }
        return i + 4;
    }


    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    isStartOfPacket(buffer: string): boolean {
        // brute-force check to see if any two characters are the same.
        const valid: boolean = !((buffer.charAt(0) == buffer.charAt(1))
            || (buffer.charAt(0) == buffer.charAt(2))
            || (buffer.charAt(0) == buffer.charAt(3))
            || (buffer.charAt(1) == buffer.charAt(2))
            || (buffer.charAt(1) == buffer.charAt(3))
            || (buffer.charAt(2) == buffer.charAt(3)));
        return valid;

    }

    // parseInputPart1(): void {
    //     this.input = this.reader.lines.map((line: string): any => {
    //         return 'something';
    //     });
    // }

}
