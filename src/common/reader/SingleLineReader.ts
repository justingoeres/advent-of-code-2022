import {LinesReader} from './LinesReader';
import {DataReader} from './DataReader';
import fs from 'node:fs';

export class SingleLineReader implements DataReader{
    line: string = '';

    constructor(public filename: string) {
    }

    read(): void {
        this.line = fs
            .readFileSync(this.filename, {encoding: 'utf-8'})
            .trimEnd()
            .split('\n')[0]; // split at (the only) newline, and keep the single line of content
    }
}
