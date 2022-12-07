import {CsvFileReader} from '../../common/reader/CsvFileReader';
import {RoundResult, RpsRound} from './RpsRound';
import {ThrowEnum} from './ThrowEnum';
import {sumReduce} from '../../common/Utils';

export class Day02 {
    reader: CsvFileReader;
    allRounds: RpsRound[] = [];

    constructor(inputFile: string) {
        this.reader = new CsvFileReader(inputFile, ' ');
        this.reader.read();
    }

    doPart1(): number {
        /*
            What would your total score be if everything goes exactly according to your strategy guide?
         */
        this.parseInputPart1();

        return (this.allRounds.map((round: RpsRound): number => {
            return round.eval().p2points;
        }).reduce(sumReduce));
    }

    doPart2(): number {
        /*
            the second column says how the round needs to end:
                X means you need to lose,
                Y means you need to end the round in a draw, and
                Z means you need to win.
            Following the Elf's instructions for the second column,
            what would your total score be if everything goes exactly
            according to your strategy guide?
        */
        this.parseInputPart2();

        return (this.allRounds.map((round: RpsRound): number => {
            return round.findP2Win().eval().p2points;
        }).reduce(sumReduce));
    }

    parseInputPart1(): void {
        this.allRounds = this.reader.data.map((row: string[]): RpsRound => {
            // parse each row
            let newRound: RpsRound = new RpsRound();
            newRound.p1Throw = ThrowEnum.fromChar(row[0]);
            newRound.p2Throw = ThrowEnum.fromChar(row[1]);
            return newRound;
        });
    }

    parseInputPart2(): void {
        this.allRounds = this.reader.data.map((row: string[]): RpsRound => {
            // parse each row
            let newRound: RpsRound = new RpsRound();
            newRound.p1Throw = ThrowEnum.fromChar(row[0]);
            newRound.result = RoundResult.fromChar(row[1]);
            return newRound;
        });
    }
}
