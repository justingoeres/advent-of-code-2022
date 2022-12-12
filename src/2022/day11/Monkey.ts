export class Monkey {
    items: bigint[] = [];
    operation!: ((old: bigint) => bigint);
    test: bigint = 0n;
    trueTarget: number = 0;
    falseTarget: number = 0;
    inspectionCount: number = 0;

    constructor() {
    }

    static createAddOp(opArg: bigint) {
        return (old: bigint) => {
            return old + opArg;
        };
    }

    static createMultiplyOp(opArg: bigint) {
        return (old: bigint) => {
            return old * opArg;
        };
    }

    static createSquaredOp() {
        return (old: bigint) => {
            return old * old;
        };
    }

    public addItems(itemsString: string): void {
        // e.g. '61, 81, 84, 69, 77, 88'
        itemsString.split(/,\s/).map((item: string) => BigInt(parseInt(item)))
            .forEach((item: bigint) => this.addItem(item));
    }

    public addItem(item: bigint): void {
        this.items.push(item);
    }
}