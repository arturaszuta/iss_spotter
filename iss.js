const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const ipString = `https://ipvigilante.com/${ip}`;
  request(ipString, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates via IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let latitude = JSON.parse(body).data.latitude;
    let longitude = JSON.parse(body).data.longitude;
    callback(error, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function({latitude, longitude }, callback) {
  const requestString = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  request(requestString, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when trying to get ISS Over Head Flyovers:  ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, JSON.parse(body));
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return (callback, error);
    }
    fetchCoordsByIP((ip, (error, {latitude, longitude}) => {
      if (error) {
        return (callback, error);
      }
      fetchISSFlyOverTimes({ latitude, longitude}, (error, nextpasses ) => {
        if (error) {
          return (callback, error);
        }
        callback(null, nextpasses);
      })
    }))
  })

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
