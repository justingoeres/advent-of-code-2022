export class Rucksack {
    private comp1: string;
    private comp2: string;

    constructor(contents: string) {
        // Split the contents into the two (equal) compartments
        const length = contents.length;
        this.comp1 = contents.substring(0, length / 2);
        this.comp2 = contents.substring(length / 2);
    }

}