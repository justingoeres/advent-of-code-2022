import {LinesReader} from '../../common/reader/LinesReader';
import {parsePacket} from './Packet';
import {Pair} from './Pair';

export class Day13 {
    reader: LinesReader;
    pairs: Pair[] = [];

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

        let total: number = 0;
        for (const i in this.pairs) {
            console.log('**** PAIR # ' + (parseInt(i) + 1) + ' ****\n' + this.pairs[i]);
            const result: boolean = this.pairs[i].evaluate();
            if (result) total += parseInt(i) + 1;
            console.log('RESULT:\t' + result);
            if (!result) {
                console.log('break here');
            }
        }
        return total;
    }

    evaluatePair(packet1: string, packet2: string): boolean {
        /*
            === RULES ===
            When comparing two values, the first value is called left and the second value is called right. Then:
                If both values are integers, the lower integer should come first. If the left integer is lower than the right integer,
                    the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order.
                    Otherwise, the inputs are the same integer; continue checking the next part of the input.

                If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first,
                    the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order.

                If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.

                If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison.
                    For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].
        */
        /* Examples:
            [1,1,3,1,1]
            [1,1,5,1,1]

            [[1],[2,3,4]]
            [[1],4]
         */

        // to parse a packet
        // packets are always wrapped in []
        // unwrap the surrounding []
        // this will leave an array of numbers & packets that we need to decode
        // iterate over the array
        // for numbers, simply store them
        // packets will be again surrounded by []
        // so when we find a [, unwrap to the containing ]
        // and recurse into it.
        // So when we're done, a packet is an ARRAY of 'number | packet'

        // figure out is each packet an array or a scalar?
        const intRegex: RegExp = /(^\d+)/;
        const packet1isScalar = intRegex.test(packet1);
        const packet2isScalar = intRegex.test(packet2);

        // If both values are integers, the lower integer should come first.
        if (packet1isScalar && packet2isScalar) {
            const int1 = parseInt((packet1.match(intRegex) as RegExpMatchArray)[1]);
            const int2 = parseInt((packet2.match(intRegex) as RegExpMatchArray)[2]);
            return (int1 > int2);
        }

        // If both values are lists, compare the first value of each list, then the second value, and so on.
        if (!packet1isScalar && !packet2isScalar) {
            //
        }


        return false;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    parseInput(): void {
        while (this.reader.lines.length > 0) {
            const set: string[] = this.reader.lines.splice(0, 3);   // both 'pair' lines and the blank line separator line
            this.pairs.push(new Pair(parsePacket(set[0]), parsePacket(set[1])));
        }
    }

}
