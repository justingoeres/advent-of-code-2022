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
        // let skipCount = 0;
        let maxScore: number = 0;
        for (let rowIdx = 0; rowIdx < this.reader.input[0].length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.reader.input[0].length; colIdx++) {
                // horizontally
                const row: Tree[] = this.reader.input[rowIdx];
                const xScore: number = this.calculateScore1Axis(row, colIdx);
                // vertically
                const column: Tree[] = this.reader.input.map((row: Tree[]) => row[colIdx]);
                const yScore: number = this.calculateScore1Axis(column, rowIdx);

                const totalScore: number = xScore * yScore;
                if (totalScore > maxScore) maxScore = totalScore;
            }
        }
        return maxScore;
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

    calculateScore1Axis(trees: Tree[], i: number) {
        // if it's on an edge, don't bother
        if (i == 0 || i == trees.length - 1) return 0;

        // otherwise, calculate
        const currentTree = trees[i];
        // look "right"
        let rightDistance = 0;
        for (let j = i + 1; j < trees.length; j++) {
            rightDistance++;
            if (trees[j].height >= currentTree.height) break;
        }
        // look "left"
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