export enum URDL {
    UP = 'U',
    RIGHT = 'R',
    DOWN = 'D',
    LEFT = 'L'
}

export class XYPoint {
    static ORIGIN(): XYPoint {
        return new XYPoint(0, 0);
    }

    constructor(public x: number, public y: number) {
    }

    moveRelative(direction: URDL, distance: number = 1): XYPoint {
        switch (direction) {
            // down is positive
            case URDL.UP:
                this.y -= distance;
                break;
            case URDL.RIGHT:
                this.x += distance;
                break;
            case URDL.DOWN:
                this.y += distance;
                break;
            case URDL.LEFT:
                this.x -= distance;
                break;
        }
        return this;
    }

    hashCode(): number {

        // return (this.x + this.y) * (this.x + this.y + 1)/2;
        return (this.x << 8) + this.y;
    }
}