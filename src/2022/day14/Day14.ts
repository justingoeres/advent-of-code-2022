import {LinesReader} from '../../common/reader/LinesReader';
import {XYPoint} from '../../common/Directions';

export class Day14 {
    reader: LinesReader;
    input: any;
    rocks: Set<string> = new Set;
    xMax: number = 0;
    yMax: number = 0;
    xMin: number = Infinity;
    yMin: number = Infinity;
    private readonly source: string = XYPoint.keyOf(500, 0);

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInput();
    }

    doPart1(): number {
        /*
            How many units of sand come to rest before sand starts flowing into the abyss below?
        */

        return 0;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    parseInput(): void {
        const xyRegex = new RegExp(/(\d+),(\d+)/);
        this.reader.lines.forEach((line: string) => {
            let endpoints: string[] = line.split(' -> '); // split into pairs
            let endpointsXY: XYPoint[] = endpoints.map((endpoint: string): XYPoint => {
                const match = endpoint.match(xyRegex) as RegExpMatchArray;
                return new XYPoint(parseInt(match[1]), parseInt(match[2]));
            });
            while (endpointsXY.length > 1) {
                // make all the walls
                const xy1: XYPoint = endpointsXY.shift() as XYPoint;
                const xy2: XYPoint = endpointsXY[0];
                this.makeWall(xy1, xy2).forEach((xyKey: string) => this.rocks.add(xyKey));
            }
        });
        this.printRocks();
    }

    makeWall(xy1: XYPoint, xy2: XYPoint): Set<string> {
        const wallXYs: Set<string> = new Set;
        const isVertical = (xy1.x == xy2.x);
        if (isVertical) {
            // vertical
            const x0: number = xy1.x;
            const wallYMin = Math.min(xy1.y, xy2.y);
            const wallYMax = Math.max(xy1.y, xy2.y);
            for (let y = wallYMin; y <= wallYMax; y++) {
                wallXYs.add(new XYPoint(x0, y).keyString());
            }
            if (wallYMax > this.yMax) this.yMax = wallYMax;
            if (wallYMin < this.yMin) this.yMin = wallYMin;
        } else {
            // horizontal
            const y0: number = xy1.y;
            const wallXMin = Math.min(xy1.x, xy2.x);
            const wallXMax = Math.max(xy1.x, xy2.x);
            for (let x = wallXMin; x <= wallXMax; x++) {
                wallXYs.add(new XYPoint(x, y0).keyString());
            }
            if (wallXMax > this.xMax) this.xMax = wallXMax;
            if (wallXMin < this.xMin) this.xMin = wallXMin;
        }
        return wallXYs;
    }

    printRocks(): void {
        let output: string = '';
        for (let y = 0; y <= this.yMax; y++) {
            for (let x = this.xMin; x <= this.xMax; x++) {
                const xyKey: string = XYPoint.keyOf(x, y);
                if (this.rocks.has(xyKey)) output += '#';   // wall
                else if (false) output += 'o';  // sand
                else if (XYPoint.keyOf(x, y) == this.source) output += '+'; //source
                else output += '.';
            }
            output += '\n';
        }
        console.log(output);
    }
}
