const geocode = require('./getGeocode');
const forecast = require('./getForecast');

module.exports = (address) => {
  return new Promise((resolve, reject) => {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return reject(new Error('Error during obtaining coordinates'));
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return reject(new Error('Error during obtaining forecast'));
        }

        return resolve({
          location: location,
          currentTemperature: forecastData.currentTemperature
        });
      });
    });
  });
}
;
