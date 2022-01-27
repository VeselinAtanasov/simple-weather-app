const request = require('request');

module.exports = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmVza28xMjMiLCJhIjoiY2t5aW9qOHVmMWp0NjJ1cXBhaTV1eDVkcCJ9.LcL8GVBWWrG6xdqhItnOow`;

  return request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log('error:', error); // Print the error if one occurred
      return (callback(error));
    }
    if (body.features.length === 0) {
      console.log('Unable to find location.Try with another search:'); // Print the error if one occurred
      return (callback(new Error('Unable to find location.Try with another search:')));
    }
    return (callback(null, {
      longitude: body.features[0].center[0],
      latitude: body.features[0].center[1],
      location: body.features[0].place_name
    }
    ));
  });
};
