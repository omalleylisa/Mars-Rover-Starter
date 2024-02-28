const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {

  // TEST 7

  it("constructor sets position and default values for mode and generatorWatts", function () {
    let position = 55;
    let rover = new Rover(position);

    expect(rover.position).toEqual(position);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  // TEST 8

  it("response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover();
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("Test message");
  });

  // TEST 9

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(1234);
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 5000)];
    let message = new Message("Test message with two commands ", commands);
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(2);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toEqual("LOW_POWER");
    expect(response.results[1].completed).toBe(false);
    expect(rover.position).toEqual(1234);
  });

  // TEST 10

  it("responds correctly to the status check command", function () {
    let initialPosition = 800;
    let rover = new Rover(initialPosition);

    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Status check test", commands);

    let response = rover.receiveMessage(message);

    expect(response.results.length).toBe(1);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus).toBeDefined();
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(initialPosition);
  });

  // TEST 11

  it("responds correctly to the mode change command", function () {
    let rover = new Rover();
    rover.changeMode("LOW_POWER");

    expect(rover.mode).toEqual("LOW_POWER");
    expect(rover.completed).toEqual(true);

  });

  // TEST 12

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let initialPosition = 12;
    let rover = new Rover(initialPosition);
    rover.changeMode("LOW_POWER");

    let newPosition = 15;
    rover.move(newPosition);

    expect(rover.completed).toEqual(false);
    expect(rover.position).toEqual(initialPosition);
  });

  // TEST 13

  it("responds with the position for the move command", function () {
    let rover = new Rover();
    let newPosition = 55;

    rover.move(newPosition);

    expect(rover.position).toEqual(newPosition);
    expect(rover.completed).toBe(true);
  });
});
