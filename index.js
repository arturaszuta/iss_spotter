const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP((error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// }) 

// fetchISSFlyOverTimes((error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// })

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});







