class Rover {
  constructor(position = 0) {
    this.position = position;
    this.mode = "NORMAL";
    this.completed = true;
    this.generatorWatts = 110;
  }

  changeMode(newMode) {
    if (newMode === "LOW_POWER" || newMode === "NORMAL") {
      this.mode = newMode;
      this.completed = true;
    } else {
      this.completed = false;
    }
  }

  move(newPosition) {
    if (this.mode === "LOW_POWER") {
      this.completed = false;
    } else {
      this.position = newPosition;
      this.completed = true;
    }
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: [],
    };

    // loop over commands
    for (let command of message.commands) {
      if (command.commandType === "MODE_CHANGE") {
        this.changeMode(command.value);
    // push to results array
        response.results.push({ completed: this.completed });
      } else if (command.commandType === "MOVE") {
        this.move(command.value);
        response.results.push({ completed: this.completed });
    // otherwise push status check object into results array
      } else {
        if (command.commandType === "STATUS_CHECK") {
          response.results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position,
            },
          });
        } else {
          console.error("Command type not recognized:", command.commandType);
        }
      }
    }

    return response;
  }
}

module.exports = Rover;
