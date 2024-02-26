const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    //test 4 
    it("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect( function() { new Message();}).toThrow(new Error('Message name required.'));
    });

    // test 5 
    it("constructor sets a name", function () {
        const testMessage = new Message('n', 'c');
        expect(testMessage.name).toBe('n');
    });

    // test 6
    it("contains a commands array passed into the constructor as the 2nd argument", function () {
        const testMessage = new Message ('n', commands = ['test array']);
        // when npm test ran first time, they recommended replacing "toBe" with "toStrictEqual" - failed on "toBe", passed on "toStrictEqual"
        expect(testMessage.commands).toStrictEqual(['test array']);
    });

});
