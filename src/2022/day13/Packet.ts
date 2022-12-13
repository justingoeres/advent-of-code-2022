export type packet = (number | packet)[];

export function parsePacket(text: string): packet {
    /*
     a packet is
        //  [1,1,5,1,1]         packet
        //      1,1,5,1,1       number, number, number, number, number  (numbers)

        //  [[1],[2,3,4]]       packet
        //      [1],[2,3,4]     packet, packet                          (packets)
        //          [1]         number                                  (numbers)
        //          [2,3,4]     number, number, number                  (numbers)

        //  [[8,7,6]]           packet
        //      [8,7,6]         packet                                  (packets)
        //          [8,7,6]     number, number, number                  (numbers)

        //  [[[]]]              packet                                  (packets)
        //      [[]]            packet                                  (packets)
        //          []          number? (empty?)                        (numbers?)
     */
    const contents: packet = [];
    // to parse a packet
    // packets are always wrapped in []
    // unwrap the surrounding []
    const unwrapPacketRegex: RegExp = /^\[(.*)]/;
    const numRegex = /^(\d+)/;
    // this will leave a list (,) of numbers & packets that we need to decode
    // scan over the list

    for (let i = 0; i < text.length; i++) {
        const matchText: string = text.substring(i);
        if (unwrapPacketRegex.test(matchText)) {
            // If this char is the start of a contained packet
            // const unwrapped: string = (text.match(unwrapPacketRegex) as RegExpMatchArray)[1];
            const unwrapped: closingBracketInfo = findClosingBracket(matchText);
            const containedPacket = parsePacket(unwrapped.packet);
            contents.push(containedPacket);
            i += unwrapped.endIndex; // jump beyond the packet we just parsed
        } else if (numRegex.test(matchText)) {
            // If this char is a number
            // store it
            contents.push(parseInt((matchText.match(numRegex) as RegExpMatchArray)[1]));
        } else {
            // it's a comma, just continue
        }
    }

    // for numbers, simply store them
    // packets will be again surrounded by []
    // so when we find a [, unwrap to the containing ]
    // and recurse into it.
    // So when we're done, a packet is an ARRAY of 'number | packet'
    return contents;
}

type closingBracketInfo = { packet: string, endIndex: number }

function findClosingBracket(text: string): closingBracketInfo {
    //  [1],[2,3,4] returns [1]
    //  [2,[3,[4,[5,6,7]]]],8,9] returns [2,[3,[4,[5,6,7]]]],8,9]
    let count: number = 0;
    let endIndex: number = 0;
    for (let i = 0; i < text.length; i++) {
        // count the braces
        if (text.charAt(i) == '[') count++;
        else if (text.charAt(i) == ']') count--;
        if (count == 0) {
            // if count gets (back) to zero, we've found the matching close bracket
            endIndex = i;
            break;
        }
    }
    const bracketText: string = text.substring(1, endIndex);
    return {packet: bracketText, endIndex: endIndex};
}

export function comparePackets(packet1: packet, packet2: packet): boolean {
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
    let result: boolean = true;
    for (const i in packet1) {
        const left = packet1[i];
        const right = packet2[i];
        console.log('Comparing...\n' + typeof left + ': ' + left + '\n' + typeof right + ': ' + right);
        if (typeof left == 'number' && typeof right == 'number') {
//           If both values are integers, the lower integer should come first.
//           If the left integer is lower than the right integer, the inputs are in the right order.
            if (left < right) return true;
//           If the left integer is higher than the right integer, the inputs are not in the right order.
            if (left > right) {
                return false;
            }
//           Otherwise, the inputs are the same integer; continue checking the next part of the input.
        }
        // if the right side has run out of items, inputs are NOT in the right order
        else if (typeof right == 'undefined') return false;
        else if (typeof left == 'object' && typeof right == 'object') {
            // If both values are lists, compare the first value of each list, then the second value, and so on.
            // If the left list runs out of items first, the inputs are in the right order.
            // if (left.length < right.length) return true;
            // If the right list runs out of items first, the inputs are not in the right order.
            // if (left.length > right.length) return false;
            // If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
            // If the comparison fails, return a failed compare. Otherwise, keep going.
            // if (!comparePackets(left, right)) return false;
            result = comparePackets(left, right);
        } else {
            // If exactly one value is an integer, convert the integer to a list
            // which contains that integer as its only value, then retry the comparison.
            if (typeof left == 'number') {
                // convert left to an array
                if (!comparePackets(Array.of(left), right as packet)) return false;
            } else {
                // convert right to an array
                if (!comparePackets(left as packet, Array.of(right))) return false;
            }
        }
        if (result == false) return false;
    }

    return result;
}

function isNumber(packet: packet | number): boolean {
    // does this
    return (typeof packet === 'number');
}
