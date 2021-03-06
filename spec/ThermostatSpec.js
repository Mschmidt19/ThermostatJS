'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('tests for temperature', function() {

    it('temperature starts at 20 degrees', function() {
      expect(thermostat.temperature).toEqual(20);
    });

    describe('#up', function() {
      it('raises temperature', function() {
        thermostat.up(2);
        expect(thermostat.temperature).toEqual(22);
      });
      it('throws an an error if attempting to raise above maximumTemp in powerSaveMode', function() {
        expect( function(){thermostat.up(12);} ).toThrow(new Error("Power Save is ON. Maximum temperature is 25 degrees"));
      });
      it('throws an an error if attempting to raise above maximumTemp not in powerSaveMode', function() {
        thermostat.powerSaveSwitch();
        expect( function(){thermostat.up(12);} ).not.toThrow(new Error("Power Save is OFF. Maximum temperature is 32 degrees"));
        expect( function(){thermostat.up(15);} ).toThrow(new Error("Power Save is OFF. Maximum temperature is 32 degrees"));
      });
    });

    describe('#down', function() {
      it('lowers temperature', function() {
        thermostat.down(3);
        expect(thermostat.temperature).toEqual(17);
      });
      it('throws an an error if attempting to lower below minimumTemp', function() {
        expect( function(){thermostat.down(12);} ).toThrow(new Error("Minimum temperature is 10 degrees"));
      });
    });

    describe('#minimumTemp', function() {
      it('has a minimum temperature of 10 degrees', function() {
        expect(thermostat.minimumTemp).toEqual(10);
      });
    });

    describe('#maximumTemp', function() {
      it('temperature has a maximum of 25 when in power save mode', function() {
        expect(thermostat.maximumTemp()).toEqual(25);
      });
      it('temperature has a maximum of 32 when not in power save mode', function() {
        thermostat.powerSaveSwitch();
        expect(thermostat.maximumTemp()).toEqual(32);
      });
    });

    describe('#reset', function() {
      it('resets temperature to 20', function () {
        thermostat.up(4);
        expect(thermostat.temperature).toEqual(24);
        thermostat.reset();
        expect(thermostat.temperature).toEqual(20);
      });
    });

    describe('#setTempTo25', function() {
      it('sets temperature to 25, when below 25', function () {
        expect(thermostat.temperature).toEqual(20);
        thermostat.setTempTo25();
        expect(thermostat.temperature).toEqual(25);
      });
      it('sets temperature to 25, when above 25', function () {
        thermostat.powerSaveSwitch()
        thermostat.up(10)
        expect(thermostat.temperature).toEqual(30);
        thermostat.setTempTo25();
        expect(thermostat.temperature).toEqual(25);
      });
    });

  });

  describe('Tests for power save mode', function() {

    describe('#powerSaveMode', function() {
      it('starts in power save mode', function() {
        expect(thermostat.powerSaveMode).toEqual("ON");
      });
    });

    describe('#powerSaveSwitch', function() {
      it('changes powerSaveMode to false if currently true', function() {
        thermostat.powerSaveSwitch();
        expect(thermostat.powerSaveMode).toEqual("OFF");
      });
      it('changes powerSaveMode to true if currently false', function() {
        thermostat.powerSaveSwitch();
        thermostat.powerSaveSwitch();
        expect(thermostat.powerSaveMode).toEqual("ON");
      });
      it('resets temperature to 25 if currently above 25', function() {
        thermostat.powerSaveSwitch();
        thermostat.up(10);
        expect(thermostat.temperature).toEqual(30);
        thermostat.powerSaveSwitch();
        expect(thermostat.temperature).toEqual(25);
      })
    });

  });

  describe('Tests for energy usage', function() {

    describe('#energyUsage', function(){
      it('returns "low" if temperature is < 18 degrees', function() {
        thermostat.down(4);
        expect(thermostat.energyUsage()).toEqual("Low");
      });
      it('returns "medium" if 18 < temperature < 25 degrees', function() {
        expect(thermostat.temperature).toEqual(20);
        expect(thermostat.energyUsage()).toEqual("Medium");
      });
      it('returns "high" if temperature is >= 25 degrees', function() {
        thermostat.powerSaveSwitch();
        thermostat.up(8);
        expect(thermostat.energyUsage()).toEqual("High");
      });
    });

  });


});
