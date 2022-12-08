import {InputReader} from '../../common/reader/InputReader';
import {Tree} from './Tree';
import {Visibility} from './Visibility';

export class Day08 {
    reader: InputReader<Tree[]>;

    constructor(inputFile: string) {
        this.reader = new InputReader<Tree[]>(inputFile, new Day08Parser());
        this.reader.read();
        // this.parseInputPart1();
    }

    doPart1(): number {
        /*
            How many trees are visible from outside the grid?
        */
        // from the left & right
        // this.printHeights(this.reader.input);
        this.reader.input.forEach((row: Tree[]) => {
            this.calculateVisibilities(row);
            this.calculateVisibilities(row.reverse());
            // have to un-reverse the row when we're done
            row.reverse();
        });
        // this.printForest(this.reader.input);
        // from the top & bottom
        // go by columns
        for (let col = 0; col < this.reader.input[0].length; col++) {
            const column: Tree[] = this.reader.input.map((row: Tree[]) => row[col]);
            this.calculateVisibilities(column);
            // this.printForest(this.reader.input);
            this.calculateVisibilities(column.reverse());
            // this.printForest(this.reader.input);
        }
        // this.printForest(this.reader.input);

        // count the visible trees
        let visibleCount: number = 0;
        this.reader.input.forEach((row: Tree[]) => row.forEach((tree: Tree) => {
            if (tree.visibility == Visibility.VISIBLE) {
                visibleCount++;
            }
        }));
        return visibleCount;
    }

    doPart2(): number {
        /*
            What is the highest scenic score possible for any tree?
        */
        let maxScore: number = 0;
        // Check every tree row x column
        for (let rowIdx = 0; rowIdx < this.reader.input[0].length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.reader.input[0].length; colIdx++) {
                const totalScore = this.calculateScore(rowIdx, colIdx);
                if (totalScore > maxScore) maxScore = totalScore;
            }
        }
        return maxScore;
    }

    doPart2Spiral(): number {
        // start in the center
        const forestSize = this.reader.input[0].length;
        const forestXYMax = forestSize - 1;
        const startXY: number = (forestSize - 1) / 2;

        let maxScore: number = 0;
        // move up and outward, doing a box at each step
        for (let xy0 = startXY; xy0 >= 0; xy0--) {
            let xyMax: number = forestXYMax - xy0;
            // go across the top
            for (let colIdx = xy0; colIdx <= xyMax; colIdx++) {
                if (this.theoreticalMaxScore(colIdx, xy0, forestSize) > maxScore) {
                    // horizontally
                    const totalScore = this.calculateScore(colIdx, xy0);
                    if (totalScore > maxScore) maxScore = totalScore;
                }
            }
            // go across the bottom
            for (let colIdx = xy0; colIdx <= xyMax; colIdx++) {
                if (this.theoreticalMaxScore(colIdx, xyMax, forestSize) > maxScore) {
                    const totalScore = this.calculateScore(xyMax, colIdx);
                    if (totalScore > maxScore) maxScore = totalScore;
                }
            }
            // go down the left
            for (let rowIdx = xy0; rowIdx <= xyMax; rowIdx++) {
                if (this.theoreticalMaxScore(xy0, rowIdx, forestSize) > maxScore) {
                    const totalScore = this.calculateScore(rowIdx, xy0);
                    if (totalScore > maxScore) maxScore = totalScore;
                }
            }
            // go down the right
            for (let rowIdx = xy0; rowIdx <= xyMax; rowIdx++) {
                if (this.theoreticalMaxScore(rowIdx, xyMax, forestSize) > maxScore) {
                    const totalScore = this.calculateScore(rowIdx, xyMax);
                    if (totalScore > maxScore) maxScore = totalScore;
                }
            }
        }
        return maxScore;
    }

    private calculateScore(x: number, y: number) {
        // horizontally
        const row: Tree[] = this.reader.input[x];
        const xScore: number = this.calculateScore1Axis(row, y);
        // vertically
        const column: Tree[] = this.reader.input.map((row: Tree[]) => row[y]);
        const yScore: number = this.calculateScore1Axis(column, x);

        const totalScore: number = xScore * yScore;
        return totalScore;
    }

    calculateVisibilities(trees: Tree[]): void {
        // work through the given line of trees,
        // keeping track of the max height we've seen and updating visibilities as we go
        let maxHeight: number = -1;
        for (const tree of trees) {
            if (tree.visibility != Visibility.VISIBLE) {
                // if this tree is not *already* known to be visible
                // then it's visible along the current line if it's > maxHeight so far
                tree.visibility = (tree.height > maxHeight) ? Visibility.VISIBLE : Visibility.NOT_VISIBLE;
            }
            // update the maxHeight
            maxHeight = Math.max(maxHeight, tree.height);
        }
    }

    theoreticalMaxScore(x: number, y: number, size: number): number {
        // Calculate the score for this x,y pair if it had full visibility in every direction
        const x0: number = x;
        const x1: number = (size - 1) - x;
        const y0: number = y;
        const y1: number = (size - 1) - y;

        const maxScore = x0 * x1 * y0 * y1;
        return maxScore;
    }

    calculateScore1Axis(trees: Tree[], i: number) {
        // if it's on an edge, don't bother
        if (i == 0 || i == trees.length - 1) return 0;

        // otherwise, calculate
        const currentTree = trees[i];
        // look "positive"
        let rightDistance = 0;
        for (let j = i + 1; j < trees.length; j++) {
            rightDistance++;
            if (trees[j].height >= currentTree.height) break;
        }
        // look "negative"
        let leftDistance = 0;
        for (let j = i - 1; j >= 0; j--) {
            leftDistance++;
            if (trees[j].height >= currentTree.height) break;
        }
        return rightDistance * leftDistance;
    }

    printForest(forest: Tree[][]) {
        let output: string = '';
        for (const treeRow of forest) {
            for (const tree of treeRow) {
                output += tree.visibility;
            }
            output += '\n';
        }
        console.log(output);
    }

    printHeights(forest: Tree[][]) {
        let output: string = '';
        for (const treeRow of forest) {
            for (const tree of treeRow) {
                output += tree.height;
            }
            output += '\n';
        }
        console.log(output);
    }
}

class Day08Parser implements AoCParser<Tree[]> {
    parseLine(line: string): Tree[] {
        // Pattern to match on each line
        const regex: RegExp = new RegExp(/\d/g);
        // Do the match
        const matches = (line.match(regex) as RegExpMatchArray);
        // Create an array of Trees from each line of input
        return matches.map((height: string) => new Tree(parseInt(height)));
    }
}