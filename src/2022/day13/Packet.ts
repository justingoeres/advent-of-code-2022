import {isArray, zip} from '../../common/array';

export type PacketItem = (number | number[]);
export type Packet = PacketItem[];

export enum ComparisonResult {
    Correct = -1,
    Incorrect = 1,
    Equal = 0
}

export const comparePackets = (packet1: Packet, packet2: Packet): ComparisonResult => {
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

    // Ref: https://github.com/rogisolorzano/aoc-2022-ts/blob/main/src/day-13/index.ts
    
    // Combine (zip) the left & right halves of the packet and iterate over them as tuples
    for (const [left, right] of zip(packet1, packet2)) {
        // console.log('Comparing...\n' + typeof left + ': ' + left + '\n' + typeof right + ': ' + right);
        // if the left side has run out of items, inputs ARE in the right order
        if (left === undefined) return ComparisonResult.Correct;
        // if the right side has run out of items, inputs are NOT in the right order
        if (right === undefined) return ComparisonResult.Incorrect;

        if (typeof left == 'number' && typeof right == 'number') {
            // If both values are integers...
            // If they're equal, continue without a decision
            if (left === right) continue;
//           If the left integer is lower than the right integer, the inputs are in the right order.
//           If the left integer is higher than the right integer, the inputs are not in the right order.
            return left < right ? ComparisonResult.Correct : ComparisonResult.Incorrect;
        }

        // If one side is an array and the other is a number, wrap the number and check
        const result = comparePackets(isArray(left) ? left : [left], isArray(right) ? right : [right]);

        // If we have a result, return it
        if (result != ComparisonResult.Equal) {
            return result;
        }
        // reached the end with no decision, just continue
    }
    return ComparisonResult.Equal;
}

