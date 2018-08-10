$(document).ready(function() {

  var current_city;
  displayWeather("london");

  var thermostat = new Thermostat();
  updateTemperature();
  updateTempColor();
  $('#powersavemodetext').text(thermostat.powerSaveMode);
  $('#energyusagetext').text(thermostat.energyUsage());

  var counter = 8.182;
  updateRotation();

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=e1fdf520da28052b80c85b7b5c5de67c';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
     $('#current-temperature').text(data.main.temp);
    })
    $('#current-city-text').text(current_city);
  }

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

  function chooseTempColor() {
    switch (thermostat.temperature) {
      case 32:
        return '#D80103';
        break;
      case 31:
        return '#D80204';
        break;
      case 30:
        return '#D50409';
        break;
      case 29:
        return '#CF0811';
        break;
      case 28:
        return '#CC0B17';
        break;
      case 27:
        return '#BD152C';
        break;
      case 26:
        return '#AE1E41';
        break;
      case 25:
        return '#A22651';
        break;
      case 24:
        return '#8F336D';
        break;
      case 23:
        return '#7E3E85';
        break;
      case 22:
        return '#704899';
        break;
      case 21:
        return '#6A4CA3';
        break;
      case 20:
        return '#5F51AB';
        break;
      case 19:
        return '#5756AF';
        break;
      case 18:
        return '#4A5BB5';
        break;
      case 17:
        return '#4160BA';
        break;
      case 16:
        return '#3666C0';
        break;
      case 15:
        return '#256DC8';
        break;
      case 14:
        return '#1F70CA';
        break;
      case 13:
        return '#1A72CD';
        break;
      case 12:
        return '#1674CF';
        break;
      case 11:
        return '#1376D1';
        break;
      case 10:
        return '#1276D1';
    }
  }

  function updateTempColor() {
    chosenColor = chooseTempColor();
    $('#temperaturetext').css('color', chosenColor);
    $('#dial').css('border-color', chosenColor);
  }

  function setCounterTo25() {
    counter = -32.728
  }

  function updateAll() {
    updateTemperature();
    updateTempColor();
    updateRotation();
    updateEnergyUsage();
    updatePowerSaveMode();
    updateTextColor();
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  $('#current-city').change(function() {
    var lowercase_city = $('#current-city').val();
    current_city = toTitleCase(lowercase_city);
    displayWeather(lowercase_city);
  })

  $('#tempdown').on('click', function() {
    thermostat.down(1);
    counter += 8.182;
    updateAll();
  })

  $('#tempup').on('click', function() {
    thermostat.up(1);
    counter -= 8.182;
    updateAll();
  })

  $('#powersaveswitch').on('click', function() {
    if (thermostat.temperature > 25) {
      setCounterTo25();
    }
    thermostat.powerSaveSwitch();
    updateAll();
  })

  $('#tempreset').on('click', function() {
    thermostat.reset();
    counter = 8.182;
    updateAll();
  })
})
