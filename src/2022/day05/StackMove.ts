export class StackMove {
    public howMany: number = 0;
    public from: number = 0;
    public to: number = 0;

    static MOVE_REGEX: RegExp = new RegExp(/move (\d+) from (\d) to (\d)/);

    constructor(command: string) {
        const regex = new RegExp(StackMove.MOVE_REGEX);
        const match = command.match(regex);

        if (match) {
            // if it's not null
            this.howMany = parseInt(match[1]);
            this.from = parseInt(match[2]);
            this.to = parseInt(match[3]);
        }
    }
}