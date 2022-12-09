import {RopeMove} from './RopeMove';
import {URDL, XYPoint} from '../../common/Directions';

export class Rope {
    constructor(public head: XYPoint = XYPoint.ORIGIN(),
                public tail: XYPoint = XYPoint.ORIGIN()) {
    }

    doMove(move: RopeMove): void {
        // each rope move is a SINGLE step
        this.head.moveRelative(move.direction);
        this.updateTail();
    }

    private updateTail(): void {
        // move the tail to keep up with the head
        /*
            If the head is ever two steps directly up, down, left, or right from the tail,
            the tail must also move one step in that direction so it remains close enough.

            Otherwise, if the head and tail aren't touching and aren't in the same row or column,
            the tail always moves one step diagonally to keep up.
         */

        // calculate vertical & horizontal separation
        const vert = this.head.y - this.tail.y;
        const horiz = this.head.x - this.tail.x;

        // if head is directly above or below tail
        if (Math.abs(vert) > 1 && horiz == 0) this.tail.moveRelative(URDL.DOWN, Math.sign(vert));
        // else if head is directly right or left of tail
        else if (Math.abs(horiz) > 1 && vert == 0) this.tail.moveRelative(URDL.RIGHT, Math.sign(horiz));
        // else if head is diagonally away, more than one step in at least one direction
        else if (Math.abs(vert) > 1 || Math.abs(horiz) > 1) {
            this.tail.moveRelative(URDL.DOWN, Math.sign(vert));
            this.tail.moveRelative(URDL.RIGHT,Math.sign(horiz))
        }
    }
}

