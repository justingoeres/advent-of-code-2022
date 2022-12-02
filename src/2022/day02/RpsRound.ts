import {ThrowEnum} from './ThrowEnum';
import {RpsResult} from './RpsResult';

export class RpsRound {
    constructor(private p1Throw: ThrowEnum, private p2Throw: ThrowEnum) {
    }

    eval(): RpsResult {
        /*
        * The score for a single round is the score for the shape you selected
        * (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for
        * the outcome of the round (0 if you lost, 3 if the round was a draw,
        * and 6 if you won).
        */

        // Start with the point values of the throws
        let result = new RpsResult(this.p1Throw, this.p2Throw);

        // Calculate the winner and the resulting score for each player, and return that.
        switch (this.isP1Win()) {
            case RoundResult.TIE:
                result.update(RoundResult.TIE, RoundResult.TIE);
                break;
            case RoundResult.WIN:
                result.update(RoundResult.WIN, RoundResult.LOSE);
                break;
            case RoundResult.LOSE:
                result.update(RoundResult.LOSE, RoundResult.WIN);
                break;
        }
        return result;
    }

    private isP1Win(): RoundResult {
        // Return true if P1 wins,
        //        false if P2 wins
        if (this.p1Throw == this.p2Throw) {
            return RoundResult.TIE;
        } else if ((this.p1Throw == ThrowEnum.ROCK && this.p2Throw == ThrowEnum.SCISSORS)
            || (this.p1Throw == ThrowEnum.SCISSORS && this.p2Throw == ThrowEnum.PAPER)
            || (this.p1Throw == ThrowEnum.PAPER && this.p2Throw == ThrowEnum.ROCK)) {
            return RoundResult.WIN;
        } else {
            return RoundResult.LOSE;
        }
    }

}

enum RoundResult {
    TIE = 3,
    WIN = 6,
    LOSE = 0
}
