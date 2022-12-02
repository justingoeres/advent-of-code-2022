export enum ThrowEnum {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

export namespace ThrowEnum {
    export function fromChar(val: string): ThrowEnum {
        /*
        *  A for Rock, B for Paper, and C for Scissors.
        *  X for Rock, Y for Paper, and Z for Scissors
        */
        if (val == 'A' || val == 'X') {
            return ThrowEnum.ROCK;
        } else if (val == 'B' || val == 'Y') {
            return ThrowEnum.PAPER;
        } else {
            return ThrowEnum.SCISSORS;
        }
    }
}
