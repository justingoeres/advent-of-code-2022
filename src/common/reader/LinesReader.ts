import {DataReader} from './DataReader';
import fs from 'node:fs';

export class LinesReader implements DataReader {
    lines: string[] = [];

    constructor(public filename: string) {
    }

    read(): void {
        this.lines = fs
            .readFileSync(this.filename, {encoding: 'utf-8'})
            .trimEnd()
            .split('\n'); // split by newlines
        // .map((row: string): string[] => {
        //     return row.split(','); // then by commas
        // });
    }
}