import {Ranges} from './Ranges';

export class ElfRange {
    constructor(public min: number,
                public max: number) {
    }

    containsRange(other: ElfRange): boolean {
        // this range contains the 'other' if
        // both the max & min of 'other' fall within
        // max & min of 'this'
        return this.containsValue(other.min)
            && this.containsValue(other.max);
    }

    overlaps(other: ElfRange): boolean {
        // this range overlaps the 'other' if
        // *either* the max or min of 'other' falls
        // within 'this'
        return this.containsValue(other.min)
            || this.containsValue(other.max);
    }

    containsValue(val: number): boolean {
        return (this.min <= val && val <= this.max);
    }

}