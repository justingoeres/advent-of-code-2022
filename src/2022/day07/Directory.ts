import {sumReduce} from '../../common/Utils';

export class Directory {
    children?: Map<string, Directory>;
    files: Map<string, number> = new Map;
    size: number = 0;

    constructor(public label: string, public parent?: Directory) {
    }

    addFile(name: string, size: number): void {
        this.files.set(name, size);
        // Keep track of the dir size as we go
        this.size += size;
    }

    addChildDir(child: Directory): void {
        if (!this.children) {
            this.children = new Map;
        }
        this.children.set(child.label, child);
    }

    calculateTotalSize(): number {
        // Drill down through this directory and all its children to find the total size
        if (this.children) {
            // if this directory has children, calculate their sizes
            let childrenTotal: number = Array.from(this.children.values())
                .map((dir) => dir.calculateTotalSize())
                .reduce(sumReduce);
            return childrenTotal + this.size;
        } else {
            return this.size;
        }
    }
}