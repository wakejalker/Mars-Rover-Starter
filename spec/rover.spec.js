const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  // test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    const testRover = new Rover();

    expect(testRover.position).toBe(undefined);
    expect(testRover.mode).toBe('NORMAL')
    expect(testRover.generatorWatts).toBe(110);
  });

  // test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    const testRover = new Rover(98382);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const testMessage = new Message("Testing Status Check Message", commands);

    const response = testRover.receiveMessage(testMessage);

    expect(response.message).toBe("Testing Status Check Message");
  });

  // test 9 
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const testRover = new Rover(98382);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const testMessage = new Message("Message with two commands: ", commands);

    const response = testRover.receiveMessage(testMessage);

    expect(response.results.length).toBe(2);
  });

  // test 10
  it("responds correctly to the status check command", function () {
    const commands = [new Command("STATUS_CHECK")];
    const testMessage = new Message("Name of test message: ", commands);
    const testRover = new Rover(98382);

    const response = testRover.receiveMessage(testMessage);

    expect(response.results[0]).toHaveProperty('roverStatus');
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  }); 

  // test 11 
  it("responds correctly to the mode change command", function () {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const testMessage = new Message("Test 'MODE_CHANGE' command", commands);
    const testRover = new Rover(98392);

    const response = testRover.receiveMessage(testMessage);

    expect(response.results[0].completed).toBe(true);
    expect(testRover.mode).toBe('LOW_POWER');
  })

});

//test 12 
it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
  const testRover = new Rover(98392, 'LOW_POWER');
  const testRoverPosition = testRover.position;
  const moveCommand = new Command('MOVE', 87281);
  const testMessage = new Message("Test 'MOVE' command in LOW_POWER mode", [moveCommand]);

  const response = testRover.receiveMessage(testMessage);

  expect(response.results[0].completed).toBe(false);
  expect(testRover.position).toBe(testRoverPosition);
});

// test 13
it("responds with the position for the move command", function () {
  const testRover = new Rover(98392);
  const moveCommand = new Command('MOVE', 87281);
  const testMessage = new Message("Test 'MOVE' command response", [moveCommand]);

  const response = testRover.receiveMessage(testMessage);

  expect(response.results[0].completed).toBe(true);
  expect(testRover.position).toBe(87281)
});