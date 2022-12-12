export class Monkey {
    items: number[] = [];
    operation!: ((old: number) => number);
    test: number = 0;
    trueTarget: number = 0;
    falseTarget: number = 0;
    inspectionCount: number = 0;

    constructor() {
    }

    static createAddOp(opArg: number) {
        return (old: number) => {
            return old + opArg;
        };
    }

    static createMultiplyOp(opArg: number) {
        return (old: number) => {
            return old * opArg;
        };
    }

    static createSquaredOp() {
        return (old: number) => {
            return old * old;
        };
    }

    public addItems(itemsString: string): void {
        // e.g. '61, 81, 84, 69, 77, 88'
        itemsString.split(/,\s/).map((item: string) => parseInt(item))
            .forEach((item: number) => this.addItem(item));
    }

    public addItem(item: number): void {
        this.items.push(item);
    }
}