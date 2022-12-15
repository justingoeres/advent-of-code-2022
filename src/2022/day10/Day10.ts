import {Op, OpCodeEnum} from './Op';
import {InputReader} from '../../common/reader/InputReader';
import {CPU, Pixel} from './CPU';
import {sumReduce} from '../../common/Utils';

export class Day10 {
    reader: InputReader<Op>;
    cpu: CPU = new CPU;

    constructor(inputFile: string) {
        this.reader = new InputReader<Op>(inputFile, new Day10Parser());
        this.reader.read();
    }

    doPart1(): number {
        /*
            Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles.
            What is the sum of these six signal strengths?
        */
        this.reader.input.forEach((op: Op) => {
            this.cpu.execute(op);
        });
        // Output for Part 2; line length is 80 because emojis are two bytes instead of one
        const outputLines: RegExp = new RegExp('[' + Pixel.OFF + Pixel.ON + ']{80}', 'g');
        console.log(this.cpu.output.match(outputLines));
        // Answer for Part 1
        return this.cpu.samples.reduce(sumReduce);
    }
}

class Day10Parser implements AoCParser<Op> {
    parseLine(line: string): Op {
        // Pattern to match on each line
        const regex: RegExp = new RegExp(/(\w+)(?:\s(-?\d+))?/);
        // Do the match
        const matches = (line.match(regex) as RegExpMatchArray);
        // Create an array of Ops from each line of input
        return new Op(matches[1] as unknown as OpCodeEnum, parseInt(matches[2]));
    }
}
