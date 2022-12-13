export class Pair {
    constructor(public packet1: packet, public packet2: packet) {
    }

// example packets:
    //     [1,1,5,1,1]
    //     [[1],[2,3,4]]

    public evaluate(): boolean {
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



        return false;
    }

}

type packet = (number | packet)[];

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
