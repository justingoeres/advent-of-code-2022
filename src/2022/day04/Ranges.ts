import {ElfRange} from './ElfRange';

export class Ranges {

    private elf1: ElfRange;
    private elf2: ElfRange;

    constructor(line: string) {
        const regex: RegExp = new RegExp(/(\d+)-(\d+),(\d+)-(\d+)/);
        const match = line.match(regex) as RegExpMatchArray;
        this.elf1 = new ElfRange(parseInt(match[1]), parseInt(match[2]));
        this.elf2 = new ElfRange(parseInt(match[3]), parseInt(match[4]));
    }

    hasContainment(): boolean {
        // return true if either of these ranges fully contains the other
        return this.elf1.containsRange(this.elf2)
            || this.elf2.containsRange(this.elf1);
    }

    hasOverlap(): boolean {
        return this.elf1.overlaps(this.elf2) || this.hasContainment();
    }
}