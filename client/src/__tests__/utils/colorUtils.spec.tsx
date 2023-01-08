import { colourIsLight, hexToRgb } from "../../utils/colorUtils";

describe('colorUtils', () => {
    describe("hexToRgb", () => {
        it("Shoul convert white hex to all 255 rgb", () => {
            expect(hexToRgb("#ffffff")).toEqual({
                r: 255,
                g: 255,
                b: 255,
            })
        })
        it("Shoul convert #d3d3d3 hex to all 211 rgb", () => {
            expect(hexToRgb("#d3d3d3")).toEqual({
                r: 211,
                g: 211,
                b: 211,
            })
        })
        it("Shoul convert unknown hex to all 255 rgb", () => {
            expect(hexToRgb("#unknown")).toEqual({
                r: 255,
                g: 255,
                b: 255,
            })
        })
    })
    describe("colourIsLight", () => {
        it("Should recognize all 211 rgb as light tint", () => {
            expect(colourIsLight({
                r: 211,
                g: 211,
                b: 211,
            })).toBe(true)
        })
        it("Should recognize all 31 rgb as dark tint", () => {
            expect(colourIsLight({
                r: 31,
                g: 31,
                b: 31,
            })).toBe(false)
        })
    })
});


