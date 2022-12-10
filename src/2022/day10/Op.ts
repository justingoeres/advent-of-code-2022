import {CPU} from './CPU';

export class Op {
    constructor(public opCode: OpCodeEnum, public arg: number) {
    }
}

export class OpCode {
    constructor(public cycleCount: number, public execute: (cpu: CPU, op: Op) => void) {
    }
}

export enum OpCodeEnum {
    noop = 'noop',
    addx = 'addx'
}

