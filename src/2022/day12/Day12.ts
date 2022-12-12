import {LinesReader} from '../../common/reader/LinesReader';
import {XYPoint} from '../../common/Directions';
import {MtnPoint} from './MtnPoint';

export class Day12 {
    private static readonly heightIndex: string = 'abcdefghijklmnopqrstuvwxyz';
    reader: LinesReader;
    start!: MtnPoint;
    end!: MtnPoint;
    endKeyString!: string;
    mountain: Map<string, MtnPoint> = new Map;

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInputPart1();
    }

    doPart1(): number {
        /*
            What is the fewest steps required to move from your current position to the location that should get the best signal?
        */

        const visitedPoints: Map<string, number> = new Map;
        let activePoints: Set<MtnPoint> = new Set;
        let nextActivePoints: Set<MtnPoint> = new Set;
        let stepCount: number = 0;

        // start at the beginning!
        activePoints.add(this.start);

        let found: boolean = false;
        while (!found) {
            // go until we're done
            // for each of the 'active' points we're evaluating
            let debug: string = '*** Step: ' + stepCount + '\n';
            for (const mtnPoint of activePoints) {
                // mark this point visited
                const currentHeight = mtnPoint.height;
                visitedPoints.set(mtnPoint.keyString(), stepCount);
                // get all its (unvisited) neighbors
                const unvisited: XYPoint[] = mtnPoint.xy.getAllNeighbors()
                    .filter((xy: XYPoint) => {
                        const neighbor = xy;
                        const neighborKey = neighbor.keyString();
                        const neighborMtnPoint = this.mountain.get(neighborKey) as MtnPoint;
                        return !visitedPoints.has(neighborKey)
                            && neighborMtnPoint
                            && neighborMtnPoint.height <= (currentHeight + 1);
                    });
                debug += mtnPoint.toString();
                // schedule them all for the next step
                unvisited.forEach((xy: XYPoint) => {
                    const nextMtnPoint = this.mountain.get(xy.keyString()) as MtnPoint;
                    if (nextMtnPoint.height == (this.mountain.get(this.endKeyString) as MtnPoint).height) {
                        debug += '****************** WE FOUND IT ******************\n';
                        found = true;
                    }
                    debug += '\t' + nextMtnPoint.toString();
                    nextActivePoints.add(nextMtnPoint);
                });
                console.log(debug + 'Found is ' + found + '\n');
                debug = '';
            }
            // update the step counter
            stepCount++;
            // swap the 'active' & 'nextActive'
            const temp = activePoints;
            activePoints = nextActivePoints;
            nextActivePoints = temp;
            nextActivePoints.clear();
        }
        // Now that we've got the path, print it out going backwards to the Start
        return stepCount;
    }

    doPart2(): number {
        /*
            DESCRIPTION
        */
        return 0;
    }


    parseInputPart1(): void {
        this.reader.lines.forEach((line: string, j) => line.split('').forEach((char: string, i) => {
            const height: number = Day12.heightIndex.search(char);
            if (height >= 0) {
                // store the height of this point
                const mtnPoint: MtnPoint = new MtnPoint(i, j, height);
                this.mountain.set(mtnPoint.keyString(), mtnPoint);
            } else {
                // else it's the start or finish
                if (char == 'S') {
                    this.start = new MtnPoint(i, j, 0);
                } else {
                    this.end = new MtnPoint(i, j, 25);
                    this.mountain.set(this.end.keyString(), this.end);
                    this.endKeyString = this.end.keyString();
                }
            }
        }));
    }
}


