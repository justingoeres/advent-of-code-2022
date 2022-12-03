export class Rucksack {
    private comp1: string;
    private comp2: string;

    constructor(public contents: string) {
        // Split the contents into the two (equal) compartments
        const length = contents.length;
        this.comp1 = contents.substring(0, length / 2);
        this.comp2 = contents.substring(length / 2);
    }

    findItemMatch(): string {
        // Use comp1 as a regex to match against comp2
        const regex: RegExp = new RegExp('[' + this.comp1 + ']');
        const match: RegExpMatchArray = this.comp2.match(regex) as RegExpMatchArray;

        // There will always be exactly one match
        return match[0] as string;
    }

    findCommonItems(other: Rucksack): string {
        // use 'this' as a regexp against 'other'
        const regex: RegExp = new RegExp('([' + other.contents + '])+','g');
        const match: RegExpMatchArray = this.contents.match(regex) as RegExpMatchArray;

        return match.join('') as string;
    }

}