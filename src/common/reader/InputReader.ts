import {DataReader} from './DataReader';
import fs from 'node:fs';

export class InputReader<T> implements DataReader {
    private _input: T[] = [];

    constructor(public filename: string, private parser: AoCParser<T>) {
    }

    read(): void {
        this._input = fs
            .readFileSync(this.filename, {encoding: 'utf-8'})
            .trimEnd()
            .split('\n') // split by newlines
            .map((line: string): T => this.parser.parseLine(line));
    }

    get input(): T[] {
        return this._input;
    }
}