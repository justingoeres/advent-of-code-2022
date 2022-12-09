import {RopeMove} from './RopeMove';
import {URDL, XYPoint} from '../../common/Directions';
import {InputReader} from '../../common/reader/InputReader';
import {Rope} from './Rope';
import {HashSet} from '../../common/SetUtils';

export class Day09 {
    reader: InputReader<RopeMove>;
    input: any;

    constructor(inputFile: string) {
        this.reader = new InputReader<RopeMove>(inputFile, new Day09Parser());
        this.reader.read();
        // this.parseInputPart1();
    }

    doPart1(): number {
        /*
            Simulate your complete hypothetical series of motions.
            How many positions does the tail of the rope visit at least once?
        */
        const rope: Rope = new Rope();
        const tailVisited: Set<string> = new Set<string>();

        this.reader.input.forEach((move) => {
            // move the rope (& the tail)
            for (let i = 0; i < move.distance; i++) {
                rope.doMove(move);
                // update the list of places the tail has been
                tailVisited.add(JSON.stringify(rope.tail));
            }
        });
        return tailVisited.size;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    // parseInputPart1(): void {
    //     this.input = this.reader.input.map((line: string): any => {
    //         return 'something';
    //     });
    // }

}

class Day09Parser implements AoCParser<RopeMove> {
    parseLine(line: string): RopeMove {
        // Pattern to match on each line
        const regex: RegExp = new RegExp(/([URDL]) (\d+)/);
        // Do the match
        const matches = (line.match(regex) as RegExpMatchArray);
        // Create an array of Trees from each line of input
        return new RopeMove(matches[1] as URDL, parseInt(matches[2]));
    }
}