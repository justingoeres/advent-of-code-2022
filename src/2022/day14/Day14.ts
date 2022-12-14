import {LinesReader} from '../../common/reader/LinesReader';
import {URDL, XYPoint} from '../../common/Directions';

export class Day14 {
    reader: LinesReader;
    input: any;
    rocks: Set<string> = new Set;
    sand: Set<string> = new Set;
    xMax: number = 0;
    yMax: number = 0;
    xMin: number = Infinity;
    yMin: number = Infinity;
    private readonly source: XYPoint;
    private readonly sourceKey: string;

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInput();
        this.source = new XYPoint(500, 0);
        this.sourceKey = this.source.keyString();
    }

    doPart1(): number {
        /*
            How many units of sand come to rest before sand starts flowing into the abyss below?
        */
        while (this.generate1Sand()) ;
        // print when done
        this.printCave();

        return this.sand.size;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }

    generate1Sand(): boolean {
        /* RULES
        Sand is produced one unit at a time, and the next unit of sand is not produced until the previous unit of sand comes to rest.

        A unit of sand always falls down one step if possible.
        If the tile immediately below is blocked (by rock or sand), the unit of sand attempts to instead move diagonally one step down and to the left.
        If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
        Sand keeps moving as long as it is able to do so,
         */
        const sand: XYPoint = new XYPoint(this.source.x, this.source.y); // start at the origin

        // move that sand!
        let isBlocked: boolean = false;
        while (!isBlocked) {
            // go until we can't go anymore
            if (!this.isBlocked((sand.getRelative(URDL.DOWN) as XYPoint).keyString())) {
                // Try DOWN
                sand.moveRelative(URDL.DOWN);
            } else if (!this.isBlocked(((sand
                // Try DOWN-LEFT
                .getRelative(URDL.DOWN) as XYPoint)
                .getRelative(URDL.LEFT) as XYPoint).keyString())) {
                sand.moveRelative(URDL.DOWN).moveRelative(URDL.LEFT);
            } else if (!this.isBlocked(((sand
                // Try DOWN-RIGHT
                .getRelative(URDL.DOWN) as XYPoint)
                .getRelative(URDL.RIGHT) as XYPoint).keyString())) {
                sand.moveRelative(URDL.DOWN).moveRelative(URDL.RIGHT);
            } else {
                // we're blocked!
                isBlocked = true;
            }
            // Check to see if the sand is falling into the abyss.
            // Is its x-coordinate outside the boundary, or its y-coordinate greater than our max?
            // if (!(sand.x >= this.xMin
            //     && sand.x <= this.xMax
            //     && sand.y <= this.yMax)) {
            if (!(sand.x >= 0
                && sand.x <= 600
                && sand.y <= 200)) {
                // out of bounds, stop & return
                console.log('*** Sand falls into the abyss at ' + sand.toString());
                return false;
            }
        }
        // once we're blocked, stop moving and place the sand
        this.sand.add(sand.keyString());

        // if (this.sand.size % 100 == 0) {
        //     this.printCave();
        // }
        // since this sand stopped, keep adding more!
        return true;
    }

    isBlocked(targetKey: string): boolean {
        return this.rocks.has(targetKey) || this.sand.has(targetKey);
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
        this.printCave();
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

    printCave(): void {
        let output: string = '';
        for (let y = 0; y <= this.yMax; y++) {
            for (let x = this.xMin; x <= this.xMax; x++) {
                const xyKey: string = XYPoint.keyOf(x, y);
                if (this.rocks.has(xyKey)) output += '#';   // wall
                else if (this.sand.has(xyKey)) output += '=';  // sand
                else if (XYPoint.keyOf(x, y) == this.sourceKey) output += '+'; //source
                else output += '.';
            }
            output += '\n';
        }
        output += 'xMin: ' + this.xMin + '\txMax: ' + this.xMax + '\n';
        output += 'yMin: ' + this.yMin + '\tyMax: ' + this.yMax + '\n';
        output += 'Sand: ' + this.sand.size;
        console.log(output);
    }
}
