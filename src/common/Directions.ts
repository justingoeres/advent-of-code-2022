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

    getRelative(direction: URDL, distance: number = 1): XYPoint | undefined {
        switch (direction) {
            // down is positive
            case URDL.UP:
                return new XYPoint(this.x, this.y - distance);
            case URDL.RIGHT:
                return new XYPoint(this.x + distance, this.y);
            case URDL.DOWN:
                return new XYPoint(this.x, this.y + distance);
            case URDL.LEFT:
                return new XYPoint(this.x - distance, this.y);
        }
        return undefined;
    }

    getAllNeighbors(): XYPoint[] {
        const neighbors: XYPoint[] = Object.values(URDL).map((dir) => this.getRelative(dir)) as XYPoint[];
        return neighbors;
    }

    keyString(): string {
        return JSON.stringify(this);
    }

    static keyOf(x: number, y: number): string {
        return JSON.stringify({'x': x, 'y': y});
    }

    toString(): string {
        return '(' + this.x + ', ' + this.y + ')';
    }
}