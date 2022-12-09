import {RopeMove} from './RopeMove';
import {URDL, XYPoint} from '../../common/Directions';

export class LongRope {
    head: XYPoint;
    knots: XYPoint[] = [];
    tail: XYPoint;

    constructor() {
        const LENGTH: number = 10;
        // Generate the initial rope, all knots at the origin
        for (let i = 0; i < LENGTH; i++) {
            this.knots.push(XYPoint.ORIGIN());
        }
        this.head = this.knots[0];
        this.tail = this.knots[this.knots.length - 1];
    }

    doMove(move: RopeMove): void {
        // each rope move is a SINGLE step
        // Move the head
        this.head.moveRelative(move.direction);
        // Update all the trailing knots
        let prevKnot: XYPoint = this.head;
        this.knots.slice(1).forEach((knot) => {
            this.updateKnot(knot, prevKnot);
            prevKnot = knot;
        });
    }

    private updateKnot(knot: XYPoint, prevKnot: XYPoint): void {
        // move the knot to keep up with the prevKnot
        /*
            If the prevKnot is ever two steps directly up, down, left, or right from the knot,
            the knot must also move one step in that direction so it remains close enough.

            Otherwise, if the prevKnot and knot aren't touching and aren't in the same row or column,
            the knot always moves one step diagonally to keep up.
         */

        // calculate vertical & horizontal separation
        const vert = prevKnot.y - knot.y;
        const horiz = prevKnot.x - knot.x;

        // if prevKnot is directly above or below knot
        if (Math.abs(vert) > 1 && horiz == 0) knot.moveRelative(URDL.DOWN, Math.sign(vert));
        // else if prevKnot is directly right or left of knot
        else if (Math.abs(horiz) > 1 && vert == 0) knot.moveRelative(URDL.RIGHT, Math.sign(horiz));
        // else if prevKnot is diagonally away, more than one step in at least one direction
        else if (Math.abs(vert) > 1 || Math.abs(horiz) > 1) {
            knot.moveRelative(URDL.DOWN, Math.sign(vert));
            knot.moveRelative(URDL.RIGHT, Math.sign(horiz));
        }
    }
}

