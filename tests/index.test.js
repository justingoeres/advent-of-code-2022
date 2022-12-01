"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('testing index file', () => {
    test('empty string should result in zero', () => {
        expect((0, index_1.add)('')).toBe(0);
    });
});
