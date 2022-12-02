import fs from 'node:fs';
import {DataReader} from './DataReader';

export class CsvFileReader implements DataReader {
    data: string[][] = [];

    constructor(public filename: string, private delimiter: string) {
    }

    read(): void {
        this.data = fs
            .readFileSync(this.filename, {encoding: 'utf-8'})
            .trimEnd()
            .split('\n') // split by newlines
            .map((row: string): string[] => {
                return row.split(this.delimiter); // then by commas
            });
    }
}
