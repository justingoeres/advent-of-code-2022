import {SingleLineReader} from '../../common/reader/SingleLineReader';
import {MapUtils} from '../../common/MapUtils';

export class Day06 {
    reader: SingleLineReader;

    constructor(inputFile: string) {
        this.reader = new SingleLineReader(inputFile);
        this.reader.read();
    }

    doPart1(): number {
        /*
            How many characters need to be processed before the first start-of-packet marker is detected?
        */
        const startPos: number = this.findStartOfPacket(4, this.reader.line);
        return startPos;
    }

    doPart2(): number {
        /*
            Now a start-of-message marker is just like a start-of-packet marker,
            except it consists of 14 distinct characters rather than 4.

            How many characters need to be processed before the first start-of-packet marker is detected?

        */
        const startPos: number = this.findStartOfPacket(14, this.reader.line);
        return startPos;
    }

    findStartOfPacket(targetLength: number, buffer: string): number {
        // Search through the buffer until we find 'targetLength' consecutive
        // characters with NO matches

        let uniqueCharactersMap: Map<string, number> = new Map();

        let pos: number = 0; // start at the beginning

        while (true) {  // do until we find something
            // get the next character off the buffer
            let char: string = buffer.charAt(pos);
            if (uniqueCharactersMap.has(char)) {
                // This character is a dupe! Clean out the map and continue.
                // We want to jump the map ahead to just after the PREVIOUS instance of this char.
                // Get the position of the first instance
                const firstPos: number = uniqueCharactersMap.get(char) as number; // it's always going to exist
                // Remove everything with a 'pos' BEFORE that from the map
                uniqueCharactersMap = MapUtils.filter(uniqueCharactersMap, (char, charPos): boolean => {
                    // keep entries where the filter is TRUE
                    return (charPos > firstPos);
                });
            }
            // Update (or add) the char's value with the current pos.
            uniqueCharactersMap.set(char, pos);
            // index forward
            pos++;
            // stop if we're done
            if (uniqueCharactersMap.size == targetLength) break;
        }
        return pos;
    }
}
