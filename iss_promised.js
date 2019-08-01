const request = require('request-promise-native')

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json", (error, response, body) => {});
}

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${IP}`, (error, response, body) => {})
}

const fetchISSFlyOverTimes = function(location) {
  let latitude = JSON.parse(location).data.latitude
  let longitude = JSON.parse(location).data.longitude

  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, body) => {})
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}



module.exports = { nextISSTimesForMyLocation };