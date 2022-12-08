import {Visibility} from './Visibility';

export class Tree {
    visibility: Visibility = Visibility.UNKNOWN;

    constructor(public height: number) {
        // default to visibility 'unknown'
    }
}