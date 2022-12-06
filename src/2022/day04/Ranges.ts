import {ElfRange} from './ElfRange';

export class Ranges {
    private readonly elf1: ElfRange;
    private readonly elf2: ElfRange;

    constructor(elf1Min: number, elf1Max: number, elf2Min: number, elf2Max: number) {
        this.elf1 = new ElfRange(elf1Min, elf1Max);
        this.elf2 = new ElfRange(elf2Min, elf2Max);
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
