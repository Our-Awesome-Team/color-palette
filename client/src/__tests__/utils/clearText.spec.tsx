import { onlyText } from "../../utils/string/clearText"

describe("clearText", () => {
    it("Should return clear text", () => {
        expect(onlyText('It<div> is</div>', 152)).toBe('It is...')
    })
})