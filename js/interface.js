$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  $('#powersavemodetext').text(thermostat.powerSaveMode);
  $('#energyusagetext').text(thermostat.energyUsage());

  var counter = 8.182;

  updateTextColor();
  updateRotation();


  function updateTemperature() {
    $('#temperaturetext').text(thermostat.temperature);
  }

  function updateRotation() {
    $('#dial').css('transform', 'rotate(' + counter + 'deg)')
  }

  function updateEnergyUsage() {
    $('#energyusagetext').text(thermostat.energyUsage());
  }

  function updatePowerSaveMode() {
    $('#powersavemodetext').text(thermostat.powerSaveMode);
  }

  function updateTextColor() {
    if(thermostat.energyUsage() === 'Low') {
      $('#energyusagetext').css('color', '#2DE85B')
    }
    else if(thermostat.energyUsage() === 'Medium') {
      $('#energyusagetext').css('color', '#FFE34C')
    }
    else {
      $('#energyusagetext').css('color', '#FF3C32')
    }
  }

  $('#tempdown').on('click', function() {
    thermostat.down(1);
    updateTemperature();
    counter += 8.182;
    updateRotation();
    updateEnergyUsage();
    updateTextColor();
  })

  $('#tempup').on('click', function() {
    thermostat.up(1);
    updateTemperature();
    counter -= 8.182;
    updateRotation();
    updateEnergyUsage();
    updateTextColor();
  })

  $('#powersaveswitch').on('click', function() {
    thermostat.powerSaveSwitch();
    updatePowerSaveMode();
  })

  $('#tempreset').on('click', function() {
    thermostat.reset();
    updateTemperature();
    counter = 8.182;
    updateRotation();
    updateEnergyUsage();
    updateTextColor();
  })
})
