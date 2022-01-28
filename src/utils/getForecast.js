const request = require('request');

module.exports = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ffe4097f7f5d823b3f91e253e1547472&query=${longitude},${latitude}&units=m`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      return (callback(error));
    }
    if (body.error) {
      return (new Error('Unable to find the location.Try Again!'));
    }

    return (callback(null, {
      currentTemperature: body.current.temperature,
      weatherDescriptions: body.current.weather_descriptions.join(', ')
    }
    ));
  });
};
