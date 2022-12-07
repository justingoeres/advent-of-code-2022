import {LinesReader} from '../../common/reader/LinesReader';
import {Directory} from './Directory';
import {sumReduce} from '../../common/Utils';

export class Day07 {
    private reader: LinesReader;
    private root!: Directory;   // assigned during parsing
    private allDirs: Directory[] = [];

    constructor(inputFile: string) {
        this.reader = new LinesReader(inputFile);
        this.reader.read();
        this.parseInput();
    }

    doPart1(): number {
        /*
            Find all the directories with a total size of at most 100000.
            What is the sum of the total sizes of those directories?
        */

        // Go through all the directories and get their sizes, and add them up under the condition.
        const totalSize = this.allDirs.map((dir) => dir.calculateTotalSize())
            .filter((size) => size <= 100000)
            .reduce(sumReduce, 0);
        return totalSize;
    }

    doPart2(): number {
        /*
            The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000.
            You need to find a directory you can delete that will free up enough space to run the update.

            Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update.
            What is the total size of that directory?
        */
        const totalSpace: number = 70000000;
        const requiredSpace: number = 30000000;

        // Find how much free space we have by looking at the size of the root.
        const freeSpace: number = totalSpace - this.root.calculateTotalSize();
        const additionalNeeded: number = requiredSpace - freeSpace;

        // Now go through all the directories and find the SMALLEST one that is GREATER than additionalNeeded.
        let smallestFound: number = Infinity;
        this.allDirs.forEach((dir) => {
            const dirTotalSize: number = dir.calculateTotalSize();
            if (dirTotalSize >= additionalNeeded && dirTotalSize < smallestFound)
                smallestFound = dirTotalSize;
        });
        return smallestFound;
    }

    parseInput(): void {
        // Create the tree of Directories and their contents (children & files)

        // Regexes to match each thing.
        const cdUpRegex: RegExp = new RegExp(/^\$\scd\s\.\.$/);
        const cdRegex: RegExp = new RegExp(/^\$\scd\s(.*)/);
        const lsRegex: RegExp = new RegExp(/^\$ ls$/);
        const dirRegex: RegExp = new RegExp(/^dir (.*)/);
        const fileRegex: RegExp = new RegExp(/(\d+) (.*)/);

        let currentDir: Directory | undefined = undefined;  // start out as undefined
        for (const line of this.reader.lines) {
            // Figure out what kind of line this is, and handle it
            if (cdUpRegex.test(line) && currentDir) { // check for currentDir defined so the compiler is happy
                // $ cd ..
                // Go up to this dir's parent
                currentDir = currentDir.parent;
            } else if (cdRegex.test(line)) {
                // $ cd <some dir>
                // It's a cd, so create the directory (if necessary) and move to it
                const match = line.match(cdRegex) as RegExpMatchArray;
                const newLabel: string = match[1];
                if (currentDir) {
                    // add a new child with currentDir as its parent, and switch to it
                    let newDir: Directory = new Directory(newLabel, currentDir);
                    currentDir.addChildDir(newDir);
                    currentDir = newDir;
                } else {
                    // we're at the root, so create that
                    this.root = new Directory(newLabel); // parent is undefined for root
                    currentDir = this.root;
                }
                // Add the new dir to the set of everything
                this.allDirs.push(currentDir);
            } else if (lsRegex.test(line)) {
                // $ ls
                // We're going to list files; this is a no-op from the parser's perspective
            } else if (dirRegex.test(line)) {
                // dir <someDir>
                // Listing a child directory; this is also a no-op for the parser,
                // since we'll create the directory when we cd to it
            } else if (fileRegex.test(line)) {
                const match = line.match(fileRegex) as RegExpMatchArray;
                // create a file in this dir
                let fileSize = parseInt(match[1]);
                let fileName = match[2];
                currentDir?.addFile(fileName, fileSize);
            }
        }
    }

}
