import {LinesReader} from '../../common/reader/LinesReader';
import {comparePackets, ComparisonResult, Packet} from './Packet';
import {splitOn} from '../../common/array';

export class Day13 {
    reader: LinesReader;
    lines: Packet[] = [];
    pairs: [Packet, Packet][] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInput();
    }

    doPart1(): number {
        /*
            Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?
        */
        // for (const pair of pairs) {
        //     // the character index we're looking at in each packet
        //     let i1: number = 0;
        //     let i2: number = 0;
        //
        //
        // }

        let result: number = 0;
        for (const i in this.pairs) {
            // console.log('**** PAIR # ' + (parseInt(i) + 1) + ' ****\n' + this.pairs[i]);
            result = this.pairs.map(([left, right]) => comparePackets(left, right))
                .reduce((sum, result, i) => sum + (result === ComparisonResult.Correct ? i + 1 : 0), 0);
        }
        return result;
    }

    doPart2(): number {
        /*
            Add the two divider packets, [[2]] & [[6]]. Then organize all of the packets into the correct order.
            What is the decoder key for the distress signal?
        */

        // Add the divider packets
        const separator1 = '[[2]]';
        const separator2 = '[[6]]';
        this.lines.push(JSON.parse(separator1));
        this.lines.push(JSON.parse(separator2));

        // Now use our comparison function to sort them
        const sorted = this.lines.sort(comparePackets);
        // Find the 2 divider packets
        const index1 = 1 + this.lines.findIndex(packet => {
            // packet === JSON.parse('[[2]]');
            return JSON.stringify(packet) === separator1;
        });
        const index2 = 1 + this.lines.findIndex(packet => {
            return JSON.stringify(packet) === separator2;
        });
        return index1 * index2;
    }

    parseInput(): void {
        // change each line to JSON (don't parse blanks but keeping them in the array)
        const lines = this.reader.lines.map(line => (line === '' ? '' : JSON.parse(line)));
        // reshape lines into pairs by splitting on blank lines to get an array of tuples '[Packet, Packet]'
        this.pairs = splitOn(lines, line => line === '') as [Packet, Packet][];
        this.lines = lines.filter(line => line !== '') as Packet[];
    }

}
