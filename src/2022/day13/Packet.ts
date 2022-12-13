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

type closingBracketInfo = { packet: string, endIndex: number }