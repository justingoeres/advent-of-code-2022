export class RpsResult {

    constructor(private _p1points: number, private _p2points: number) {
    }

    update(p1Change: number, p2Change: number) {
        this._p1points += p1Change;
        this._p2points += p2Change;
    }

    get p1points(): number {
        return this._p1points;
    }

    get p2points(): number {
        return this._p2points;
    }
}