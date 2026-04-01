// Drop-in replacement for the original weather.js
// Uses Open-Meteo (free, no API key) instead of weather.fathom.info

function requestWeather(lat, lon) {
  "use strict";

  function Weather() {
    const self = this;
    self.ready = false;

    let current = null;
    let hourly = null;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,precipitation_probability,` +
      `wind_speed_10m,wind_direction_10m,relative_humidity_2m,weathercode,precipitation` +
      `&hourly=temperature_2m,apparent_temperature,precipitation_probability,` +
      `precipitation,wind_speed_10m,wind_direction_10m,relative_humidity_2m,weathercode` +
      `&temperature_unit=fahrenheit&wind_speed_unit=mph&forecast_days=2`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        current = data.current;
        hourly = data.hourly;
        self.ready = true;
      })
      .catch(err => {
        console.error('Weather fetch failed:', err);
      });

    // TEMPERATURE
    this.getTemperature = function(range) {
      if (!current) return 70;
      if (range === 'hours') {
        return hourly ? hourly.temperature_2m.slice(0, 24) : [];
      }
      return current.temperature_2m;
    };

    this.getApparentTemperature = function(range) {
      if (!current) return 70;
      if (range === 'hours') {
        return hourly ? hourly.apparent_temperature.slice(0, 24) : [];
      }
      return current.apparent_temperature;
    };

    this.getTemperatureMin = function() {
      if (!hourly) return 60;
      return Math.min(...hourly.temperature_2m.slice(0, 24));
    };

    this.getTemperatureMax = function() {
      if (!hourly) return 80;
      return Math.max(...hourly.temperature_2m.slice(0, 24));
    };

    // WIND
    this.getWindSpeed = function(range) {
      if (!current) return 0;
      if (range === 'hours') {
        return hourly ? hourly.wind_speed_10m.slice(0, 24) : [];
      }
      return current.wind_speed_10m;
    };

    this.getWindDirection = function(range) {
      if (!current) return 0;
      if (range === 'hours') {
        return hourly ? hourly.wind_direction_10m.slice(0, 24) : [];
      }
      return current.wind_direction_10m;
    };

    this.getWindGust = function(range) {
      return this.getWindSpeed(range);
    };

    // PRECIPITATION
    this.getPrecipitationChance = function(range) {
      if (range === 'hours') {
        if (!hourly) return new Array(24).fill(0);
        return hourly.precipitation_probability.slice(0, 24).map(v => v / 100);
      }
      if (!current) return [0];
      return [(current.precipitation_probability || 0) / 100];
    };

    this.getPrecipitationAmount = function(range) {
      if (range === 'hours') {
        return hourly ? hourly.precipitation.slice(0, 24) : [];
      }
      return current ? (current.precipitation || 0) : 0;
    };

    this.getPrecipitationIntensity = function(range) {
      return this.getPrecipitationAmount(range);
    };

    this.getPrecipitationType = function(range) {
      // Map WMO weather codes to simple type strings
      function codeToType(code) {
        if (code === 0 || code === 1) return 'clear';
        if (code <= 3) return 'cloudy';
        if (code <= 49) return 'fog';
        if (code <= 59) return 'drizzle';
        if (code <= 69) return 'rain';
        if (code <= 79) return 'snow';
        if (code <= 84) return 'rain';
        if (code <= 94) return 'snow';
        return 'thunderstorm';
      }
      if (range === 'hours') {
        return hourly ? hourly.weathercode.slice(0, 24).map(codeToType) : [];
      }
      if (range === 'days') {
        return hourly ? [codeToType(hourly.weathercode[12])] : ['clear'];
      }
      return current ? codeToType(current.weathercode) : 'clear';
    };

    // HUMIDITY
    this.getHumidity = function(range) {
      if (!current) return 0.5;
      if (range === 'hours') {
        return hourly ? hourly.relative_humidity_2m.slice(0, 24).map(v => v / 100) : [];
      }
      return current.relative_humidity_2m / 100;
    };

    // CLOUD COVER (not in Open-Meteo basic plan, return neutral value)
    this.getCloudCover = function() {
      return 0.5;
    };

    // TIME
    this.getTime = function() {
      return new Moment(new Date());
    };

    this.getTimeDate = function() {
      return new Date();
    };

    // CONDITION
    this.getConditionCode = function() {
      if (!current) return 'Clear';
      const code = current.weathercode;
      if (code === 0) return 'Clear';
      if (code <= 2) return 'PartlyCloudy';
      if (code <= 3) return 'MostlyCloudy';
      if (code <= 49) return 'Foggy';
      if (code <= 59) return 'Drizzle';
      if (code <= 69) return 'Rain';
      if (code <= 79) return 'Snow';
      if (code <= 84) return 'Showers';
      if (code <= 99) return 'Thunderstorm';
      return 'Clear';
    };

    this.getConditionText = function() {
      return this.getConditionCode().replace(/([A-Z])/g, ' $1').trim();
    };

    this.getData = function() {
      return { current, hourly };
    };

    this.setUnits = function() {};
  }

  return new Weather();
}
