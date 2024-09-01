import {validateWord} from "../apis.js"

describe('apis',() => {
    
    describe('validateWord',() =>{
        it("should return valid for the word hello", 
            async () => {
                const result = await validateWord("hello");
                expect(result).toBe("valid");
        })
    })

    describe('validateWord',() =>{
        it("should return invalid for the word fwefwefwe", 
            async () => {
                const result = await validateWord("fwefwefwe");
                expect(result).toBe("invalid");
        })
    })

})