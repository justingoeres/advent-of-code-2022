import {Op, OpCode, OpCodeEnum} from './Op';

export class CPU {
    private readonly opCodeMap: Record<OpCodeEnum, OpCode>;
    public samples: number[] = [];
    public output: string = '';

    // cycles starting counting at *1*, not zero.
    constructor(public cycleCount: number = 1,
                public x: number = 1,
                private samplingIntervals: Set<number> = new Set([20, 60, 100, 140, 180, 220])) {
        this.opCodeMap = {
            [OpCodeEnum.noop]: new OpCode(1, this.noop),
            [OpCodeEnum.addx]: new OpCode(2, this.addx)
        };
    }

    execute(op: Op): void {
        // start of cycle / during cycle
        // consume the cycles and do any sampling
        const opCode = this.opCodeMap[op.opCode];
        for (let i = 0; i < opCode.cycleCount; i++) {
            if (this.samplingIntervals.has(this.cycleCount)) {
                // if it's time to sample, do that
                this.samples.push(this.cycleCount * this.x);
            }
            this.draw();
            this.cycleCount++;
        }
        // end of cycle, do the actual operation
        this.opCodeMap[op.opCode].execute(this, op);  // execute
    }

    draw(): void {
        // Fun facts:
        // * the sprite is 3 pixels wide, and the X register
        //   sets the horizontal position of the middle of that sprite
        // * the CRT draws a single pixel during each cycle
        // * If the sprite is positioned such that one of its three pixels is the pixel currently being drawn,
        //   the screen produces a lit pixel (#); otherwise, the screen leaves the pixel dark (.).
        const drawPos = (this.cycleCount - 1) % 40;
        const pixel: string =
            (drawPos >= this.x - 1 && drawPos <= this.x + 1) ? Pixel.ON : Pixel.OFF;
        this.output += pixel;
    }


    // ************** OP CODES ***************
    noop = (): void => {
    };

    addx = (cpu: CPU, op: Op): void => {
        cpu.x += op.arg;
    };
}

export enum Pixel {
    OFF = '⬛️',
    ON = '⬜️'
}
