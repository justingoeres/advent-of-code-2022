import {RopeMove} from './RopeMove';
import {URDL, XYPoint} from '../../common/Directions';
import {InputReader} from '../../common/reader/InputReader';
import {Rope} from './Rope';
import {LongRope} from './LongRope';

export class Day09 {
    reader: InputReader<RopeMove>;

    constructor(inputFile: string) {
        this.reader = new InputReader<RopeMove>(inputFile, new Day09Parser());
        this.reader.read();
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
            Simulate your complete series of motions on a larger rope with ten knots.
            How many positions does the tail of the rope visit at least once?
        */
        const longRope: LongRope = new LongRope();
        const tailVisited: Set<string> = new Set<string>();

        this.reader.input.forEach((move) => {
            // move the rope (& the tail)
            for (let i = 0; i < move.distance; i++) {
                longRope.doMove(move);
                // update the list of places the tail has been
                tailVisited.add(JSON.stringify(longRope.tail));
            }
        });
        return tailVisited.size;
    }
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