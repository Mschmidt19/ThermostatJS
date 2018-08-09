'use strict';

function Thermostat () {
  this.temperature = 20;
  this.minimumTemp = 10;
  this.powerSaveMode = "ON";
  this.maximumTemp = function() {
    if (this.powerSaveMode === "ON") {
      return 25;
    }
    else {
      return 32;
    };
  };
};

Thermostat.prototype.up = function (amount) {
  if ((this.temperature + amount) > this.maximumTemp()) {
    throw new Error("Power Save is " + this.powerSaveMode + ". Maximum temperature is " + this.maximumTemp() + " degrees");
  }
  else {
    this.temperature += amount;
  };
};

Thermostat.prototype.down = function (amount) {
  if ((this.temperature - amount) < this.minimumTemp) {
    throw new Error("Minimum temperature is 10 degrees");
  }
  else {
    this.temperature -= amount;
  }
};

Thermostat.prototype.setTempTo25 = function () {
  this.temperature = 25;
};

Thermostat.prototype.powerSaveSwitch = function () {
  if (this.powerSaveMode === "ON") {
    this.powerSaveMode = "OFF";
  }
  else {
    if (this.temperature > 25) {
      this.setTempTo25();
      this.powerSaveMode = "ON";
    }
    else {
      this.powerSaveMode = "ON";
    }
  }
};

Thermostat.prototype.reset = function () {
  this.temperature = 20;
};


Thermostat.prototype.energyUsage = function () {
  if (this.temperature < 18) {
    return "Low";
  }
  else if (this.temperature < 25) {
    return "Medium";
  }
  else {
    return "High";
  };
};
