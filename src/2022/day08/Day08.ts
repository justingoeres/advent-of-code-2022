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
        this.printHeights(this.reader.input);
        this.reader.input.forEach((row: Tree[]) => {
            this.calculateVisibilities(row);
            this.calculateVisibilities(row.reverse());
            // have to un-reverse the row when we're done
            row.reverse();
        });
        this.printForest(this.reader.input);

        // from the top & bottom
        // go by columns
        for (let col = 0; col < this.reader.input[0].length; col++) {
            const column: Tree[] = this.reader.input.map((row: Tree[]) => row[col]);
            this.calculateVisibilities(column);
            // this.printForest(this.reader.input);
            this.calculateVisibilities(column.reverse());
            // this.printForest(this.reader.input);
        }
        this.printForest(this.reader.input);

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
            DESCRIPTION
        */
        return 0;
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