import {XYPoint} from '../../common/Directions';

export class MtnPoint {
    xy: XYPoint;

    constructor(public x: number, public y: number, public height: number) {
        this.xy = new XYPoint(x, y);
    }

    keyString(): string {
        return this.xy.keyString();
    }

    toString(): string {
        return this.xy.toString() + ' height: ' + this.height + '\n'
    }
}